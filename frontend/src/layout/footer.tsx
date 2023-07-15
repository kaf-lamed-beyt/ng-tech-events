import React from "react";
import { Box, Text } from "@chakra-ui/react";

const Footer = () => {
  const year = new Date().getFullYear();

  const clockRef = React.useRef(null);

  React.useEffect(() => {
    const updateClock = () => {
      const currentTime = new Date();
      clockRef.current.textContent = currentTime.toLocaleTimeString();
    };

    const tick = setInterval(updateClock, 1000);

    return () => clearInterval(tick);
  });

  return (
    <Box
      as="footer"
      color="var(--secondary)"
      py="1.4em"
      mt="3em"
      textAlign="center"
      borderTop="1px solid var(--charcoal-alt)"
    >
      <Text>
        Built by{" "}
        <a href="https://meje.dev/" target="__blank" className="external-link">
          Seven
        </a>{" "}
        and a couple of {""}
        <a
          href="https://github.com/kaf-lamed-beyt/ng-tech-events/graphs/contributors"
          target="__blank"
          className="external-link"
        >
          awesome folks
        </a>{" "}
        from the community
      </Text>
      <Text py=".3em">
        Designed with 🫶🏾 by{" "}
        <a
          className="external-link"
          href="https://twitter.com/_mercyidowu"
          target="__blank"
        >
          Mercy
        </a>{" "}
        &copy; {year}
      </Text>
      <Text fontSize="sm" mt=".5em" className="time-fade" ref={clockRef} />
    </Box>
  );
};

export default Footer;
