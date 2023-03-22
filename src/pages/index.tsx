import { Box, Text } from "@chakra-ui/react";
import SubNav from "../../components/atoms/SubNav/SubNav";
import Homepage from "../../components/molecules/Homepage/Homepage";
import { withAuth } from "../../components/molecules/withAuth/withAuth";

const Home = () => {
  return (
    <Box bg="#e1dcc5" height={"content-fit"} pb="50px">
      <SubNav />
      <Homepage />
    </Box>
  );
};

export default withAuth(Home);
