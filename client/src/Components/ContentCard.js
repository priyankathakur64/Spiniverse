import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  Image,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";
import React from "react";

const ContentCard = ({
  content,
  title,
  content2,
  src,
  imgPath,
  showButton = true,
  fs = "2rem",
  boxSize = "100",
}) => {
  return (
    <Box
      p="0.5"
      bgGradient="linear-gradient(rgba(242, 240, 245, 0.1), rgb(183, 130, 255))"
      borderRadius="24px"
      w="fit-content"
    >
      <Card
        maxW={{ base: "sm", md: "xs", lg: "md" }}
        bgGradient="linear-gradient(rgb(5, 0, 10) 0%, rgb(27, 17, 37) 100%)"
        borderRadius="24px"
        boxShadow="none"
        _hover={{
          bgGradient:
            "linear-gradient(rgb(15, 5, 20) 0%, rgb(37, 27, 47) 100%)",
        }}
        h="100%"
      >
        <CardBody textAlign="center">
          <Stack pt="2">
            <Stack py="3">
              <Image
                src={imgPath}
                boxSize={boxSize}
                m="auto"
                w={{ base: "auto", md: "auto", lg: "auto" }}
              />
            </Stack>
            <Text
              bgGradient="linear(to-l, rgba(111, 17, 242, 1) 0%, rgba(210, 181, 251, 1) 45%, rgba(242, 240, 245, 1) 49%)"
              bgClip="text"
              fontSize={fs}
              fontWeight="semibold"
            >
              {title}
            </Text>
            <Text color="rgb(242, 240, 245)">{content}</Text>
            <Text color="#a590c1">{content2}</Text>
          </Stack>
        </CardBody>
        {showButton && (
          <CardFooter>
            <Link href={src} target="_blank" margin="auto">
              <Button
                variant="solid"
                border="1px solid #bf96fa"
                backgroundColor="#20142f"
                borderRadius="16px"
                opacity="1"
                color="rgb(242, 240, 245)"
                _hover="none"
                _active="none"
                fontSize="1rem"
                size={{ base: "md", md: "md", lg: "lg" }}
                boxShadow="inset 0 1px 20px 6px #604388, 0 2px 67px 10px #b585f930"
              >
                Learn More
              </Button>
            </Link>
          </CardFooter>
        )}
      </Card>
    </Box>
  );
};

export default ContentCard;
