import React from "react";
import Header from "./header";
import dynamic from "next/dynamic";
import { Container } from "@chakra-ui/react";

const Footer = dynamic(() => import("./footer"), { ssr: false });

interface layoutProp {
  children: React.ReactNode;
}

const Layout = ({ children }: layoutProp) => {
  const [search, setSearch] = React.useState("");

  return (
    <>
      <Header />
      <Container
        maxW={{ sm: "100%", md: "100%", lg: "90%" }}
        height="100%"
        mt="7em"
      >
        <main>{children}</main>
      </Container>
      <Footer />
    </>
  );
};

export default Layout;
