export const LOCKUP_ROUTES = [
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
] as const

export type LockupOption = (typeof LOCKUP_ROUTES)[number]["slug"]
