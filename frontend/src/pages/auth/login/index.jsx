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
  FormErrorMessage,
  FormErrorIcon,
} from "@chakra-ui/react";
import Logo from "/logo.png";
import { useRef } from "react";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { GET_AUTH, setTokens } from "../../../hooks/useFetchQuery";
import { useUser } from "../../../hooks/useUser";

const Login = () => {
  const toast = useToast();
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const { setUser } = useUser();
  const { isOpen, onToggle } = useDisclosure();
  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const onClickReveal = () => {
    onToggle();
    if (inputRef.current) {
      inputRef.current.focus({ preventScroll: true });
    }
  };

  const mutation = useMutation((c) => GET_AUTH(c), {
    onSuccess: (data) => {
      let { access, refresh, ...newUser } = data;
      toast({
        title: "Login Success",
        position: "top",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      setTokens(access, refresh);
      console.log(newUser);
      setUser({
        ...newUser,
      });

      navigate("/");
    },
    onError: (error) => {
      if (error.detail) {
        toast({
          title: error.detail,
          position: "top",
          status: "error",
          duration: 6000,
          isClosable: true,
        });
        return;
      }
      if (error.error) {
        toast({
          title: error.error,
          position: "top",
          status: "error",
          duration: 6000,
          isClosable: true,
        });
        return;
      }
      toast({
        title: "Invalid username of password",
        position: "top",
        status: "error",
        duration: 6000,
        isClosable: true,
      });
    },
  });

  const { isLoading } = mutation;

  function onSubmit(credentials) {
    toast({
      title: "Logging in...",
      position: "top-right",
      status: "info",
      duration: 1000,
      isClosable: true,
    });
    resetField("password");
    mutation.mutate(credentials);
  }
  return (
    <Container
      maxW={{ base: "100%", md: "lg" }}
      py={{ base: "0" }}
      px={{ base: "0" }}
      display="flex"
      alignItems="center"
      justifyContent="center"
      h="100vh"
    >
      <Stack
        height={{ base: "100%", sm: "fit-content" }}
        boxSize={{ base: "100%" }}
        display={{ base: "flex", sm: "block" }}
        as="form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Stack
          height={{ base: "100%", sm: "fit-content" }}
          bg="white"
          spacing={{ base: 2, sm: 2 }}
          py={{ base: "6", sm: "8" }}
          boxShadow={{ base: "none", sm: "md" }}
          borderRadius={{ base: "none", sm: "xl" }}
        >
          <Stack spacing="6">
            <Flex justify="center">
              <Image
                src={Logo}
                height={"150px"}
                transform="scale(0.7)"
                onClick={() => navigate("/")}
              />
            </Flex>

            <Stack spacing={{ base: "2", md: "3" }} textAlign="center">
              <Heading size={{ base: "sm", md: "md" }} color="brand.blue">
                Log in to your account
              </Heading>
              <Stack
                direction="row"
                align="center"
                gap={{ base: 1, sm: 2 }}
                justify="center"
              >
                <Text color="fg.muted" fontSize={{ base: "sm", sm: "md" }}>
                  Don't have an account?
                </Text>

                <Button
                  fontSize={{ base: "sm", sm: "md" }}
                  variant="text"
                  size="lg"
                  color="#9E8625"
                  textDecor="underline"
                  onClick={() => navigate("/auth/register")}
                >
                  Sign up
                </Button>
              </Stack>{" "}
            </Stack>
          </Stack>
          <Box
            py={{ base: "0", sm: "2" }}
            px={{ base: "4", sm: "10" }}
            bg={{ base: "transparent", sm: "bg.surface" }}
          >
            <Stack spacing="4">
              <Stack spacing="4">
                <FormControl isRequired isInvalid={errors.username}>
                  <FormLabel htmlFor="email">Username</FormLabel>
                  <Input
                    id="email"
                    placeholder="Enter your username"
                    type="text"
                    name="username"
                    borderColor={errors.username ? "red.500" : "#9E8625"}
                    {...register("username", { required: true })}
                  />{" "}
                  {errors.username?.type === "required" && (
                    <FormErrorMessage>
                      <FormErrorIcon />
                      Username is required
                    </FormErrorMessage>
                  )}
                </FormControl>

                <FormControl isRequired isInvalid={errors.password}>
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <InputGroup>
                    <InputRightElement>
                      <IconButton
                        variant="text"
                        aria-label={
                          isOpen ? "Mask password" : "Reveal password"
                        }
                        icon={isOpen ? <HiEyeOff /> : <HiEye />}
                        onClick={onClickReveal}
                      />
                    </InputRightElement>
                    <Input
                      id="password"
                      ref={inputRef}
                      name="password"
                      type={isOpen ? "text" : "password"}
                      autoComplete="current-password"
                      required
                      placeholder="********"
                      {...register("password", { required: true })}
                    />
                  </InputGroup>
                  {errors.password?.type === "required" && (
                    <FormErrorMessage>
                      <FormErrorIcon />
                      password is required
                    </FormErrorMessage>
                  )}
                </FormControl>
              </Stack>
              <HStack justify="space-between">
                <Checkbox defaultChecked>
                  <Text fontSize={{ base: "sm", sm: "md" }}>Remember me</Text>
                </Checkbox>
                <Button
                  fontSize={{ base: "sm", sm: "md" }}
                  variant="text"
                  size="sm"
                  color="#9E8625"
                  onClick={() => navigate("/auth/reset")}
                >
                  Forgot password?
                </Button>
              </HStack>
              <Stack spacing="4">
                <Button
                  bg="#9E8625"
                  color="white"
                  isLoading={isLoading}
                  disabled={isLoading}
                  type="submit"
                  _disabled={{
                    cursor: "not-allowed",
                    opacity: "0.4",
                  }}
                  _hover={{ backgroundColor: "brand.yellow" }}
                >
                  Sign in
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Stack>
    </Container>
  );
};
export default Login;
