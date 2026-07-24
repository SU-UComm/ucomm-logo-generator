import Link from "next/link"
import {LOCKUP_ROUTES} from "@components/elements/lockup/lockup-options"

export const maxDuration = 60

const Home = async () => {
  return (
    <article className="m-20">
      <h1 className="type-2 mb-10 font-bold">Logo generators</h1>
      <p className="type-0 mb-10">Dev index — each route is embedded on its own page.</p>
      <ul className="type-0 flex flex-col gap-4">
        {LOCKUP_ROUTES.map(({slug, label}) => (
          <li key={slug}>
            <Link className="text-cardinal-red hocus:underline" href={`/${slug}`}>
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </article>
  )
}

export default Home
