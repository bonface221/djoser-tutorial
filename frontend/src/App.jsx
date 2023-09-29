import { useContext, useEffect, useState } from "react";
import "./App.css";
import { useUser } from "./hooks/useUser";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./context/context";
import { Box, useToast } from "@chakra-ui/react";
import { useQuery } from "react-query";
import { getAccessToken, removeTokens, whoami } from "./hooks/useFetchQuery";
import Home from "./pages/home";

function App() {
  const { user } = useUser();
  const [enabled, setEnabled] = useState(false); // this is for the whoami query
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const toast = useToast();

  // const { isLoading: isChecking } = useQuery(["whoami"], whoami, {
  //   onSuccess: (data) => {
  //     if (data.is_deactivated) {
  //       removeTokens();
  //       toast({
  //         title: "Your account is deactivated",
  //         description: "Please contact the admin",
  //         status: "error",
  //         duration: 8000,
  //         isClosable: true,
  //         position: "top",
  //       });

  //       navigate("/auth/login");
  //     }
  //     if (!data.is_active) {
  //       toast({
  //         title: "Your account is not active",
  //         description: "Please verify your email",
  //         status: "error",
  //         duration: 8000,
  //         isClosable: true,
  //         position: "top",
  //       });
  //       removeTokens();
  //       navigate("/auth/login");
  //     }
  //     setUser(data);
  //     console.log(data);
  //   },
  //   onError: (error) => {
  //     console.log(error);

  //     removeTokens();

  //     navigate("/auth/login");
  //   },
  //   enabled: enabled,
  //   retry: false,
  // });

  // useEffect(() => {
  //   if (!isLoading) setIsLoading(true);

  //   if (!getAccessToken()) {
  //     navigate("/auth/login");
  //   }
  //   console.log(user);
  //   if (!user.id) {
  //     console.log("absent");

  //     setEnabled(true);
  //   }

  //   setIsLoading(false);
  // }, [user]);

  // if (isLoading || isChecking)
  //   return (
  //     <Box
  //       h="100vh"
  //       display="flex"
  //       alignItems="center"
  //       justifyContent="center"
  //       bgGradient="linear-gradient(
  //         22deg,
  //         rgba(158, 134, 37, 1) 24%,
  //         rgba(245, 226, 197, 1) 73%
  //       )"
  //       bgSize="cover"
  //       bgPosition="right top"
  //       bgRepeat="no-repeat"
  //     >
  //       <Box className="app-loader"></Box>
  //     </Box>
  //   );

  return (
    <>
      <Home />
    </>
  );
}

export default App;
