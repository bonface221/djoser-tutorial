import { Box, Flex, Heading, Icon, Image, Stack, Text } from "@chakra-ui/react";
import { FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../hooks/useUser";
import { removeTokens } from "../../hooks/useFetchQuery";

const Home = () => {
  const navigate = useNavigate();
  const { user, setUser } = useUser();

  const handleLogOut = () => {
    setUser({});
    removeTokens();
    navigate("/auth/login/");
  };
  return (
    <Flex h="100vh" gap={4} flexDir="column" bgImage="url(/bg.jpg)">
      <Box bg="rgba(245, 226, 197, 0.8)" w="100%" h="fit-content">
        <Stack
          h="fit-content"
          py={2}
          mx={6}
          gap={4}
          flexDir="row"
          justify="space-between"
        >
          <Image src="/logo.png" boxSize="10" />
          <Flex gap={2} onClick={handleLogOut} align="center" cursor="pointer">
            <Icon as={FiLogOut} boxSize="6" />
            <Text fontWeight="bold">Logout</Text>
          </Flex>
        </Stack>
      </Box>
      <Heading
        ml="4"
        textShadow="2xl"
        fontFamily="cursive"
        color="rgba(245, 226, 197, 1)"
      >
        Welcome home,{" "}
        {user.first_name
          ? `${user.first_name} ${user.last_name}`
          : user.username.toUpperCase()}
      </Heading>
    </Flex>
  );
};

export default Home;
