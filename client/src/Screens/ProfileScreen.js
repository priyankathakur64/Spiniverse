import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Icon,
  Input,
  Stack,
  Table,
  Tbody,
  Text,
  Th,
  Thead,
  Tr,
  useToast,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import LeftArrow from "../Components/LeftArrow";
import RightArrow from "../Components/RightArrow";
import { useSelector, useDispatch } from "react-redux";
import { getUserDetails, updateUserProfile } from "../actions/userActions";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";

const ProfileScreen = () => {
  const dispatch = useDispatch();
  const toast = useToast();
  const navigate = useNavigate();

  const userDetails = useSelector((state) => state.userDetails || {});
  const { user } = userDetails;

  const [name, setName] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const [isChanged, setIsChanged] = useState(false);

  useEffect(() => {
    if (!user.name) {
      const savedWalletAddress = localStorage.getItem("walletAddress");
      dispatch(getUserDetails(savedWalletAddress));
    } else {
      setName(user.name || "");
      setWalletAddress(user.walletAddress || "");
    }
  }, [dispatch]);

  const handleNameChange = (e) => {
    setName(e.target.value);
    setIsChanged(e.target.value !== user.name);
  };

  const handleSaveChanges = () => {
    if (isChanged) {
      dispatch(updateUserProfile(walletAddress, name));
      setIsChanged(false);
    }
    toast({
      position: "top",
      // title: "User name updated",
      render: () => (
        <Flex
          backgroundColor="rgba(59, 9, 128,0.5)"
          boxShadow="rgba(111, 17, 242, 0.25) 0px 12px 16px 0px"
          // bg="rgb(59, 9, 128,0.3)"
          // backdropFilter="blur(5px)"
          border="1px solid rgba(255,255,255,0.2)"
          // boxShadow="rgba(111, 17, 242, 0.25) 0px 12px 16px 0px"
          color="white"
          p="2"
          borderRadius="2xl"
          justifyContent="center"
          alignItems="center"
          gap={3}
        >
          <Icon as={FaCheckCircle} color="lightgreen" boxSize={5} />
          <Text>User name updated</Text>
        </Flex>
      ),
      // status: "success",
      duration: 2000,
    });

    navigate("/wheel");
  };

  return (
    <Flex
      direction="column"
      justifyContent="center"
      alignItems="center"
      p={20}
      gap={20}
    >
      <Heading
        as="h3"
        size="2xl"
        textAlign="center"
        bgGradient="linear(to-l, rgba(111, 17, 242, 1) 0%, rgba(210, 181, 251, 1) 45%, rgba(242, 240, 245, 1) 49%)"
        bgClip="text"
      >
        Profile
      </Heading>

      {/* Form */}
      <form style={{ width: "100%" }} onSubmit={handleSaveChanges}>
        <Stack alignItems="center" width="100%" spacing={10}>
          <Flex gap="20%" width="100%">
            <FormControl id="name">
              <FormLabel>Your Name</FormLabel>
              <Input
                id="name"
                variant="filled"
                placeholder="Enter your name"
                value={name}
                onChange={handleNameChange}
                size="lg"
                fontSize="md"
                bg="#011627"
                border="1px solid rgb(42, 35, 53)"
                _focus={{ border: " 1px solid #bf96fa" }}
                _hover={{ border: "1px solid rgb(42, 35, 53)" }}
              />
            </FormControl>
            <FormControl id="wallet">
              <FormLabel>Wallet Address</FormLabel>
              <Input
                isReadOnly
                id="wallet"
                variant="filled"
                value={walletAddress}
                placeholder="Wallet Address"
                size="lg"
                fontSize="md"
                bg="#011627"
                border="1px solid rgb(42, 35, 53)"
                _focus={{ border: " 1px solid #bf96fa" }}
                _hover={{ border: "1px solid rgb(42, 35, 53)" }}
              />
            </FormControl>
          </Flex>
          <Button
            type="submit"
            isDisabled={!isChanged}
            width="fit-content"
            variant="solid"
            color="rgb(242, 240, 245)"
            border="1px solid rgb(140, 65, 245)"
            backgroundColor="rgb(59, 9, 128)"
            borderRadius="16px"
            boxShadow="rgba(111, 17, 242, 0.25) 0px 12px 16px 0px"
            opacity="1"
            _hover="none"
            _active="none"
            fontSize="1.2rem"
            size={{ base: "md", md: "md", lg: "lg" }}
          >
            Save Changes
          </Button>
        </Stack>
      </form>

      {/* Rewards */}
      <Flex direction="column" alignItems="center" w="100%" gap={5}>
        <Flex w="xl" gap={3} alignItems="center">
          <LeftArrow />
          <Heading
            as="h3"
            size="lg"
            fontWeight="semibold"
            bgGradient="linear(to-l, rgba(111, 17, 242, 1) 0%, rgba(210, 181, 251, 1) 45%, rgba(242, 240, 245, 1) 49%)"
            bgClip="text"
            whiteSpace="nowrap"
          >
            My Rewards
          </Heading>
          <RightArrow />
        </Flex>
        <Box
          bgColor="transparent"
          rounded="lg"
          shadow="lg"
          px="5"
          py="5"
          w="100%"
        >
          <Table variant="simple" size="sm">
            <Thead>
              <Tr>
                <Th>ID</Th>
                <Th>DATE</Th>
                <Th>REWARD</Th>
                <Th>STATUS</Th>
              </Tr>
            </Thead>
            <Tbody></Tbody>
          </Table>
        </Box>
      </Flex>
    </Flex>
  );
};

export default ProfileScreen;
