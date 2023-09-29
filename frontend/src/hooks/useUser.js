import { useContext } from "react";
import { UserContext } from "../context/context";

export const useUser = () => {
  const { user, setUser } = useContext(UserContext);

  return { user, setUser };
};
