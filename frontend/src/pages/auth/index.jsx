import { useRoutes, Navigate, useNavigate } from "react-router-dom";
import Login from "./login";
import Register from "./register";
import { Box } from "@chakra-ui/react";
import ActivateEmail from "./activation";
import ResetPassword from "./password-reset";
import { useEffect, useState } from "react";
import { getAccessToken } from "../../hooks/useFetchQuery";
import { useUser } from "../../hooks/useUser";
import PasswordResetEmail from "./reset";

const Auth = () => {
  const [isLoading, setIsLoading] = useState(false); // set to true
  const navigate = useNavigate();
  const { user } = useUser();
  const routes = useRoutes([
    {
      path: "/",
      element: <Navigate to="/auth/login" />,
    },
    {
      path: "login",
      element: <Login />,
    },
    {
      path: "register",
      element: <Register />,
    },
    {
      path: "reset",
      element: <PasswordResetEmail />,
    },
    {
      path: "activate",
      element: <ActivateEmail />,
    },
    {
      path: "reset-password",
      element: <ResetPassword />,
    },
    {
      path: "*",
      element: <Navigate to="/auth/login" />,
    },
  ]);

  // useEffect(() => {
  //   if (user.id) {
  //     navigate("/");
  //     return;
  //   }

  //   if (getAccessToken()) {
  //     window.location.href = "/";
  //     return;
  //   }
  //   setIsLoading(false);

  //   return setIsLoading(false);
  // }, []);
  // if (isLoading) {
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
  // }
  return (
    <Box
      bgImage="url('/bg.jpg')"
      bgSize="cover"
      bgRepeat="no-repeat"
      minH="100vh"
    >
      {routes}
    </Box>
  );
};
export default Auth;
