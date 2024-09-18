import { Flex, Stack, Text } from "@chakra-ui/react";
import React from "react";
import RightArrow from "./RightArrow";

const SideContent = ({ title, heading, content }) => {
  return (
    <>
      <Stack>
        <Flex alignItems="center" w="2xs" gap={3}>
          <Text color="#f2f0f5" fontSize={{ base: "sm" }}>
            {title}
          </Text>
          <RightArrow padding="0" />
        </Flex>
        <Text
          bgGradient="linear(to-l, rgba(111, 17, 242, 1) 0%, rgba(210, 181, 251, 1) 45%, rgba(242, 240, 245, 1) 49%)"
          bgClip="text"
          fontSize={{ base: "1.5rem", md: "2rem", lg: "3.25rem" }}
          fontWeight="semibold"
        >
          {heading}
        </Text>
        <Text w={{ base: "xs", md: "sm", lg: "xl" }} fontSize="1rem">
          {content}
        </Text>
      </Stack>
    </>
  );
};

export default SideContent;
