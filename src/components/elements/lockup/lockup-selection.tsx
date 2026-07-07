"use client"

import LockupUnit from "@components/elements/lockup/lockup-unit"
import Button from "@components/elements/button"
import {ChangeEvent, useId, useRef, useState} from "react"
import downloadjs from "downloadjs"
import {useBoolean, useDebounceCallback} from "usehooks-ts"
import {clsx} from "clsx"
import LockupUnitTwoLines from "@components/elements/lockup/lockup-unit-two-lines"
import LockupUnitTwoLinesBigSmall from "@components/elements/lockup/lockup-unit-two-lines-small-big"
import LockupUnitLevel from "@components/elements/lockup/lockup-unit-level"
import LockupUnitTwoLinesLevel from "@components/elements/lockup/lockup-unit-two-lines-level"
import LockupSchool from "@components/elements/lockup/lockup-school"
import LockupAltSchool from "@components/elements/lockup/lockup-alt-school"
import LockupMultidisciplinary from "@components/elements/lockup/lockup-multidisciplinary"
import LockupVerticalUnit from "@components/elements/lockup/lockup-vertical-unit"
import LockupVerticalUnitTwoLines from "@components/elements/lockup/lockup-vertical-unit-two-lines"
import LockupVerticalUnitTwoLinesLevel from "@components/elements/lockup/lockup-vertical-unit-two-lines-level"
import LockupVerticalSchool from "@components/elements/lockup/lockup-vertical-school"
import LockupVerticalSchoolUnit from "@components/elements/lockup/lockup-vertical-school-unit"
import LockupVerticalSchoolUnitLevel from "@components/elements/lockup/lockup-vertical-school-unit-level"
import {ArrowPathIcon, ExclamationTriangleIcon, XMarkIcon} from "@heroicons/react/16/solid"
import {getLockupFields, LockupOption} from "@components/elements/lockup/lockup-options"

export type LockupProps = {
  line1?: string
  line2?: string
  line3?: string
  line4?: string
}

export const LockupSelection = ({lockupChoice}: {lockupChoice: LockupOption}) => {
  const ref = useRef<HTMLDivElement>(null)
  const {value: downloadInProgress, setValue: setDownloadInProgress} = useBoolean(false)
  const {value: downloadFailed, setValue: setDownloadFailed} = useBoolean(false)

  const formats = [
    {name: "png-black", label: "PNG: all black logo, on transparent background", defaultChecked: false},
    {name: "png-white", label: "PNG: all white logo, on transparent background", defaultChecked: false},
    {name: "png-full", label: "PNG: full color, on transparent background", defaultChecked: true},
    {name: "jpg", label: "JPG: full color, on white background", defaultChecked: true},
    {name: "svg", label: "SVG: full color, scalable vector graphics", defaultChecked: false},
    {name: "eps-black", label: "EPS: all black vector", defaultChecked: false},
    {name: "eps-white", label: "EPS: all white vector", defaultChecked: false},
    {name: "eps-full", label: "EPS: full color (Cardinal red + black)", defaultChecked: false},
  ]
  const [chosenFormats, setChosenFormats] = useState(
    formats.filter(format => format.defaultChecked).map(format => format.name)
  )

  const downloadLogo = () => {
    const convertImage = async () => {
      const logo = ref.current?.firstElementChild

      const res = await fetch("/api/convert", {
        method: "POST",
        body: JSON.stringify({
          image: logo?.outerHTML,
          height: logo?.clientHeight,
          width: logo?.clientWidth,
          formats: chosenFormats,
        }),
      })
      if (!res.ok) throw new Error("Failed")
      downloadjs(await res.blob(), "generated-logos.zip")
    }

    setDownloadInProgress(true)
    convertImage()
      .then(() => setDownloadInProgress(false))
      .catch(_e => {
        console.warn("Something failed")
        setDownloadInProgress(false)
        setDownloadFailed(true)
      })
  }

  const handleFormatChange = (event: ChangeEvent<HTMLInputElement>) => {
    const id = event.target.name
    setChosenFormats(prevState => (prevState.includes(id) ? prevState.filter(item => item !== id) : [...prevState, id]))
  }

  const fields = getLockupFields(lockupChoice)
  const createLinesFromFields = () => Object.fromEntries(fields.map(f => [f.key, f.defaultValue])) as LockupProps

  const [lines, setLines] = useState<LockupProps>(createLinesFromFields)
  const [previewLines, setPreviewLines] = useState<LockupProps>(createLinesFromFields)
  const setPreviewLinesDebounced = useDebounceCallback(setPreviewLines, 500)

  const setLine = (key: keyof LockupProps, value: string) => {
    setLines(prev => {
      const next = {...prev, [key]: value}
      setPreviewLinesDebounced(next)
      return next
    })
  }

  return (
    <div className="m-20">
      {downloadFailed && (
        <div className="relative bg-poppy-light p-20 font-semibold text-black">
          <span className="mx-auto flex w-fit items-center gap-5">
            <ExclamationTriangleIcon width={30} />
            An error occurred when generating the logos.
          </span>
          <button
            className="absolute right-5 top-5 flex aspect-1 w-10 items-center justify-around rounded-full bg-cardinal-red"
            onClick={() => setDownloadFailed(false)}
          >
            <XMarkIcon width={20} className="text-white" />
            <span className="sr-only">Close message</span>
          </button>
        </div>
      )}

      <div
        ref={ref}
        className={clsx("p-2 [&_svg]:h-[100px]", {"[&_svg]:h-[200px]": lockupChoice.includes("vertical")})}
      >
        <LockupElement lockupChoice={lockupChoice} {...previewLines} />
      </div>
      <form className="mb-10">
        {fields.map(field => (
          <LockupInput
            key={field.key}
            label={field.label}
            value={lines[field.key] ?? ""}
            onChange={e => setLine(field.key, e.target.value)}
          />
        ))}
        <fieldset>
          <legend className="mb-5 text-4xl font-bold">File Formats</legend>
          {formats.map(format => (
            <label key={format.name} className="mb-2 flex cursor-pointer items-center gap-5 text-5xl hocus:underline">
              <input
                type="checkbox"
                checked={chosenFormats.includes(format.name)}
                name={format.name}
                className="block h-10 w-10"
                onChange={handleFormatChange}
              />
              {format.label}
            </label>
          ))}
        </fieldset>
      </form>
      <div className="flex gap-5">
        <Button className="block w-[300px]" onClick={downloadLogo} disabled={downloadInProgress}>
          {downloadInProgress ? <ArrowPathIcon className="mx-auto animate-spin" width={25} /> : "Download"}
        </Button>
      </div>
    </div>
  )
}

