import LockupSelection from "@components/elements/lockup/lockup-selection"
import {getLockupLabel, LOCKUP_OPTIONS, LockupOption} from "@components/elements/lockup/lockup-options"
import type {Metadata} from "next"

export const maxDuration = 60
export const dynamicParams = false

type PageParams = {
  logo: LockupOption
}

type PageProps = {
  params: Promise<PageParams>
}

const Page = async (props: PageProps) => {
  const params = await props.params
  return <LockupSelection lockupChoice={params.logo} />
}

export const generateStaticParams = async (): Promise<Array<PageParams>> =>
  LOCKUP_OPTIONS.map(({slug}) => ({logo: slug}))

export const generateMetadata = async (props: PageProps): Promise<Metadata> => {
  const params = await props.params
  const label = getLockupLabel(params.logo)
  return {title: `${label} — Stanford Logo Generator`}
}

export default Page
