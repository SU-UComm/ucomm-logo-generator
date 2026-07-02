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

export type LockupLines = {
  line1: string
  line2: string
  line3: string
  line4: string
}

export const LOCKUP_OPTIONS: {slug: LockupOption; label: string}[] = [
  {slug: "unit", label: "Unit (1 Line)"},
  {slug: "unit_2_line", label: "Unit (2 Lines)"},
  {slug: "unit_level", label: "Unit + Level (1 Line)"},
  {slug: "unit_2_lines_big_small", label: "Unit (2 Lines, Small/Big)"},
  {slug: "unit_2_lines_level", label: "Unit (2 Lines) + Level"},
  {slug: "school", label: "School Only"},
  {slug: "alt_school", label: "Alt School + Unit (1 Line)"},
  {slug: "multidisciplinary", label: "Multidisciplinary (or long school name)"},
  {slug: "vertical_unit", label: "Vertical - Unit"},
  {slug: "vertical_unit_2_lines", label: "Vertical - Unit (2 Lines)"},
  {slug: "vertical_2_lines_level", label: "Vertical - Unit (2 Lines) + Level"},
  {slug: "vertical_school", label: "Vertical - School"},
  {slug: "vertical_school_unit", label: "Vertical - School + Unit (2 Lines)"},
  {slug: "vertical_school_unit_level", label: "Vertical - School + Unit + Level"},
]

export const getDefaultLines = (lockupOption: LockupOption): LockupLines => {
  switch (lockupOption) {
    case "unit":
      return {line1: "Department Name", line2: "Line 2", line3: "Line 3", line4: "Line 4"}

    case "unit_2_line":
      return {line1: "Your Department", line2: "Name on Two Lines", line3: "Line 3", line4: "Line 4"}

    case "unit_level":
      return {line1: "Department Name", line2: "Parent Unit Level", line3: "Line 3", line4: "Line 4"}

    case "unit_2_lines_big_small":
      return {line1: "Small first line of", line2: "Your Department Name", line3: "Line 3", line4: "Line 4"}

    case "unit_2_lines_level":
      return {
        line1: "Your Department",
        line2: "Name on Two Lines",
        line3: "Parent Unit Level",
        line4: "Line 4",
      }

    case "school":
      return {line1: "School Name", line2: "Line 2", line3: "Line 3", line4: "Line 4"}

    case "alt_school":
      return {
        line1: "School Name",
        line2: "Very Long Department Name Goes Here",
        line3: "Line 3",
        line4: "Line 4",
      }

    case "multidisciplinary":
      return {
        line1: "Department Name",
        line2: "Long school name or a second school name",
        line3: "Line 3",
        line4: "Line 4",
      }

    case "vertical_unit":
      return {line1: "Department Name", line2: "Line 2", line3: "Line 3", line4: "Line 4"}

    case "vertical_unit_2_lines":
      return {line1: "Your Department", line2: "Name on Two Lines", line3: "Line 3", line4: "Line 4"}

    case "vertical_2_lines_level":
      return {
        line1: "Your Department",
        line2: "Name on Two Lines",
        line3: "Parent Unit Level",
        line4: "Line 4",
      }

    case "vertical_school":
      return {line1: "School name", line2: "Line 2", line3: "Line 3", line4: "Line 4"}

    case "vertical_school_unit":
      return {
        line1: "School name",
        line2: "Your Department",
        line3: "Name on Two Lines",
        line4: "Line 4",
      }

    case "vertical_school_unit_level":
      return {
        line1: "School name",
        line2: "Your Department",
        line3: "Name on Two Lines",
        line4: "Parent Unit Level",
      }
  }
}

export const getLockupLabel = (lockupOption: LockupOption): string => {
  return LOCKUP_OPTIONS.find(option => option.slug === lockupOption)?.label ?? lockupOption
}
