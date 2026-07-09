"use client"

import LockupUnit from "@components/elements/lockup/lockup-unit"
import Button from "@components/elements/button"
import {ChangeEvent, useId, useRef, useState} from "react"
import downloadjs from "downloadjs"
import {useBoolean, useCounter, useDebounceCallback} from "usehooks-ts"
import SelectList from "@components/elements/select-list"
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

export type LockupProps = {
  line1?: string
  line2?: string
  line3?: string
  line4?: string
}
export type LockupOption =
  | "unit"
  | "unit_2_line"
  | "unit_level"
  | "unit_2_lines_big_small"
  | "unit_2_lines_level"
  | "school"
  | "alt_school"
  | "multidisciplinary"
  | "vertical_unit"
  | "vertical_unit_2_lines"
  | "vertical_2_lines_level"
  | "vertical_school"
  | "vertical_school_unit"
  | "vertical_school_unit_level"

type LockupFieldLabels = {
  line1: string
  line2: string
  line3: string
  line4: string
}

const LOCKUP_FIELD_LABELS: Record<LockupOption, LockupFieldLabels> = {
  unit: {
    line1: "Department name",
    line2: "",
    line3: "",
    line4: "",
  },
  school: {
    line1: "School name",
    line2: "",
    line3: "",
    line4: "",
  },
  vertical_unit: {
    line1: "Department name",
    line2: "",
    line3: "",
    line4: "",
  },
  vertical_school: {
    line1: "School name",
    line2: "",
    line3: "",
    line4: "",
  },
  unit_2_line: {
    line1: "Department line 1",
    line2: "Department line 2",
    line3: "",
    line4: "",
  },
  unit_level: {
    line1: "Department name",
    line2: "Parent unit",
    line3: "",
    line4: "",
  },
  unit_2_lines_big_small: {
    line1: "Department small text",
    line2: "Department big text",
    line3: "",
    line4: "",
  },
  alt_school: {
    line1: "School name",
    line2: "Department name",
    line3: "",
    line4: "",
  },
  multidisciplinary: {
    line1: "Department name",
    line2: "Long school name or a second school name",
    line3: "",
    line4: "",
  },
  vertical_unit_2_lines: {
    line1: "Department line 1",
    line2: "Department line 2",
    line3: "",
    line4: "",
  },
  unit_2_lines_level: {
    line1: "Department line 1",
    line2: "Department line 2",
    line3: "Parent unit",
    line4: "",
  },
  vertical_2_lines_level: {
    line1: "Department line 1",
    line2: "Department line 2",
    line3: "Parent unit",
    line4: "",
  },
  vertical_school_unit: {
    line1: "School name",
    line2: "Department line 1",
    line3: "Department line 2",
    line4: "",
  },
  vertical_school_unit_level: {
    line1: "School name",
    line2: "Department line 1",
    line3: "Department line 2",
    line4: "Parent unit",
  },
}

