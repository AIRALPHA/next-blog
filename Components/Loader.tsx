import { Loader as MantineLoader } from '@mantine/core';

type loaderProps = {
  show: boolean
}

export default function Loader({ show }: loaderProps) {
  return show ? <MantineLoader/> : null;
}
