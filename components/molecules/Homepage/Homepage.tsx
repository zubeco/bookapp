import {
  Box,
  Input,
  InputGroup,
  InputRightElement,
  Text,
} from "@chakra-ui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { FormEvent, useState } from "react";
import { BiSearch } from "react-icons/bi";
import bgimg from "../../../public/images/bgimg.jpg";
import PopularBooks from "../PopularBooks/PopularBooks";

export default function Homepage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (searchTerm) {
      router.push(`/books/${searchTerm}`);
      setSearchTerm("");
    }
  };
  return (
    <Box width={"100%"} position="relative">
      <Image
        src={bgimg}
        alt="hello"
        style={{
          objectFit: "cover",
          width: "100%",
          height: "70vh",
          position: "relative", // Set position to relative
        }}
      />
      <Box
        position="absolute"
        top="0"
        left="0"
        width="100%"
        height="70vh"
        backgroundColor="rgba(0,0,0,0.5)" // Set the background color to a dark hue with transparency
        zIndex="1" // Set the z-index to 1 to make sure it's on top of the Image
      />
      <Box
        position={"absolute"}
        top="170px"
        left="185px"
        color={"#FFFFFF"}
        right="0"
        margin="0 auto" // Center horizontally
        zIndex="2" // Set a higher z-index than the overlay
      >
        <Text fontSize={"40px"} fontWeight="700" mb="10px">
          Find your choice of book
        </Text>
        <Text fontSize={"20px"} fontWeight="500">
          The internet’s source for visuals. Powered by creators everywhere.
        </Text>
        <Box width={"100%"} display="flex" alignItems={"center"} mt="20px">
          <form onSubmit={handleSubmit} style={{ width: "100%" }}>
            <InputGroup width="50%" display={"flex"} alignItems="center">
              <Input
                placeholder="Search for a book..."
                borderRadius={"5px"}
                border="1px solid #babbae"
                bg="white"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                height={"60px"}
                color="black"
              />
              <InputRightElement mt="10px" mr="10px">
                <BiSearch fontSize={"30px"} color="#babbae" />
              </InputRightElement>
            </InputGroup>
          </form>
        </Box>
      </Box>

      <PopularBooks />
    </Box>
  );
}
