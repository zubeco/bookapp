import { Center } from "@chakra-ui/react";
import { MoonLoader } from "react-spinners";

const Loader = ({ bgColor }: { bgColor: string }): JSX.Element => {
  return (
    <Center minH="50vh" bg={bgColor} maxW="1100px">
      <MoonLoader color="#0376b8" size={30} />
    </Center>
  );
};

export default Loader;
