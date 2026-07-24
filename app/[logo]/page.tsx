import LockupSelection from "@components/elements/lockup/lockup-selection"
import {LOCKUP_ROUTES, LockupOption} from "@components/elements/lockup/lockup-options"

// https://vercel.com/docs/functions/runtimes#max-duration
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

export const generateStaticParams = async (): Promise<Array<PageParams>> => {
  return LOCKUP_ROUTES.map(({slug}) => ({logo: slug}))
}

export default Page
