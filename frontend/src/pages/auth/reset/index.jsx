import {
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  FormErrorIcon,
  FormErrorMessage,
  FormLabel,
  Heading,
  Icon,
  Image,
  Input,
  Stack,
  Text,
  Tooltip,
  useToast,
} from "@chakra-ui/react";
import Logo from "/logo.png";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { RiArrowGoBackFill } from "react-icons/ri";
import { useMutation } from "react-query";
import { RESET_USER_PASSWORD } from "../../../hooks/useFetchQuery";

const PasswordResetEmail = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({ mode: "onChange" });

  const mutation = useMutation((d) => RESET_USER_PASSWORD(d), {
    onSuccess: (data) => {
      console.log(data);
      toast({
        title: "Password Reset Success",
        description: "Please check your email for further instructions",
        position: "top",
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      navigate("/auth/login");
    },
    onError: (error) => {
      toast({
        title: "Password Reset Failed try again later",
        position: "top",
        status: "error",
        duration: 5000,
        isClosable: true,
      });

      console.log(error);
    },
  });
  const { isLoading } = mutation;
  const onSubmit = (d) => {
    mutation.mutate(d);
    reset();
  };

  return (
    <Container
      maxW="lg"
      py={{ base: "12", md: "12" }}
      px={{ base: "0", sm: "8" }}
      h="100vh"
    >
      <Stack
        spacing="2"
        py={{ base: "0", sm: "6" }}
        bg="white"
        boxShadow={{ base: "none", sm: "md" }}
        borderRadius={{ base: "none", sm: "xl" }}
      >
        <Stack spacing="6">
          <Flex justify="center">
            <Image src={Logo} height="70px" onClick={() => navigate("/")} />
          </Flex>

          <Stack spacing={{ base: "2", md: "3" }} textAlign="center">
            <Heading size={{ base: "xs", md: "md" }} color="#9E8625">
              Enter your Email to reset your Password
            </Heading>
          </Stack>
          <Stack spacing="4" justify="center" direction="row">
            <Text size="md">Remembered your password? </Text>
            <Tooltip
              hasArrow
              label="Go back to login page"
              bg="#9E8625"
              color="white"
              placement="top"
            >
              <Box>
                <Icon
                  color="red"
                  as={RiArrowGoBackFill}
                  boxSize={6}
                  onClick={() => navigate("/auth/login")}
                />
              </Box>
            </Tooltip>
          </Stack>
        </Stack>
        <Box
          py={{ base: "0", sm: "0" }}
          px={{ base: "4", sm: "10" }}
          bg={{ base: "transparent", sm: "bg.surface" }}
        >
          <Stack spacing="4" as="form" is onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing="4">
              <FormControl isInvalid={errors.email} isRequired>
                <FormLabel htmlFor="email">Email</FormLabel>
                <Input
                  {...register("email", {
                    required: "Required",
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: "invalid email address",
                    },
                  })}
                  id="email"
                  required
                  placeholder="Enter your email"
                  type="email"
                />
                {errors.email?.type === "required" && (
                  <FormErrorMessage>
                    <FormErrorIcon /> This field is required!
                  </FormErrorMessage>
                )}
                {errors.email?.type === "pattern" && (
                  <FormErrorMessage>
                    <FormErrorIcon /> Enter a valid email address
                  </FormErrorMessage>
                )}
              </FormControl>
            </Stack>

            <Stack spacing="4">
              <Button
                bg="#9E8625"
                color="white"
                _disabled={{
                  cursor: "not-allowed",
                  opacity: "0.4",
                }}
                isDisabled={!isValid}
                isLoading={isLoading}
                type="submit"
                _hover={{ backgroundColor: "#9E8625" }}
              >
                Reset Password
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Container>
  );
};
export default PasswordResetEmail;
