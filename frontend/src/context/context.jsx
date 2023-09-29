import { createContext, useState } from "react";
import PropTypes from "prop-types";

const userContextData = {
  id: "",
  first_name: "",
  last_name: "",
  email: "",
  username: "",
};

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(userContextData);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
