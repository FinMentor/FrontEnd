import { createContext, useContext, useState, useEffect } from "react";
import { getUserInfo } from "../utils/auth";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const userInfo = getUserInfo();
        setUser(userInfo);

        if (!userInfo) {
            navigate("/login");
        }
    }, [navigate]);

    return <AuthContext.Provider value={{ user, setUser }}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export const useAuth = () => {
    return useContext(AuthContext);
};
