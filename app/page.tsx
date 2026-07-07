import Link from "next/link"
import {LOCKUP_OPTIONS} from "@components/elements/lockup/lockup-options"

export const maxDuration = 60

const Home = async () => {
  return (
    <article className="m-20">
      <h1>Stanford Logo Generator</h1>
      <p>Select a logo style:</p>
      <ul>
        {LOCKUP_OPTIONS.map(({slug, label}) => (
          <li key={slug}>
            <Link href={`/${slug}`}>{label}</Link>
          </li>
        ))}
      </ul>
    </article>
  )
}

export default Home