const LockupInput = ({
  hidden,
  label,
  value,
  onChange,
}: {
  hidden?: boolean
  label: string
  value: string
  onChange: (_e: ChangeEvent<HTMLInputElement>) => void
}) => {
  const id = useId()
  return (
    <div className={clsx("mb-10 flex w-fit flex-col", {hidden})}>
      <div className="flex items-center gap-5">
        <label htmlFor={id}>{label}</label>
        <input className="p-25 h-[40px] w-[250px] text-3xl" id={id} onChange={onChange} value={value} maxLength={45} />
      </div>
      <div className="text-right text-[1.5rem] text-cardinal-red">Remaining: {45 - value.length}</div>
    </div>
  )
}

export const LockupElement = ({
  lockupChoice = "unit",
  line1,
  line2,
  line3,
  line4,
}: LockupProps & {
  lockupChoice: LockupOption
}) => {
  const lockupProps: LockupProps = {
    line1: line1,
    line2: line2,
    line3: line3,
    line4: line4,
  }

  switch (lockupChoice) {
    case "unit":
      return <LockupUnit {...lockupProps} />

    case "unit_2_line":
      return <LockupUnitTwoLines {...lockupProps} />

    case "unit_level":
      return <LockupUnitLevel {...lockupProps} />

    case "unit_2_lines_big_small":
      return <LockupUnitTwoLinesBigSmall {...lockupProps} />

    case "unit_2_lines_level":
      return <LockupUnitTwoLinesLevel {...lockupProps} />

    case "school":
      return <LockupSchool {...lockupProps} />

    case "alt_school":
      return <LockupAltSchool {...lockupProps} />

    case "multidisciplinary":
      return <LockupMultidisciplinary {...lockupProps} />

    case "vertical_unit":
      return <LockupVerticalUnit {...lockupProps} />

    case "vertical_unit_2_lines":
      return <LockupVerticalUnitTwoLines {...lockupProps} />

    case "vertical_2_lines_level":
      return <LockupVerticalUnitTwoLinesLevel {...lockupProps} />

    case "vertical_school":
      return <LockupVerticalSchool {...lockupProps} />

    case "vertical_school_unit":
      return <LockupVerticalSchoolUnit {...lockupProps} />

    case "vertical_school_unit_level":
      return <LockupVerticalSchoolUnitLevel {...lockupProps} />
  }
}
export default LockupSelection
