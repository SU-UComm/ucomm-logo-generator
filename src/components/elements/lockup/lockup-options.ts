type LockupField = {
  key: "line1" | "line2" | "line3" | "line4"
  label: string
  defaultValue: string
}

type LockupOptionConfig = {
  slug: LockupOption
  label: string // page title, e.g. "Unit (1 Line)"
  fields: LockupField[]
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

export const LOCKUP_OPTIONS: LockupOptionConfig[] = [
  {
    slug: "unit",
    label: "Unit (1 Line)",
    fields: [{key: "line1", label: "Department Name", defaultValue: "Department Name"}],
  },
  {
    slug: "unit_2_line",
    label: "Unit (2 Lines)",
    fields: [
      {key: "line1", label: "Department Name", defaultValue: "Department Name"},
      {key: "line2", label: "Parent Unit Level", defaultValue: "Parent Unit Level"},
    ],
  },
  {
    slug: "unit_level",
    label: "Unit + Level (1 Line)",
    fields: [
      {key: "line1", label: "Department Name", defaultValue: "Department Name"},
      {key: "line2", label: "Parent Unit Level", defaultValue: "Parent Unit Level"},
    ],
  },
  {
    slug: "unit_2_lines_big_small",
    label: "Unit (2 Lines, Big Small)",
    fields: [
      {key: "line1", label: "Department Name", defaultValue: "Department Name"},
      {key: "line2", label: "Parent Unit Level", defaultValue: "Parent Unit Level"},
      {key: "line3", label: "Big Small", defaultValue: "Big Small"},
    ],
  },
  {
    slug: "unit_2_lines_level",
    label: "Unit (2 Lines, Level)",
    fields: [
      {key: "line1", label: "Department Name", defaultValue: "Department Name"},
      {key: "line2", label: "Parent Unit Level", defaultValue: "Parent Unit Level"},
      {key: "line3", label: "Level", defaultValue: "Level"},
    ],
  },
  {
    slug: "school",
    label: "School (1 Line)",
    fields: [{key: "line1", label: "School Name", defaultValue: "School Name"}],
  },
  {
    slug: "alt_school",
    label: "Alternative School (1 Line)",
    fields: [{key: "line1", label: "Alternative School Name", defaultValue: "Alternative School Name"}],
  },
  {
    slug: "multidisciplinary",
    label: "Multidisciplinary (1 Line)",
    fields: [{key: "line1", label: "Multidisciplinary Name", defaultValue: "Multidisciplinary Name"}],
  },
  {
    slug: "vertical_unit",
    label: "Vertical Unit (1 Line)",
    fields: [{key: "line1", label: "Vertical Unit Name", defaultValue: "Vertical Unit Name"}],
  },
  {
    slug: "vertical_unit_2_lines",
    label: "Vertical Unit (2 Lines)",
    fields: [
      {key: "line1", label: "Vertical Unit Name", defaultValue: "Vertical Unit Name"},
      {key: "line2", label: "Vertical Unit Level", defaultValue: "Vertical Unit Level"},
    ],
  },
  {
    slug: "vertical_2_lines_level",
    label: "Vertical (2 Lines, Level)",
    fields: [
      {key: "line1", label: "Vertical Unit Name", defaultValue: "Vertical Unit Name"},
      {key: "line2", label: "Vertical Unit Level", defaultValue: "Vertical Unit Level"},
      {key: "line3", label: "Level", defaultValue: "Level"},
    ],
  },
  {
    slug: "vertical_school",
    label: "Vertical School (1 Line)",
    fields: [{key: "line1", label: "Vertical School Name", defaultValue: "Vertical School Name"}],
  },
  {
    slug: "vertical_school_unit",
    label: "Vertical School + Unit (1 Line)",
    fields: [
      {key: "line1", label: "Vertical School Name", defaultValue: "Vertical School Name"},
      {key: "line2", label: "Vertical Unit Name", defaultValue: "Vertical Unit Name"},
    ],
  },
  {
    slug: "vertical_school_unit_level",
    label: "Vertical School + Unit + Level (1 Line)",
    fields: [
      {key: "line1", label: "Vertical School Name", defaultValue: "Vertical School Name"},
      {key: "line2", label: "Vertical Unit Name", defaultValue: "Vertical Unit Name"},
      {key: "line3", label: "Level", defaultValue: "Level"},
    ],
  },
]

export const getLockupFields = (slug: LockupOption): LockupField[] =>
  LOCKUP_OPTIONS.find(option => option.slug === slug)?.fields ?? []

export const getLockupLabel = (slug: LockupOption): string =>
  LOCKUP_OPTIONS.find(option => option.slug === slug)?.label ?? slug
