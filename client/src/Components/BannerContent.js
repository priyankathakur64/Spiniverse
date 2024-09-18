import { Button, Flex, Stack, Text } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import RightArrow from "./RightArrow";
import LeftArrow from "./LeftArrow";

const BannerContent = () => {
  return (
    <>
      <Flex
        justifyContent="center"
        direction="column"
        alignItems="center"
        gap="5"
        my={{ base: 10, md: 10, lg: 20 }}
      >
        <Stack textAlign="center">
          <Text
            bgGradient="linear(to-l, rgba(111, 17, 242, 1) 0%, rgba(210, 181, 251, 1) 45%, rgba(242, 240, 245, 1) 49%)"
            bgClip="text"
            fontSize={{ base: "2rem", md: "3.2rem", lg: "4.4rem" }}
            fontWeight="semibold"
            w={{ base: "xs", md: "auto", lg: "auto" }}
            m="auto"
          >
            Casinogurus X SLAP Universe
          </Text>
          <Text
            w={{ base: "xs", md: "lg", lg: "xl" }}
            margin="auto"
            fontSize={{ base: "1rem", md: "1rem", lg: "1.12rem" }}
            textAlign="center"
          >
            Dive into the future with Casinogurus X Slap Universe! Enjoy
            exclusive early access to our Wheel of Fortune game and daily free
            spins as a token holder. With exciting rewards and a growing
            ecosystem, we’re redefining meme tokens and bringing unmatched value
            to our community. Join us today and start spinning to win!
          </Text>
        </Stack>
        <Flex gap={3} width={{ base: "sm", md: "3xl", lg: "5xl" }}>
          <LeftArrow />
          <Stack
            direction={{ base: "column", md: "row" }}
            spacing={4}
            align="center"
          >
            <Button
              as={RouterLink}
              to="/wheel"
              variant="solid"
              color="rgb(242, 240, 245)"
              border=" 1px solid rgb(140, 65, 245)"
              backgroundColor="rgb(59, 9, 128)"
              borderRadius="16px"
              boxShadow="rgba(111, 17, 242, 0.25) 0px 12px 16px 0px"
              opacity="1"
              _hover="none"
              _active="none"
              fontSize="1.2rem"
              size={{ base: "md", md: "md", lg: "lg" }}
            >
              Spin the Wheel
            </Button>
            <Button
              variant="solid"
              border=" 1px solid rgb(42, 35, 53)"
              backgroundColor="rgba(0, 0, 0, 0)"
              borderRadius="16px"
              opacity="1"
              color="rgb(242, 240, 245)"
              _hover="none"
              _active="none"
              fontSize="1.2rem"
              size={{ base: "md", md: "md", lg: "lg" }}
            >
              Learn More
            </Button>
          </Stack>
          <RightArrow />
        </Flex>
      </Flex>
    </>
  );
};

export default BannerContent;
