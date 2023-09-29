import {
  Box,
  Button,
  Checkbox,
  Container,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Heading,
  Image,
  Input,
  IconButton,
  InputGroup,
  InputRightElement,
  useDisclosure,
  Stack,
  Text,
  useToast,
  FormHelperText,
  FormErrorMessage,
  FormErrorIcon,
} from "@chakra-ui/react";
import Logo from "/logo.png";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { CREATE_NEW_USER } from "../../../hooks/useFetchQuery";

const Register = () => {
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const { isOpen, onToggle } = useDisclosure();

  const toast = useToast();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isValid },
  } = useForm({ mode: "onChange" });
  const password = watch("password");

  const onClickReveal = () => {
    onToggle();
    if (inputRef.current) {
      inputRef.current.focus({ preventScroll: true });
    }
  };

  const mutation = useMutation((c) => CREATE_NEW_USER(c), {
    onSuccess: () => {
      toast({
        title: "Registration Success",
        description:
          "check your email for verification and verify your account",
        position: "top",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      navigate("/auth/login");
    },
    onError: (error) => {
      if (error.response.status === 400) {
        if (error.response.data.email) {
          toast({
            title: "Registration Failed",
            description: error.response.data.email[0],
            position: "top",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        }
        if (error.response.data.username) {
          toast({
            title: "Registration Failed",
            description: error.response.data.username[0],
            position: "top",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        }
        if (error.response.data.password) {
          toast({
            title: "Registration Failed",
            description: error.response.data.password[0],
            position: "top",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        }
      }
      toast({
        title: "Registration Failed",
        description: error.message,
        position: "top",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    },
  });

  const { isLoading, error } = mutation;

  if (error) {
    error.code == "ERR_NETWORK" &&
      toast({
        title: error.message,
        description: "Please check your internet connection",
        position: "top",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
  }

  const onSubmit = (data) => {
    if (data.password !== data.confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "Please check your password",
        position: "top",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      return;
    }
    toast({
      title: "Registering",
      position: "top-right",
      status: "info",
      duration: 9000,
      isClosable: true,
    });

    reset();
    // eslint-disable-next-line no-unused-vars
    const { confirmPassword, ...credentials } = data;
    mutation.mutate(credentials);
  };

  return (
    <Container
      maxW={{ base: "100%", md: "2xl" }}
      py={{ base: "0", md: "12" }}
      px={{ base: "0", sm: "8" }}
      minH="100vh"
    >
      <Stack
        pt={{ base: "0", sm: "4" }}
        bg="white"
        boxShadow={{ base: "none", sm: "md" }}
        borderRadius={{ base: "none", sm: "xl" }}
      >
        <Stack spacing="4">
          <Flex justify="center">
            <Image
              height="70px"
              src={Logo}
              transform="scale(0.9)"
              onClick={() => navigate("/")}
            />
          </Flex>

          <Stack spacing={{ base: "2", md: "3" }} textAlign="center">
            <Heading size={{ base: "xs", md: "md" }} color="#9E8625">
              Register for an account today
            </Heading>
            <Stack direction="row" align="center" justify="center">
              <Text color="fg.muted">Already have an account?</Text>
              <Button
                variant="text"
                size="lg"
                color="#9E8625"
                textDecor="underline"
                onClick={() => navigate("/auth/login")}
              >
                Login
              </Button>
            </Stack>
          </Stack>
        </Stack>
        <Box
          as="form"
          onSubmit={handleSubmit(onSubmit)}
          py={{ base: "2", sm: "5" }}
          px={{ base: "4", sm: "10" }}
          bg={{ base: "transparent", sm: "bg.surface" }}
        >
          <Stack spacing="3">
            <Stack spacing="2">
              <FormControl isInvalid={errors.username} isRequired>
                <FormLabel htmlFor="username" fontWeight="bold">
                  Username
                </FormLabel>
                <Input
                  id="username"
                  type="text"
                  placeholder="Enter your preffered username"
                  {...register("username", {
                    required: true,
                  })}
                />
                {errors.username?.type === "required" && (
                  <FormErrorMessage>
                    <FormErrorIcon /> This field is required!
                  </FormErrorMessage>
                )}
              </FormControl>

              <FormControl isInvalid={errors.email} isRequired>
                <FormLabel htmlFor="email" fontWeight="bold">
                  Email
                </FormLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  {...register("email", {
                    required: true,
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                      message: "invalid email address",
                    },
                  })}
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

              <FormControl isInvalid={errors.password} isRequired>
                <FormLabel htmlFor="password" fontWeight="bold">
                  Password
                </FormLabel>
                <InputGroup>
                  <InputRightElement>
                    <IconButton
                      variant="text"
                      aria-label={isOpen ? "Mask password" : "Reveal password"}
                      icon={isOpen ? <HiEyeOff /> : <HiEye />}
                      onClick={onClickReveal}
                    />
                  </InputRightElement>
                  <Input
                    id="password"
                    ref={inputRef}
                    name="password"
                    placeholder="********"
                    type={isOpen ? "text" : "password"}
                    autoComplete="current-password"
                    {...register("password", {
                      required: true,
                      minLength: 6,
                      maxLength: 15,
                      pattern:
                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{6,16}$/,
                    })}
                  />
                </InputGroup>{" "}
                {!errors.password && (
                  <FormHelperText color="brand.blue">
                    Password must contain at least one uppercase letter, one
                    lowercase letter and one number
                  </FormHelperText>
                )}
                {errors.password?.type === "required" && (
                  <FormErrorMessage>
                    <FormErrorIcon /> Password is required!
                  </FormErrorMessage>
                )}
                {errors.password?.type === "pattern" && (
                  <FormErrorMessage>
                    <FormErrorIcon /> password must contain at least one
                    uppercase letter, one lowercase letter and one number
                  </FormErrorMessage>
                )}
                {errors.password?.type === "minLength" && (
                  <FormErrorMessage>
                    <FormErrorIcon /> Password must be at least 6 characters
                  </FormErrorMessage>
                )}
                {errors.password?.type === "maxLength" && (
                  <FormErrorMessage>
                    <FormErrorIcon /> Password cannot exceed 16 characters
                  </FormErrorMessage>
                )}
              </FormControl>
              <FormControl isInvalid={errors.confirmPassword} isRequired>
                <FormLabel htmlFor="passwordConfirm" fontWeight="bold">
                  Confirm Password
                </FormLabel>
                <InputGroup>
                  <InputRightElement>
                    <IconButton
                      variant="text"
                      aria-label={isOpen ? "Mask password" : "Reveal password"}
                      icon={isOpen ? <HiEyeOff /> : <HiEye />}
                      onClick={onClickReveal}
                    />
                  </InputRightElement>
                  <Input
                    id="passwordConfirm"
                    ref={inputRef}
                    name="passwordConfirm"
                    placeholder="********"
                    type={isOpen ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    {...register("confirmPassword", {
                      required: true,
                      validate: (value) =>
                        value === password || "The passwords do not match",
                    })}
                  />
                </InputGroup>
                {errors.confirmPassword?.type === "required" && (
                  <FormErrorMessage>
                    <FormErrorIcon /> Password is required!
                  </FormErrorMessage>
                )}
                {errors.confirmPassword?.type === "validate" && (
                  <FormErrorMessage>
                    <FormErrorIcon /> {errors.confirmPassword.message}
                  </FormErrorMessage>
                )}
              </FormControl>
            </Stack>

            <HStack justify="space-between">
              <Checkbox defaultChecked>Remember me</Checkbox>
            </HStack>
            <Stack spacing="4">
              <Button
                bg="#9E8625"
                type="submit"
                isLoading={isLoading}
                isDisabled={!isValid || isLoading}
                _hover={{
                  bg: "#9E8625",
                }}
                _disabled={{
                  backgroundColor: "gray",
                  cursor: "not-allowed",
                  color: "gray.400",
                  _hover: {
                    backgroundColor: "gray",
                  },
                }}
                color="white"
              >
                Sign up
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Container>
  );
};
export default Register;
