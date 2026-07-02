import {NextResponse} from "next/server"
import sharp from "sharp"
import JSZip from "jszip"
import CloudConvert from "cloudconvert"
import {convertImageSchema} from "@zod/schema"
import opentype from "opentype.js"
import {testLogo} from "./test-logo"
import {decode} from "html-entities"

export const dynamic = "force-dynamic"
export const maxDuration = 60

/*
Formats:
EPS - Regular :check:
EPS - Black :check:
EPS - White :check:

JPG - Regular :check:

PNG - Regular :check:
PNG - Black :check:
PNG - White :check:
 */
export const POST = async (request: Request) => {
  // TODO: Add in some type of checker like JWT or something.
  let svgImageString = "",
    imageWidth = 0,
    imageHeight = 0,
    formats = []

  try {
    const postData = await request.json()
    const requestData = convertImageSchema.parse(postData)
    svgImageString = requestData.image
    imageWidth = requestData.width
    imageHeight = requestData.height
    formats = requestData.formats
  } catch (error) {
    if (error instanceof Error) console.error(error.message)
    return new NextResponse("Invalid", {status: 400})
  }

  // Grab all the <text>...</text> elements.
  const textMatch = svgImageString.matchAll(/<text.*?\/text>/g)

  // Convert <text> elements into <path> SVG elements to avoid font family issues.
  for (const textElement of textMatch) {
    const textString = textElement[0].match(/>(.*)</)

    // No text exists in the element. Remove the element and move on.
    if (!textString || textString[1].length === 0) {
      svgImageString = svgImageString.replace(textElement[0], "")
      continue
    }

    // Check if font-style: italic exists on the element.
    const isItalic = /italic/.test(textElement[0])

    // Grab the font styles that will determine the font file we load later.
    const fontSize = textElement[0].match(/font-size: ([\d.]+)px/)
    const fontWeight = textElement[0].match(/font-weight: (\d+)/)

    // Offset coordinates.
    const xCoord = textElement[0].match(/ x="([\d.-]+)"/)
    const yCoord = textElement[0].match(/ y="([\d.-]+)"/)

    // X and Y coordinates of the starting text within the SVG.
    const translateX = parseFloat(xCoord?.[1] || "0")
    const translateY = parseFloat(yCoord?.[1] || "0")

    const weight = fontWeight ? fontWeight[1] : 400
    const fontStyle = isItalic ? "italic" : "normal"
    const fontFile = `https://cdn.jsdelivr.net/npm/@fontsource/source-sans-3@5.2.8/files/source-sans-3-latin-${weight}-${fontStyle}.woff`

    const fontWoff = await fetch(fontFile, {cache: "force-cache"})
    const fontBuffer = await fontWoff.arrayBuffer()
    const font = opentype.parse(fontBuffer)

    const textSvg = font.getPath(
      decode(textString[1]),
      translateX,
      translateY,
      fontSize?.[1] ? parseFloat(fontSize[1]) : 12,
      {
        letterSpacing: 0,
      }
    )
    svgImageString = svgImageString.replace(textElement[0], textSvg.toSVG(3))
  }

  const logoFile = Buffer.from(svgImageString)

  // Scale the image for better PNG and JPEG images.
  const generatedSize = {width: imageWidth * 5, height: imageHeight * 5}

  // Create the zip and add the original SVG.
  const zipFile = new JSZip()
  if (formats.includes("svg")) zipFile.file("logo.svg", logoFile)

  if (formats.includes("png-black")) {
    // Create Black PNG file & add to zip.
    const blackPng = await sharp(logoFile).resize(generatedSize).greyscale().linear(0, 1.5).png({colors: 2}).toBuffer()
    zipFile.file("black-logo.png", blackPng, {base64: true})
  }

  if (formats.includes("png-white")) {
    // Create White PNG file & add to zip.
    const whitePng = await sharp(logoFile)
      .resize(generatedSize)
      .greyscale()
      .linear(0, 1.5)
      .negate({alpha: false})
      .png({colors: 2})
      .toBuffer()
    zipFile.file("white-logo.png", whitePng, {base64: true})
  }

  if (formats.includes("png-full")) {
    // Create regular PNG file & add to zip.
    const png = await sharp(logoFile).resize(generatedSize).png().toBuffer()
    zipFile.file("logo.png", png, {base64: true})
  }

  if (formats.includes("jpg")) {
    // Create JPEG file & add to zip.
    const jpg = await sharp(logoFile).resize(generatedSize).flatten({background: "#fff"}).jpeg().toBuffer()
    zipFile.file("logo.jpeg", jpg, {base64: true})
  }

  // Modify the SVG by replacing any fill or stroke properties on elements. This is the fastest way to change the image
  // without loosing/changing any vectors.
  const blackSvg = Buffer.from(logoFile.toString().replaceAll(/(fill|stroke)="#.*?"/g, '$1="#000000"'))
  const whiteSvg = Buffer.from(logoFile.toString().replaceAll(/(fill|stroke)="#.*?"/g, '$1="#ffffff"'))

  type EpsFormat = "eps-full" | "eps-black" | "eps-white"

  const epsExports = (
    [
      {format: "eps-full" as const, filename: "logo.eps", svg: logoFile},
      {format: "eps-black" as const, filename: "black-logo.eps", svg: blackSvg},
      {format: "eps-white" as const, filename: "white-logo.eps", svg: whiteSvg},
    ] as const
  ).filter(({format}) => formats.includes(format)) as {format: EpsFormat; filename: string; svg: Buffer}[]

  if (epsExports.length > 0) {
    if (!process.env.CLOUD_CONVERT_KEY) {
      return new NextResponse("EPS export requires CLOUD_CONVERT_KEY to be configured.", {status: 503})
    }

    try {
      const epsFiles = await Promise.all(
        epsExports.map(async ({filename, svg}) => ({
          filename,
          buffer: await getEpsFile(svg.toString("base64")),
        }))
      )

      for (const {filename, buffer} of epsFiles) {
        zipFile.file(filename, buffer)
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : "EPS conversion failed"
      console.error("EPS conversion failed:", error)
      return new NextResponse(message, {status: 500})
    }
  }

  // Return the zip as a blob for the browser to download.
  const generatedFile = await zipFile.generateAsync({type: "blob"})
  return new NextResponse(generatedFile, {
    status: 200,
    headers: new Headers({
      "content-disposition": `attachment; filename=logos.zip`,
      "content-type": "application/zip",
      "content-length": generatedFile.size + "",
    }),
  })
}

const getEpsFile = async (imageBase64: string): Promise<Buffer> => {
  const useSandbox = !!process.env.CLOUD_CONVERT_SANDBOX

  if (useSandbox) imageBase64 = Buffer.from(testLogo).toString("base64")

  const cloudConvert = new CloudConvert(process.env.CLOUD_CONVERT_KEY!, useSandbox)

  let job = await cloudConvert.jobs.create({
    tasks: {
      "upload-logo": {
        operation: "import/base64",
        file: imageBase64,
        filename: "logo.svg",
      },
      "convert-logo": {
        operation: "convert",
        input: "upload-logo",
        input_format: "svg",
        output_format: "eps",
        text_to_path: true,
      },
      "export-logo": {
        operation: "export/url",
        input: "convert-logo",
      },
    },
  })

  job = await cloudConvert.jobs.wait(job.id)
  const file = cloudConvert.jobs.getExportUrls(job)[0]

  if (!file?.url) {
    throw new Error("CloudConvert did not return an EPS export URL.")
  }

  const epsResponse = await fetch(file.url)
  if (!epsResponse.ok) {
    throw new Error("Failed to download converted EPS file from CloudConvert.")
  }

  return Buffer.from(await epsResponse.arrayBuffer())
}
