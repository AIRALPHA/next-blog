import type {NextPage} from 'next'
import {Box, Button} from "@mantine/core"
import Link from "next/link";
import Loader from "../Components/Loader";
import {HeaderApp} from "../Components/HeaderApp";

const Home: NextPage = () => {
  return (
    <Box>
      <HeaderApp links={[]}/>
      <Link href="/hello" passHref>
        <Button component="a">Next link button</Button>
      </Link>
      <Loader show/>
    </Box>
  )
}

export default Home
