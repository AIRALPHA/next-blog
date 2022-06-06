import type {NextPage} from 'next'
import {Box, Button} from "@mantine/core"
import Loader from "../Components/Loader";
import {toast} from "react-hot-toast";

const Home: NextPage = () => {
  return (
    <Box>
        <Button onClick={() => toast.success("Hello Toast")}>Toast</Button>
      <Loader show/>
    </Box>
  )
}

export default Home
