import React from "react";
import BannerContent from "../Components/BannerContent";
import { Box, Button, Flex, Image, Stack, Text } from "@chakra-ui/react";
import SideContent from "../Components/SideContent";
import ContentCard from "../Components/ContentCard";
import LeftArrow from "../Components/LeftArrow";
import RightArrow from "../Components/RightArrow";
import CustomAccordion from "../Components/CustomAccordion";
import ContactForm from "../Components/ContactForm";
import Header from "../Components/Header";

const HomeScreen = () => {
  return (
    <>
      <Header />

      {/* Banner */}
      <BannerContent />

      {/* Partners */}
      <Box
        position="relative"
        my={{ base: "10", md: "10", lg: "20" }}
        h="full" // Adjust the height as needed
      >
        <Image
          src="../assets/abstract.png"
          position="absolute"
          top="-28"
          zIndex="1"
          display={{ base: "none", md: "block" }}
        />
        <Box
          position="absolute"
          top="40"
          left="0"
          right="0"
          bottom="0"
          bg="linear-gradient(180deg, rgba(110, 86, 255, 0) 0%, rgba(110, 87, 255, .46) 40%, rgba(145, 93, 255, 0) 70%)"
          zIndex="-1"
          w="full"
          margin="auto"
          h="600px"
          opacity="0.6"
        />
        <Flex
          justifyContent="center"
          gap="10"
          zIndex="1"
          position="relative"
          direction={{ base: "column", md: "row" }}
          mx={5}
        >
          <ContentCard
            imgPath="../assets/cgurusLogo.png"
            // title="Casinogurus"
            content="Online Casino Reviews Platform"
            content2="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged"
            src="https://www.casinogurus.org/"
            boxSize={{ base: "50", md: "70", lg: "85" }}
          />
          <ContentCard
            imgPath="../assets/suLogo.png"
            // title="SLAP Universe"
            content="Meme Coin Ecosystem"
            content2="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged"
            src="https://slapuniverse.com/"
            boxSize={{ base: "50", md: "70", lg: "85" }}
          />
        </Flex>
      </Box>

      {/* Partnership */}
      <Flex
        justifyContent="space-around"
        alignItems="center"
        my={{ base: "10", md: "20", lg: "20" }}
        mx={10}
        id="about"
        gap={{ base: "12", md: "10", lg: "10" }}
        direction={{ base: "column", md: "row" }}
      >
        <Image
          src="../assets/rewards.png"
          height={{ base: "250px", md: "250px", lg: "350px" }}
          w={{ base: "300px", md: "300px", lg: "auto" }}
          display={{ base: "none", md: "block" }}
        />
        <SideContent
          title="PARTNERSHIP"
          heading="Our Gaming Partnership"
          content="We are thrilled to announce our partnership with a leading gaming platform to bring you an exciting Wheel of Fortune game! This isn't just any game-it's designed to provide our token holders with exclusive benefits and rewards."
        />
        <Image
          src="../assets/rewards.png"
          height={{ base: "250px", md: "250px", lg: "350px" }}
          w={{ base: "300px", md: "300px", lg: "auto" }}
          display={{ base: "block", md: "none" }}
        />
      </Flex>

      {/* Growth */}
      <Flex
        justifyContent="space-around"
        alignItems="center"
        my={10}
        mx={{ base: "10", md: "10", lg: "0" }}
        direction={{ base: "column", md: "row" }}
        gap={{ base: "12", md: "10", lg: "10" }}
      >
        <Stack gap={5}>
          <SideContent
            title="ACCESS"
            heading="Exclusive Early Access"
            content="By holding any of our meme tokens, you gain exclusive early access to the Wheel of Fortune game. Be the first to experience the thrill and win exciting prizes!"
          />
          <Button
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
            w="fit-content"
          >
            Claim Access
          </Button>
        </Stack>
        <Image
          src="../assets/growth.png"
          height={{ base: "250px", md: "250px", lg: "350px" }}
        />
      </Flex>

      {/* Benefits */}
      <Stack textAlign="center" mt={20}>
        <Flex alignItems="center" margin="auto" gap="3" w="sm">
          <LeftArrow padding="0" />
          <Text color="#f2f0f5" fontSize={{ base: "sm" }}>
            BENEFITS
          </Text>
          <RightArrow padding="0" />
        </Flex>
        <Text
          bgGradient="linear(to-l, rgba(111, 17, 242, 1) 18%, rgba(210, 181, 251, 1) 45%, rgba(242, 240, 245, 1) 49%)"
          bgClip="text"
          fontSize={{ base: "1.5rem", md: "2rem", lg: "3.25rem" }}
          fontWeight="semibold"
        >
          Why Hold Slap Universe Meme Tokens?
        </Text>
      </Stack>
      <Box
        position="relative"
        my={10}
        h="full" // Adjust the height as needed
      >
        <Image
          src="../assets/abstract.png"
          position="absolute"
          top="-10"
          zIndex="-1"
          display={{ base: "none", md: "block" }}
        />
        <Box
          position="absolute"
          top="40"
          left="0"
          right="0"
          bottom="0"
          bg="linear-gradient(180deg, rgba(110, 86, 255, 0) 0%, rgba(110, 87, 255, .46) 40%, rgba(145, 93, 255, 0) 70%)"
          zIndex="-1"
          w="full"
          margin="auto"
          h="600px"
          opacity="0.6"
        />

        <Flex
          gap={{ base: "10", md: "5", lg: "10" }}
          m={{ base: "10", md: "10", lg: "20" }}
          marginTop={{ base: "0" }}
          direction={{ base: "column", md: "row" }}
        >
          <ContentCard
            imgPath="../assets/wheel.png"
            title="Exclusive Gaming Access"
            content2="Be among the first to play our exclusive Wheel of Fortune game and spin for a chance to win amazing prizes and exclusive rewards!"
            showButton={false}
            fs="1.5rem"
          />
          <ContentCard
            imgPath="../assets/airdrop.png"
            title="Daily Rewards"
            content2="Enjoy daily free spins and win amazing crypto rewards, including free BTC, high prizes, and exclusive airdrops of our meme token with every spin! "
            showButton={false}
            fs="1.5rem"
          />
          <ContentCard
            imgPath="../assets/growing.png"
            title="Growing Ecosystem"
            content2="Become part of an ever-expanding community with 10 innovative meme tokens set to launch, each bringing new opportunities and excitement to our ecosystem!"
            showButton={false}
            fs="1.5rem"
          />
        </Flex>
      </Box>

      {/* FAQs */}
      <Flex
        mx={{ base: "10", md: "20" }}
        alignItems="center"
        my={10}
        id="faq"
        direction={{ base: "column", md: "column", lg: "row" }}
      >
        <Stack>
          <Text
            bgGradient="linear(to-l, rgba(111, 17, 242, 1) 70%, rgba(210, 181, 251, 1) 90%, rgba(242, 240, 245, 1) 49%)"
            bgClip="text"
            fontSize={{ base: "1.5rem", md: "2rem", lg: "3.25rem" }}
            fontWeight="semibold"
          >
            FAQs
          </Text>
          <Text mb={{ base: "5" }}>
            Find answers to some common questions others have asked
          </Text>
          <CustomAccordion />
        </Stack>
        <Flex display={{ base: "none", md: "none", lg: "flex" }}>
          <iframe
            src="https://lottie.host/embed/8a062a45-71f2-4171-b697-9171cb879600/BLYtEiTGow.json"
            width="600" // Set your desired width
            height="600" // Set your desired height
            title="Crypto Graphics"
          />
        </Flex>
      </Flex>

      {/* Contact */}
      <Stack my={{ base: "10", md: "10", lg: "flex" }} id="contact">
        <Stack textAlign="center" gap={{ base: "5" }}>
          <Flex
            alignItems="center"
            margin="auto"
            gap="3"
            w={{ base: "sm", md: "xl" }}
          >
            <LeftArrow padding="0" />
            <Text color="#f2f0f5" fontSize={{ base: "sm" }}>
              CONTACT
            </Text>
            <RightArrow padding="0" />
          </Flex>
          <Text
            bgGradient="linear(to-l, rgba(111, 17, 242, 1) 35%, rgba(210, 181, 251, 1) 45%, rgba(242, 240, 245, 1) 49%)"
            bgClip="text"
            fontSize={{ base: "1.5rem", md: "2rem", lg: "3.25rem" }}
            fontWeight="semibold"
          >
            Get in Touch
          </Text>
        </Stack>
        <ContactForm />
        Please reach out to us with any inquiries using the form below
      </Stack>
    </>
  );
};

export default HomeScreen;
