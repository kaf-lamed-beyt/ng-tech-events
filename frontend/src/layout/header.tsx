import React from "react";
import { CiSearch } from "react-icons/ci";
import {
  Box,
  Image,
  Flex,
  Text,
  Button,
  Input,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useRouter } from "next/router";

const Header = () => {
  const router = useRouter();
  const [isExpanded, setExpanded] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const { searchValue } = router.query;
  // console.log(router.query);
  // console.log(search);

  const expandSearchBar = () => {
    setExpanded(!false);
    console.log("yes, search bar is expanded");
  };

  const inputWidth = useBreakpointValue({
    base: isExpanded ? "270px !important" : "0px",
    lg: isExpanded ? "340px" : "0px",
  });

  const handleSearch = (e: any) => {
    setSearch(e.target.value);
    let searchValue = e.target.value;
    router.push(
      {
        pathname: router.pathname,
        query: { value: searchValue },
      },
      undefined,
      { scroll: false }
    );
  };

  return (
    <>
      <Flex
        as="header"
        justifyContent="space-between"
        position="fixed"
        top="0px"
        left="0px"
        width="100%"
        px=".6em"
        py="1em"
        backdropFilter="blur(10px)"
      >
        <Flex>
          <Image
            src="/assemble.svg"
            boxSize={{ base: "35px", md: "35px", lg: "50px" }}
            my={{ base: "auto" }}
            objectFit="cover"
            alt="techies assemble logo"
          />
          <Text
            my="auto"
            fontWeight="800"
            px=".3em"
            color="#fff"
            display={
              isExpanded ? { base: "none", md: "block", lg: "block" } : ""
            }
          >
            techiesassemble
          </Text>
        </Flex>
        <Box as="nav" display="flex" gap={["1em", ".5em"]}>
          <Box my="auto" display="flex">
            <Input
              width={isExpanded ? { base: "100%" } : "0px"}
              border="none"
              background="none"
              placeholder="search"
              color="#fff"
              fontSize="sm"
              className={isExpanded ? "expand" : ""}
              _placeholder={{ color: "#fff" }}
              value={search}
              onChange={handleSearch}
            />
            <Box
              background="var(--secondary)"
              height="fit-content"
              my="auto"
              py=".2em"
              px=".2em"
              borderRadius="50%"
              _hover={{ cursor: "pointer" }}
              className={isExpanded ? "moveIcon" : ""}
            >
              <CiSearch color="#fff" size="23px" onClick={expandSearchBar} />
            </Box>
          </Box>
          <Box
            backgroundImage="var(--nin)"
            display={{ base: "none", md: "block", lg: "block" }}
            borderRadius="26px"
            px=".2em"
          >
            <Button
              my=".2em"
              color="#fff"
              height="88%"
              fontWeight="400"
              textTransform="capitalize"
              borderRadius="21px"
              background="var(--primary)"
              _hover={{ bg: "var(--primary)" }}
            >
              add new events
            </Button>
          </Box>
        </Box>
      </Flex>
    </>
  );
};

export default Header;
