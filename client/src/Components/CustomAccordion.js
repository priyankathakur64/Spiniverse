import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
} from "@chakra-ui/react";

const CustomAccordionItem = ({ children, ...props }) => {
  return (
    <AccordionItem borderRadius="20" mb={5} p={0} {...props}>
      {({ isExpanded }) => (
        <Box
          border={
            isExpanded ? "1px solid #bf96fa" : "1px solid rgb(42, 35, 53)"
          }
          borderRadius="20"
          bgGradient={
            isExpanded
              ? "linear-gradient(rgba(112, 83, 142, 0.5) 0%, rgba(5, 0, 10, 0.5) 100%)"
              : "none"
          }
          p={5} // add padding here
        >
          {children}
        </Box>
      )}
    </AccordionItem>
  );
};

const CustomAccordion = () => {
  return (
    <Accordion allowToggle>
      <CustomAccordionItem>
        <h2>
          <AccordionButton>
            <Box
              as="span"
              flex="1"
              textAlign="left"
              fontSize={{ base: "md", lg: "lg" }}
              color="#f2f0f5"
            >
              How does the Wheel of Fortune game work?
            </Box>
            <AccordionIcon boxSize="8" />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          The Wheel of Fortune game allows players to spin a virtual wheel for a
          chance to win airdrops of our tokens. Participants who do not hold any
          of our tokens will receive one free spin per day. For those who hold 5
          million or more of our tokens, they will be eligible for four free
          spins daily.
        </AccordionPanel>
      </CustomAccordionItem>
      <CustomAccordionItem>
        <h2>
          <AccordionButton>
            <Box
              as="span"
              flex="1"
              textAlign="left"
              fontSize={{ base: "md", lg: "lg" }}
              color="#f2f0f5"
            >
              What happens if the total number of spins in a day reaches 1000?
            </Box>
            <AccordionIcon boxSize="8" />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          If the total number of spins for a day reaches 1000, our development
          team will initiate a token burn. This means that a specific amount of
          our tokens will be permanently removed from circulation, which helps
          manage the token supply and can positively impact the token's value.
        </AccordionPanel>
      </CustomAccordionItem>

      <CustomAccordionItem>
        <h2>
          <AccordionButton>
            <Box
              as="span"
              flex="1"
              textAlign="left"
              fontSize={{ base: "md", lg: "lg" }}
              color="#f2f0f5"
            >
              How can I qualify for the additional spins if I hold your tokens?
            </Box>
            <AccordionIcon boxSize="8" />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          To qualify for the extra spins, you must buy our CG token. The prices
          are as follows: 10M CG = 5 spins 50M CG = 15 spins 100M CG= 30spins
          300M CG = 50spins
        </AccordionPanel>
      </CustomAccordionItem>
      <CustomAccordionItem>
        <h2>
          <AccordionButton>
            <Box
              as="span"
              flex="1"
              textAlign="left"
              fontSize={{ base: "md", lg: "lg" }}
              color="#f2f0f5"
            >
              Who should I contact if I have issues or questions regarding the
              Wheel of Fortune game?
            </Box>
            <AccordionIcon boxSize="8" />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          For any issues or questions related to the Wheel of Fortune game,
          please contact the customer support team through contact form. For
          inquiries specifically about our tokens, you can reach out to our
          support team though telegram.
        </AccordionPanel>
      </CustomAccordionItem>
    </Accordion>
  );
};

export default CustomAccordion;
