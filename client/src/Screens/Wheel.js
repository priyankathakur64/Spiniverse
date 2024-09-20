import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
} from "@chakra-ui/react";
import { AiOutlineEye, AiOutlineShoppingCart } from "react-icons/ai"; // Add the Shopping Cart icon
import { Tooltip } from "@chakra-ui/react";
import {
  TwitterShareButton,
  FacebookShareButton,
  WhatsappShareButton,
  LinkedinShareButton,
  TwitterIcon,
  FacebookIcon,
  WhatsappIcon,
  LinkedinIcon,
} from "react-share";
import {
  Grid,
  Box,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Image,
  ModalCloseButton,
  Text,
  Flex,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Link,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import { Connection, PublicKey } from "@solana/web3.js";
import {
  login,
  register,
  getUserDetails,
  updateSpins,
  listUsers,
} from "../actions/userActions";
import SpinTracker from "../Components/SpinTracker";
import { IoChevronDown } from "react-icons/io5";
import winSound from "../assets/win-sound.mp3"; // Import the sound file
import confetti from "canvas-confetti";
import "./wheel.css";
const Wheel = () => {
  const [display, setDisplay] = useState("-");
  const [walletAddress, setWalletAddress] = useState("");
  const [isSpinDisabled, setSpinDisabled] = useState(true);
  const [isConnected, setIsConnected] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0); // 2 minutes in seconds
  const [showConfetti, setShowConfetti] = useState(false); // State for confetti
  const wheelRef = useRef(null);
  const winSoundRef = useRef(new Audio(winSound)); // Create an audio ref
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin || {});
  const { userInfo } = userLogin;

  const userDetails = useSelector((state) => state.userDetails || {});
  const { user } = userDetails;

  const shareUrl = "https://yourapp.com"; // Replace with your actual app URL
  const title = "Play this awesome Spin Wheel game!";

  const alchemyApiKey = "3NfQ3MFPqhGdKfIID0Tp1Ig8_6S9irMN";

  const symbolSegments = {
    1: "5K BDOUGH Airdrop",
    2: "5 Free spins at Freebitco.in",
    3: "10K WHISK Airdrop",
    4: "$10 Amazon Gift Card",
    5: "Free Headphones",
    6: "Better Luck Next Time",
    7: "0.02 SOL",
    8: "Free BTC at Bitstarz",
  };

  const [bonusSpins, setBonusSpins] = useState(0);
  useEffect(() => {
    setSpinDisabled(!isConnected || user?.spins <= 0);
    setBonusSpins(user?.bonusSpins || 0); // Update bonus spins state
  }, [isConnected, user?.spins, user?.bonusSpins]);

  const fetchTokenBalances = useCallback(
    async (walletAddress) => {
      const connection = new Connection(
        `https://solana-mainnet.g.alchemy.com/v2/${alchemyApiKey}`
      );
      const publicKey = new PublicKey(walletAddress);

      try {
        const tokenAccounts = await connection.getParsedTokenAccountsByOwner(
          publicKey,
          {
            programId: new PublicKey(
              "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
            ),
          }
        );

        const tokenAddressesToCheck = [
          "EJBbh4xbAxE5CDNnr9jMcXTydjGJxazKB3ypLCmipump",
        ];
        let tokenBalance = 0;

        tokenAddressesToCheck.forEach((tokenAddress) => {
          const accountInfo = tokenAccounts.value.find(
            (account) => account.account.data.parsed.info.mint === tokenAddress
          );
          if (accountInfo) {
            tokenBalance +=
              accountInfo.account.data.parsed.info.tokenAmount.uiAmount;
          }
        });

        return tokenBalance;
      } catch (err) {
        console.error("Error fetching token balances", err);
        return 0;
      }
    },
    [alchemyApiKey]
  );

  const handleWalletConnect = useCallback(
    async (walletAddress) => {
      const tokenBalance = await fetchTokenBalances(walletAddress);
      const hasEnoughTokens = tokenBalance >= 10000;

      const freeSpins = hasEnoughTokens ? 4 : 1;
      await dispatch(register(walletAddress, freeSpins));
      await dispatch(getUserDetails(walletAddress));
    },
    [fetchTokenBalances, dispatch]
  );

  useEffect(() => {
    const checkPhantomInstallation = async () => {
      const isPhantomInstalled = window.solana && window.solana.isPhantom;
      if (!isPhantomInstalled) {
        alert("Phantom Wallet is not installed");
      } else {
        const savedWalletAddress = localStorage.getItem("walletAddress");
        if (savedWalletAddress) {
          setWalletAddress(savedWalletAddress);
          setIsConnected(true);
          await handleWalletConnect(savedWalletAddress);
        }
      }
    };
    checkPhantomInstallation();
  }, [handleWalletConnect]);

  useEffect(() => {
    setSpinDisabled(!isConnected || user?.spins <= 0);
  }, [isConnected, user?.spins]);

  const connectWallet = async () => {
    if (isConnected) {
      setWalletAddress("");
      setIsConnected(false);
      localStorage.removeItem("walletAddress");
    } else {
      try {
        const resp = await window.solana.connect();
        const walletAddress = resp.publicKey.toString();
        setWalletAddress(walletAddress);
        setIsConnected(true);
        localStorage.setItem("walletAddress", walletAddress);
        await handleWalletConnect(walletAddress);
      } catch (err) {
        console.error("Error connecting to Phantom Wallet", err);
      }
    }
  };

  const handleWin = (actualDeg) => {
    const adjustedDeg = (actualDeg + 90) % 360;
    const segmentNumber = Math.floor(adjustedDeg / 45) + 1;
    setDisplay(symbolSegments[segmentNumber]);

    // Play the win sound
    winSoundRef.current.play();

    // Show the confetti
    setShowConfetti(true);

    onOpen();
  };

  const spinWheel = () => {
    setDisplay("-");
    wheelRef.current.style.pointerEvents = "none";

    const newDeg = Math.floor(1000 + Math.random() * 1000);
    const adjustedDeg = newDeg % 360;
    const finalDeg = Math.round(adjustedDeg / 45) * 45;
    const totalRotation = newDeg - adjustedDeg + finalDeg;

    wheelRef.current.style.transition = "all 10s ease-in-out";
    wheelRef.current.style.transform = `rotate(${totalRotation}deg)`;

    wheelRef.current.addEventListener(
      "transitionend",
      async () => {
        wheelRef.current.style.pointerEvents = "auto";
        setTimeout(async () => {
          handleWin(finalDeg);
          await dispatch(updateSpins(walletAddress));
          await dispatch(getUserDetails(walletAddress));
          await dispatch(listUsers());
          setTimeLeft(86400); // Start the timer after spin completes
          setSpinDisabled(true); // Disable spin button until timer ends
        }, 1000);
      },
      { once: true }
    );
  };

  const resetWheel = () => {
    wheelRef.current.style.transition = "none";
    wheelRef.current.style.transform = `rotate(0deg)`;
    setTimeout(() => {
      wheelRef.current.style.transition = "all 10s ease-in-out";
    }, 500);
  };

  const handleClose = () => {
    resetWheel();
    setShowConfetti(false); // Hide the confetti
    onClose();
  };
  const confettiDuration = 1 * 1000; // Duration in milliseconds (2 seconds)
  const colors = ["#ffff00", "#ffffff"];

  function frame(startTime) {
    const elapsed = Date.now() - startTime;
    if (elapsed < confettiDuration) {
      confetti({
        particleCount: 1,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors,
      });

      confetti({
        particleCount: 1,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors,
      });

      requestAnimationFrame(() => frame(startTime));
    }
  }

  const ConfettiComponent = () => {
    useEffect(() => {
      if (showConfetti) {
        const startTime = Date.now();
        const frame = () => {
          const elapsed = Date.now() - startTime;
          if (elapsed < confettiDuration) {
            confetti({
              particleCount: 1,
              angle: 60,
              spread: 55,
              zIndex: 10000,
              origin: { x: 0 },
              colors: ["#ffff00", "#ffffff"],
              shapes: ["circle", "square", "star"],
            });

            confetti({
              particleCount: 1,
              angle: 120,
              spread: 55,
              zIndex: 10000,
              origin: { x: 1 },
              colors: ["#ffff00", "#ffffff"],
              shapes: ["circle", "square", "star"],
            });

            requestAnimationFrame(frame);
          }
        };

        frame();

        // Cleanup function to stop animation after 5 seconds
        const timer = setTimeout(() => {
          setShowConfetti(false);
        }, confettiDuration);

        return () => clearTimeout(timer);
      }
    }, [showConfetti]);

    return null;
  };

  useEffect(() => {
    if (showConfetti) {
      // Hide confetti after 2 seconds
      setTimeout(() => setShowConfetti(false), confettiDuration);
    }
  }, [showConfetti]);

  const triggerConfetti = () => {
    setShowConfetti(true);
  };

  const handleSpin = () => {
    // Perform the spinning action
    spinWheel();

    // Introduce a slight delay to ensure the image is visible
    setTimeout(() => {
      // Trigger confetti after spinning
      triggerConfetti();
    }, 500); // 800 milliseconds delay, adjust as needed
  };

  useEffect(() => {
    if (timeLeft > 0) {
      const timerId = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
      return () => clearInterval(timerId);
    } else if (timeLeft === 0 && isSpinDisabled) {
      setSpinDisabled(false); // Enable spin after timer ends
    }
  }, [timeLeft, isSpinDisabled]);

  const hours = Math.floor(timeLeft / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;

  return (
    <Box position="relative" overflow="visible">
      {/* Confetti should be on top of all other content */}
      {handleSpin && showConfetti && <ConfettiComponent />}
      <Flex justifyContent="flex-end" py="5" px={10}>
        {isConnected ? (
          <Menu>
            <MenuButton
              as={Button}
              rightIcon={<IoChevronDown />}
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
              isTruncated
            >
              <Text w="6.6rem" isTruncated>
                {user.name ? user.name : user.walletAddress}
              </Text>
            </MenuButton>
            <MenuList
              color="rgb(242, 240, 245)"
              border="1px solid rgb(140, 65, 245)"
              backgroundColor="rgb(59, 9, 128)"
              borderRadius="16px"
              boxShadow="rgba(111, 17, 242, 0.25) 0px 12px 16px 0px"
              opacity="1"
              fontSize="1.2rem"
            >
              <MenuItem
                as={RouterLink}
                to="/profile"
                backgroundColor="rgb(59, 9, 128)"
              >
                Profile
              </MenuItem>
              {/* <MenuDivider /> */}
              <MenuItem
                backgroundColor="rgb(59, 9, 128)"
                onClick={connectWallet}
              >
                Disconnect
              </MenuItem>
            </MenuList>
          </Menu>
        ) : (
          <Button
            onClick={connectWallet}
            color="rgb(242, 240, 245)"
            backgroundColor="rgb(59, 9, 128)"
            borderRadius="16px"
            boxShadow="rgba(111, 17, 242, 0.25) 0px 12px 16px 0px"
            opacity="1"
            _hover="none"
            _active="none"
            fontSize="1.2rem"
          >
            Connect Wallet
          </Button>
        )}
      </Flex>
      {/*
<Flex
justifyContent="center"
alignItems="center"
w="100vw"
h="100vh"
position="relative"
zIndex={10}
>
*/}
      <Grid
        templateColumns="repeat(2, 1fr)"
        bgPosition="center"
        bgImage="url('../assets/bg.jpg')"
      >
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          p={10}
          gap={5}
        >
          {/* Display remaining free spins at the top */}
          <div ref={wheelRef} className="wheel"></div>
          <Flex alignItems="center" mb={2} mt={-10} gap={7}>
            <Text fontSize="xl" fontWeight="bold" color="white">
              {user?.spins > 0
                ? `Daily Free Spin: ${user.spins} ${user.spins > 1 ? "s" : ""} `
                : "No Free Spins"}
            </Text>
            <Tooltip
              label="By holding your favorite tokens, you’ll receive 4 daily free spins. For those who stake our native CG tokens, you’ll enjoy 6 daily free spins, maximizing your chances to score big. Even if you're not a token holder or staker, you still get 1 daily free spin to join in on the fun!"
              fontSize="md"
              bg="rgb(59, 9, 128)"
              color="white"
              border="1px solid rgb(140, 65, 245)"
              placement="top"
              hasArrow
            >
              <Button
                ml={-7}
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
            {/*</Flex>
        <Flex alignItems="center" mb={2}>*/}
            <Text fontSize="xl" fontWeight="bold" color="white">
              {bonusSpins > 0
                ? `Bonus Spin: ${bonusSpins} ${bonusSpins > 1 ? "s" : ""} `
                : "No Bonus Spins"}
            </Text>
            <Tooltip
              label="Want more chances to win? You can buy additional spins using Solana (SOL) or CG tokens."
              fontSize="md"
              bg="rgb(59, 9, 128)"
              color="white"
              border="1px solid rgb(140, 65, 245)"
              placement="top"
              hasArrow
            >
              <Button
                ml={-7}
                variant="link"
                color="white"
                fontSize="lg"
                _hover={{ bg: "transparent" }}
                _active={{ bg: "transparent" }}
                _focus={{ boxShadow: "none" }}
                onClick={() => {
                  /* handle the buy action here */
                }}
              >
                <AiOutlineShoppingCart />
              </Button>
            </Tooltip>
          </Flex>
          <Box
            position="relative"
            w="500px"
            h="500px"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Image
              ref={wheelRef}
              src="../assets/prizewheel.png"
              alt="Wheel"
              width="100%"
              height="100%"
            />
            <Image
              src="../assets/marker.png"
              alt="Marker"
              position="absolute"
              width="100%"
              zIndex="1"
            />
          </Box>

          {/* Social Share Buttons - Vertical on the right 
          <Box
            position="absolute"
            right="10px"
            top="50%"
            transform="translateY(-50%)"
          >
            <Flex direction="column" gap={4}>
              <Tooltip label="Share on Twitter" hasArrow>
                <TwitterShareButton url={shareUrl} title={title}>
                  <TwitterIcon size={32} round />
                </TwitterShareButton>
              </Tooltip>

              <Tooltip label="Share on Facebook" hasArrow>
                <FacebookShareButton url={shareUrl} quote={title}>
                  <FacebookIcon size={32} round />
                </FacebookShareButton>
              </Tooltip>

              <Tooltip label="Share on WhatsApp" hasArrow>
                <WhatsappShareButton url={shareUrl} title={title}>
                  <WhatsappIcon size={32} round />
                </WhatsappShareButton>
              </Tooltip>

              <Tooltip label="Share on LinkedIn" hasArrow>
                <LinkedinShareButton url={shareUrl} title={title}>
                  <LinkedinIcon size={32} round />
                </LinkedinShareButton>
              </Tooltip>
            </Flex>
          </Box>*/}
          <Box
            as="button"
            position="relative"
            display="inline-block"
            bg="transparent"
            p="0"
            cursor="pointer"
            outlineOffset="4px"
            transition="filter 250ms"
            userSelect="none"
            _hover={{ filter: "brightness(110%)" }}
          >
            <Box
              position="absolute"
              top="0"
              left="0"
              w="100%"
              h="100%"
              borderRadius="12px"
              bg="blackAlpha.400"
              transform="translateY(2px)"
              transition="transform 600ms cubic-bezier(.3, .7, .4, 1)"
              _hover={{
                transform: "translateY(4px)",
                transition: "transform 250ms cubic-bezier(.3, .7, .4, 1.5)",
              }}
              _active={{
                transform: "translateY(1px)",
                transition: "transform 34ms",
              }}
            />
            <Button
              onClick={spinWheel}
              disabled={isSpinDisabled}
              position="relative"
              display="block"
              px={{ base: "12px 27px", md: "10" }}
              borderRadius="12px"
              fontSize={{ base: "1.1rem", md: "3xl" }}
              size="lg"
              color="#f4bb1b"
              bgGradient="linear-gradient(135deg, #460036, #5c403c, #f4bb1b)"
              transform="translateY(-4px)"
              transition="transform 600ms cubic-bezier(.3, .7, .4, 1)"
              _hover={{
                transform: "translateY(-6px)",
                transition: "transform 250ms cubic-bezier(.3, .7, .4, 1.5)",
              }}
              _active={{
                transform: "translateY(-2px)",
                transition: "transform 34ms",
              }}
              boxShadow="rgba(0, 0, 0, 0.16) 0px 4px 10px"
              isDisabled={isSpinDisabled} // Disable the button if isSpinDisabled is true
            >
              Spin the Wheel
            </Button>
            <div className="timer">
              Next spin in:{" "}
              <div className="hms">
                <div className="time-unit">
                  {String(hours).padStart(2, "0")}
                  <span className="label">H</span>
                </div>
                :
                <div className="time-unit">
                  {String(minutes).padStart(2, "0")}
                  <span className="label">M</span>
                </div>
                :
                <div className="time-unit">
                  {String(seconds).padStart(2, "0")}
                  <span className="label">S</span>
                </div>
              </div>
            </div>
          </Box>

          {/* after spining page of reward */}
          <Modal isOpen={isOpen} onClose={handleClose} size="full">
            <ModalOverlay />
            <ModalContent
              bgImage="url(../assets/prizebg.png)"
              bgSize="contain"
              bgRepeat="no-repeat"
              bgPosition="center"
              bgColor="transparent"
              position="relative"
              zIndex="10000"
            >
              <ModalHeader>
                <ModalCloseButton />
              </ModalHeader>
              <ModalBody
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
              >
                <Text
                  position="fixed"
                  fontSize="4xl"
                  color="white"
                  textShadow="0 0 7px #fff, 0px 1px 0px #999, 0px 2px 0px #888, 0px 3px 0px #777, 0px 4px 0px #666, 0px 5px 0px #555, 0px 6px 0px #444, 0px 7px 0px #333, 0px 8px 7px #001135"
                  textAlign="center"
                >
                  {display}
                </Text>
                <Link as={RouterLink} to="/profile">
                  <Button
                    position="relative"
                    top={32}
                    size="lg"
                    fontSize="3xl"
                    bgColor="transparent"
                    _hover={{ bgColor: "transparent" }}
                    letterSpacing="widest"
                    color="#460036"
                    py="12"
                    px="40"
                  >
                    Claim Reward
                  </Button>
                </Link>
              </ModalBody>
              <ModalFooter my="5"></ModalFooter>
            </ModalContent>
          </Modal>
        </Box>
        <Box>
          <SpinTracker />
        </Box>
      </Grid>
    </Box>
  );
};

export default Wheel;
