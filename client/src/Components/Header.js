import { Button, Flex, Image, Link } from "@chakra-ui/react";

const Header = () => {
  const handleScroll = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <Flex
        justifyContent="space-between"
        alignItems="center"
        p={{ base: 5, md: 10, lg: 3 }}
      >
        <Link href="/">
          <Image
            src="../assets/CGLogo.svg"
            height={{ base: "80px", md: "100px" }}
          />
        </Link>
        <Flex gap={10} color="#F2F0F5" display={{ base: "none", md: "flex" }}>
          <Link
            _hover={{ textDecoration: "none" }}
            href="#about"
            onClick={(e) => handleScroll(e, "about")}
          >
            About
          </Link>
          <Link
            _hover={{ textDecoration: "none" }}
            href="#faq"
            onClick={(e) => handleScroll(e, "faq")}
          >
            FAQs
          </Link>
          <Link
            _hover={{ textDecoration: "none" }}
            href="#contact"
            onClick={(e) => handleScroll(e, "contact")}
          >
            Contact
          </Link>
        </Flex>
        <Button
          variant="solid"
          border=" 1px solid rgb(42, 35, 53)"
          backgroundColor="rgba(0, 0, 0, 0)"
          borderRadius="16px"
          opacity="1"
          color="rgb(242, 240, 245)"
          _hover="none"
          _active="none"
          fontSize="1rem"
          size="md"
        >
          Whitepaper
        </Button>
      </Flex>
    </>
  );
};

export default Header;
