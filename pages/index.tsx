import type { NextPage } from 'next'
import { Button } from "@mantine/core"
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <Link href="/hello" passHref>
      <Button component="a">Next link button</Button>
    </Link>
  )
}

export default Home
