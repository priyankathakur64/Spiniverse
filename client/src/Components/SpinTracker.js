import {
  Button,
  Divider,
  Flex,
  Heading,
  Progress,
  Stack,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listUsers } from "../actions/userActions";
import { FulfillingBouncingCircleSpinner } from "react-epic-spinners";
import { AiOutlineEye } from "react-icons/ai"; 

const SpinTracker = () => {
  const [totalSpins, setTotalSpins] = useState(0);
  const targetSpins = 1000;

  const dispatch = useDispatch();

  const userList = useSelector((state) => state.userList || {});
  const { users, loading, error } = userList;

  useEffect(() => {
    dispatch(listUsers());
  }, [dispatch]);

  useEffect(() => {
    if (users) {
      const total = users.reduce((acc, user) => acc + user.playedSpins, 0);
      setTotalSpins(total);
    }
  }, [users]);

  const topContributors = users
    ? [...users].sort((a, b) => b.playedSpins - a.playedSpins).slice(0, 5)
    : [];

  return (
    <>
      <Flex
        bg="rgb(59, 9, 128,0.3)"
        backdropFilter="blur(5px)"
        border="1px solid rgba(255,255,255,0.1)"
        boxShadow="rgba(111, 17, 242, 0.25) 0px 12px 16px 0px"
        borderRadius="3xl"
        p="5"
        direction="column"
        mx="20"
        my={10}
        color="white"
      >
        <Stack p={5} spacing={5}>
          <Flex alignItems="center" gap={2}>
            <Text fontSize="xl" fontWeight="semibold" >
              0.5% Token Burn on {targetSpins} Spins
            </Text>
            <Tooltip
              label="First Burn: Every 1000 Spins - Burn 0.5% of all meme tokens listed for free airdrops.
                    Second Burn: Every 10,000 Spins - Burn 1% of all meme tokens listed for free airdrops.
                    Third Burn: Every 25,000 Spins - Burn 2% of all meme tokens listed for free airdrops.
                    Fourth Burn: Every 50,000 Spins - Burn 3% of all meme tokens listed for free airdrops.
                    Fifth Burn: Every 100,000 Spins - Burn 5% of all meme tokens listed for free airdrops."
              fontSize="md"
              bg="rgb(59, 9, 128)"
              color="white"
              border="1px solid rgb(140, 65, 245)"
              placement="top"
              hasArrow
            >
              <Button
                ml={-3}
                variant="link"
                color="white"
                fontSize="lg"
                _hover={{ bg: "transparent" }}
                _active={{ bg: "transparent" }}
                _focus={{ boxShadow: "none" }}
              >
                <AiOutlineEye />
              </Button>
            </Tooltip>
          </Flex>
          <Progress
            value={totalSpins}
            size="xs"
            colorScheme="purple"
            bgGradient="linear-gradient(to right, #83a4d4, #b6fbff);"
            max={targetSpins}
          />
          <Text textAlign="center">
            {totalSpins} / {targetSpins} Spins
          </Text>
        </Stack>
        <Divider py={2} />
        <Stack p={5} spacing={5}>
          <Heading
            as="h3"
            textAlign="center"
            size="lg"
            bgGradient="linear(to-l, rgba(111, 17, 242, 1) 0%, rgba(210, 181, 251, 1) 45%, rgba(242, 240, 245, 1) 49%)"
            bgClip="text"
          >
            Top Contributors
          </Heading>
          <Flex
            justifyContent="space-between"
            fontWeight="bold"
            color="#a590c1"
          >
            <Text>User</Text>
            <Text> Spins</Text>
          </Flex>
          {loading ? (
            <FulfillingBouncingCircleSpinner size={40} color="#a590c1" />
          ) : error ? (
            <Text textAlign="center" color="red">
              {error}
            </Text>
          ) : (
            topContributors.map((user, index) => (
              <Flex justifyContent="space-between" key={index}>
                <Text isTruncated maxW="200px">
                  {user.name ? user.name : user.walletAddress}
                </Text>
                <Text>{user.playedSpins}</Text>
              </Flex>
            ))
          )}
        </Stack>
      </Flex>
    </>
  );
};

export default SpinTracker;