export const LockupSelection = ({
  allowChoice = false,
  lockupChoice = "unit",
}: {
  allowChoice?: boolean
  lockupChoice?: LockupOption
}) => {
  let initLine1 = "Line 1"
  let initLine2 = "Line 2"
  let initLine3 = "Line 3"
  let initLine4 = "Line 4"
  switch (lockupChoice) {
    case "unit":
      initLine1 = "Department Name"
      break

    case "unit_2_line":
      initLine1 = "Your Department"
      initLine2 = "Name on Two Lines"
      break

    case "unit_level":
      initLine1 = "Department Name"
      initLine2 = "Parent Unit Level"
      break

    case "unit_2_lines_big_small":
      initLine1 = "Small first line of"
      initLine2 = "Your Department Name"
      break

    case "unit_2_lines_level":
      initLine1 = "Your Department"
      initLine2 = "Name on Two Lines"
      initLine3 = "Parent Unit Level"
      break

    case "school":
      initLine1 = "School Name"
      break

    case "alt_school":
      initLine1 = "School Name"
      initLine2 = "Very Long Department Name Goes Here"
      break

    case "multidisciplinary":
      initLine1 = "Department Name"
      initLine2 = "Long school name or a second school name"
      break

    case "vertical_unit":
      initLine1 = "Department Name"
      break

    case "vertical_unit_2_lines":
      initLine1 = "Your Department"
      initLine2 = "Name on Two Lines"
      break

    case "vertical_2_lines_level":
      initLine1 = "Your Department"
      initLine2 = "Name on Two Lines"
      initLine3 = "Parent Unit Level"
      break

    case "vertical_school":
      initLine1 = "School name"
      break

    case "vertical_school_unit":
      initLine1 = "School name"
      initLine2 = "Your Department"
      initLine3 = "Name on Two Lines"
      break

    case "vertical_school_unit_level":
      initLine1 = "School name"
      initLine2 = "Your Department"
      initLine3 = "Name on Two Lines"
      initLine4 = "Parent Unit Level"
      break
  }

  const ref = useRef<HTMLDivElement>(null)
  const {value: downloadInProgress, setValue: setDownloadInProgress} = useBoolean(false)
  const {value: downloadFailed, setValue: setDownloadFailed} = useBoolean(false)

  const [lockupOption, setLockupOption] = useState<LockupOption>(lockupChoice)
  const [line1, setLine1State] = useState(initLine1)
  const setLine1 = useDebounceCallback(setLine1State, 500)
  const [line2, setLine2State] = useState(initLine2)
  const setLine2 = useDebounceCallback(setLine2State, 500)
  const [line3, setLine3State] = useState(initLine3)
  const setLine3 = useDebounceCallback(setLine3State, 500)
  const [line4, setLine4State] = useState(initLine4)
  const setLine4 = useDebounceCallback(setLine4State, 500)

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

      {allowChoice && (
        <>
          <p>Please select a logo style:</p>
          <SelectList
            label="Logo Style"
            required
            options={[
              {value: "unit", label: "Unit (1 Line)"},
              {value: "unit_2_line", label: "Unit (2 Lines)"},
              {value: "unit_level", label: "Unit + Level (1 Line)"},
              {value: "unit_2_lines_big_small", label: "Unit (2 Lines, Small/Big)"},
              {value: "unit_2_lines_level", label: "Unit (2 Lines) + Level"},
              {value: "school", label: "School Only"},
              {value: "alt_school", label: "Alt School + Unit (1 Line)"},
              {value: "multidisciplinary", label: "Multidisciplinary (or long school name)"},
              {value: "vertical_unit", label: "Vertical - Unit"},
              {value: "vertical_unit_2_lines", label: "Vertical - Unit (2 Lines)"},
              {value: "vertical_2_lines_level", label: "Vertical - Unit (2 Lines) + Level"},
              {value: "vertical_school", label: "Vertical - School"},
              {value: "vertical_school_unit", label: "Vertical - School + Unit (2 Lines)"},
              {value: "vertical_school_unit_level", label: "Vertical - School + Unit + Level"},
            ]}
            defaultValue="unit"
            onChange={(_e, value) => setLockupOption(value as LockupOption)}
          />
        </>
      )}

      <div
        ref={ref}
        className={clsx("mb-6 p-2 [&_svg]:h-[100px]", {"[&_svg]:h-[200px]": lockupOption.includes("vertical")})}
      >
        <LockupElement lockupOption={lockupOption} line1={line1} line2={line2} line3={line3} line4={line4} />
      </div>
      <form className="mb-10">
        <LockupInput
          onChange={e => setLine1(e.target.value)}
          defaultValue={line1}
          label={LOCKUP_FIELD_LABELS[lockupOption].line1}
        />
        <LockupInput
          onChange={e => setLine2(e.target.value)}
          defaultValue={line2}
          label={LOCKUP_FIELD_LABELS[lockupOption].line2}
          hidden={["unit", "school", "vertical_unit", "vertical_school"].includes(lockupOption)}
        />
        <LockupInput
          onChange={e => setLine3(e.target.value)}
          defaultValue={line3}
          label={LOCKUP_FIELD_LABELS[lockupOption].line3}
          hidden={
            ![
              "unit_2_lines_level",
              "vertical_2_lines_level",
              "vertical_school_unit",
              "vertical_school_unit_level",
            ].includes(lockupOption)
          }
        />
        <LockupInput
          onChange={e => setLine4(e.target.value)}
          defaultValue={line4}
          label={LOCKUP_FIELD_LABELS[lockupOption].line4}
          hidden={"vertical_school_unit_level" != lockupOption}
        />

        <fieldset>
          <legend className="mb-5 text-4xl font-bold">File Formats</legend>
          {formats.map(format => (
            <label
              key={format.name}
              className="mb-4 flex cursor-pointer items-center gap-5 text-4xl last:mb-0 hocus:underline"
            >
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
  onChange,
  defaultValue,
}: {
  hidden?: boolean
  label: string
  onChange: (_e: ChangeEvent<HTMLInputElement>) => void
  defaultValue?: string
}) => {
  const id = useId()
  const {count, setCount} = useCounter(defaultValue?.length || 0)
  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e)
    setCount(e.target?.value.length || 0)
  }
  return (
    <div className={clsx("mb-6 flex w-fit flex-col", {hidden})}>
      <div className="flex w-[45ch] flex-col gap-3">
        <label className="font-bold" htmlFor={id}>
          {label}
        </label>
        <input
          className="p-25 mb-3 h-[40px] w-full text-3xl"
          id={id}
          onChange={onInputChange}
          defaultValue={defaultValue}
          maxLength={45}
        />
      </div>
      <div className="text-right text-[1.5rem] text-cardinal-red">Remaining: {45 - count}</div>
    </div>
  )
}

export const LockupElement = ({
  lockupOption = "unit",
  line1,
  line2,
  line3,
  line4,
}: LockupProps & {
  lockupOption: LockupOption
}) => {
  const lockupProps: LockupProps = {
    line1: line1,
    line2: line2,
    line3: line3,
    line4: line4,
  }

  switch (lockupOption) {
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
