import React from "react";
import { Box, Text } from "@chakra-ui/react";
import { Bebas_Neue } from "next/font/google";

const bebas = Bebas_Neue({
  subsets: ["latin"],
  weight: ["400"],
});

const Hero = () => {
  return (
    <Box
      as="div"
      py=".2em"
      px=".3em"
      color="#fff"
      fontSize={{
        base: "3.8em",
        md: "6.8em",
        lg: "11.5em",
      }}
      fontWeight={{ base: "800", md: "800", lg: "800" }}
      lineHeight={{ base: "90px", md: "160px", lg: "220px" }}
      textTransform="uppercase"
      background="var(--hero-gradient)"
      borderRadius={{ base: "17px", md: "30px", lg: "50px" }}
      className={bebas.className}
      _hover={{
        cursor: "pointer",
        transform: "perspective(3000px) rotateY(-8deg)",
      }}
      transition="all .4s ease-in-out"
    >
      <Text>Connecting Techies to events</Text>
    </Box>
  );
};

export default Hero;
