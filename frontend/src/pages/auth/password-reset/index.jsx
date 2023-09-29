import {
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Image,
  Input,
  IconButton,
  InputGroup,
  InputRightElement,
  useDisclosure,
  Stack,
  useToast,
  FormHelperText,
  FormErrorMessage,
  FormErrorIcon,
} from "@chakra-ui/react";
import Logo from "/logo.png";
import { useRef } from "react";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { RESET_PASSWORD } from "../../../hooks/useFetchQuery";
import { useMutation } from "react-query";

const ResetPassword = () => {
  const toast = useToast();
  let [searchParams] = useSearchParams();
  const uid = searchParams.get("uid");
  const token = searchParams.get("token");
  const inputRef = useRef(null);
  const secondInputRef = useRef(null);
  const navigate = useNavigate();
  const { isOpen, onToggle } = useDisclosure();
  const { isOpen: isOpen2, onToggle: onToggle2 } = useDisclosure();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isValid },
  } = useForm({ mode: "onChange" });
  const password = watch("password");

  const onClickReveal = (refer = "second") => {
    if (refer === "first") {
      onToggle();
      if (inputRef.current) {
        inputRef.current.focus({ preventScroll: true });
      }
    } else if (refer === "second") {
      onToggle2();
      if (secondInputRef.current) {
        secondInputRef.current.focus({ preventScroll: true });
      }
    }
  };

  const mutation = useMutation((c) => RESET_PASSWORD(c), {
    onSuccess: () => {
      toast({
        title: "Reset Password Success",
        description: "Please login with your new password",
        position: "top",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      navigate("/auth/login");
    },
    onError: (error) => {
      toast({
        title: "Reset Password Failed",
        description: error.message,
        position: "top",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    },
  });

  const { isLoading } = mutation;

  function onSubmit(credentials) {
    reset();
    if (!uid || !token) {
      toast({
        title: "You don't have permission to access activation page",
        position: "top",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      navigate("/auth/login");

      console.log(credentials);

      return;
    }
    if (uid && token) {
      console.log(credentials);

      if (credentials.password !== credentials.confirmPassword) {
        toast({
          title: "Passwords did not match try again",
          position: "top",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
        return;
      }

      const newCredentials = {
        new_password: credentials.password,
        uid: uid,
        token: token,
      };

      mutation.mutate(newCredentials);
    }
  }
  return (
    <Container
      maxW="lg"
      py={{ base: "12", md: "12" }}
      px={{ base: "0", sm: "8" }}
      h="100vh"
    >
      <Box as="form" onSubmit={handleSubmit(onSubmit)}>
        <Stack
          spacing="2"
          pt={{ base: "0", sm: "8" }}
          pb={{ base: "0", sm: "5" }}
          bg="white"
          boxShadow={{ base: "none", sm: "md" }}
          borderRadius={{ base: "none", sm: "xl" }}
        >
          <Stack spacing="6">
            <Flex justify="center">
              <Image src={Logo} height="70px" onClick={() => navigate("/")} />
            </Flex>

            <Stack spacing={{ base: "2", md: "3" }} textAlign="center">
              <Heading size={{ base: "xs", md: "lg" }} color="brand.blue">
                Reset your Password
              </Heading>
            </Stack>
          </Stack>
          <Box
            py={{ base: "0", sm: "2" }}
            px={{ base: "4", sm: "10" }}
            bg={{ base: "transparent", sm: "bg.surface" }}
          >
            <Stack spacing="4">
              <Stack spacing="4">
                <FormControl
                  isRequired
                  isInvalid={errors.password}
                  _invalid={{
                    borderColor: "red",
                  }}
                >
                  <FormLabel htmlFor="password">New Password</FormLabel>
                  <InputGroup>
                    <InputRightElement>
                      <IconButton
                        variant="text"
                        aria-label={
                          isOpen ? "Mask password" : "Reveal password"
                        }
                        icon={isOpen ? <HiEyeOff /> : <HiEye />}
                        onClick={() => onClickReveal("first")}
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
                      {...register("password", {
                        required: true,
                        minLength: 6,
                        maxLength: 12,
                        pattern:
                          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{6,16}$/,
                      })}
                    />
                  </InputGroup>
                  {!errors.password && (
                    <FormHelperText color="fg.muted">
                      Password must contain at least one uppercase letter, one
                      lowercase letter and one number
                    </FormHelperText>
                  )}
                  {errors.password?.type === "required" && (
                    <FormErrorMessage>
                      <FormErrorIcon />
                      Password is required
                    </FormErrorMessage>
                  )}

                  {errors.password?.type === "pattern" && (
                    <FormErrorMessage>
                      <FormErrorIcon />
                      Password must contain at least one uppercase letter, one
                      lowercase letter and one number
                    </FormErrorMessage>
                  )}
                  {errors.password?.type === "minLength" && (
                    <FormErrorMessage>
                      <FormErrorIcon />
                      Password must be at least 6 characters
                    </FormErrorMessage>
                  )}
                  {errors.password?.type === "maxLength" && (
                    <FormErrorMessage>
                      <FormErrorIcon />
                      Password must be at most 12 characters
                    </FormErrorMessage>
                  )}
                </FormControl>
                <FormControl isInvalid={errors.confirmPassword}>
                  <FormLabel htmlFor="confirmPassword">
                    Confirm Password
                  </FormLabel>
                  <InputGroup>
                    <InputRightElement>
                      <IconButton
                        variant="text"
                        aria-label={
                          isOpen2 ? "Mask password" : "Reveal password"
                        }
                        icon={isOpen2 ? <HiEyeOff /> : <HiEye />}
                        onClick={() => onClickReveal("second")}
                      />
                    </InputRightElement>
                    <Input
                      id="confirmPassword"
                      ref={secondInputRef}
                      name="confirmPassword"
                      type={isOpen2 ? "text" : "password"}
                      autoComplete="confirmPassword"
                      required
                      placeholder="********"
                      {...register("confirmPassword", {
                        required: true,
                        validate: (value) =>
                          value === password || "The passwords do not match",
                      })}
                    />
                  </InputGroup>
                  {errors.confirmPassword?.type === "required" && (
                    <FormErrorMessage>
                      <FormErrorIcon />
                      Password is required
                    </FormErrorMessage>
                  )}
                  {errors.confirmPassword?.type === "validate" && (
                    <FormErrorMessage>
                      <FormErrorIcon />
                      {errors.confirmPassword.message}
                    </FormErrorMessage>
                  )}
                </FormControl>
              </Stack>

              <Stack spacing="4">
                <Button
                  bg="#9E8625"
                  color="white"
                  isLoading={isLoading}
                  isDisabled={isLoading || !isValid}
                  type="submit"
                  _hover={{ backgroundColor: "#9E8625" }}
                >
                  Reset Password
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Box>
    </Container>
  );
};
export default ResetPassword;
