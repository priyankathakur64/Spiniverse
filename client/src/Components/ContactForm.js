import {
  Textarea,
  FormControl,
  Input,
  Spacer,
  Flex,
  Button,
} from "@chakra-ui/react";
import { React, useRef } from "react";

const ContactForm = () => {
  const form = useRef();
  //   const toast = useToast();
  //   const navigate = useNavigate();

  //   const [isLoading, setIsLoading] = useState(false);

  //   const sendEmail = (e) => {
  //     e.preventDefault();
  //     setIsLoading(true);

  //     emailjs
  //       .sendForm(
  //         "service_ici5pwj", //YOUR_SERVICE_ID
  //         "template_75olzm5", //YOUR_TEMPLATE_ID
  //         form.current,
  //         "lohQWJmeRpbiliNTV" //YOUR_PUBLIC_KEY
  //       )
  //       .then(
  //         (result) => {
  //           navigate("/");
  //           toast({
  //             title: "Form Submitted",
  //             description: "We'll get back to you as soon as possible",
  //             status: "success",
  //             duration: 2000,
  //           });
  //         },
  //         (error) => {
  //           setIsLoading(false);
  //           console.log(error.text);
  //         }
  //       );
  //   };

  return (
    <Flex direction="column" w={{ base: "80%", md: "50%" }} m="auto" my={10}>
      <form ref={form}>
        {/* NAME */}
        <FormControl id="name" isRequired>
          <Input
            type="text"
            name="from_name"
            placeholder="Enter name"
            border="1px solid rgb(42, 35, 53)"
            _focus={{ border: " 1px solid #bf96fa" }}
            _hover={{ border: "1px solid rgb(42, 35, 53)" }}
          />
        </FormControl>
        <Spacer h="6" />

        {/* Email  */}
        <FormControl id="email" isRequired>
          <Input
            type="email"
            name="to_email"
            placeholder="Enter email address"
            border=" 1px solid rgb(42, 35, 53)"
            _focus={{ border: " 1px solid #bf96fa" }}
            _hover={{ border: "1px solid rgb(42, 35, 53)" }}
          />
        </FormControl>
        <Spacer h="6" />

        {/* Subject */}
        <FormControl id="subject" isRequired>
          <Input
            type="text"
            name="subject"
            placeholder="Subject"
            border=" 1px solid rgb(42, 35, 53)"
            _focus={{ border: " 1px solid #bf96fa" }}
            _hover={{ border: "1px solid rgb(42, 35, 53)" }}
          />
        </FormControl>
        <Spacer h="6" />

        {/*Message */}
        <FormControl id="message" isRequired>
          <Textarea
            type="text"
            name="message"
            placeholder="Message"
            border=" 1px solid rgb(42, 35, 53)"
            _focus={{ border: " 1px solid #bf96fa" }}
            _hover={{ border: "1px solid rgb(42, 35, 53)" }}
          />
        </FormControl>
        <Spacer h="6" />

        <Button
          //   isLoading={isLoading}
          loadingText="Sending"
          type="submit"
          variant="solid"
          color="rgb(242, 240, 245)"
          border=" 1px solid rgb(140, 65, 245)"
          backgroundColor="rgb(59, 9, 128)"
          borderRadius="16px"
          boxShadow="rgba(111, 17, 242, 0.25) 0px 12px 16px 0px"
          opacity="1"
          fontSize="1.2rem"
          size={{ base: "md", md: "md", lg: "lg" }}
          w="full"
          _hover="none"
          _active="none"
        >
          SUBMIT
        </Button>
      </form>
    </Flex>
  );
};

export default ContactForm;
