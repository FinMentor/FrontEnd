import { createContext, useContext, useState, useEffect } from "react";
import { getUserInfo } from "../utils/auth";
import PropTypes from "prop-types";

const AuthContext = createContext();

const PUBLIC_PATHS = ["/login", "/signup"];

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const userInfo = getUserInfo();
        const isPublicPath = PUBLIC_PATHS.some(path => window.location.pathname.startsWith(path));
        setUser(userInfo);

        if (!userInfo && !isPublicPath) {
            window.location.href = "/login";
        }
    }, []);

    return <AuthContext.Provider value={{ user, setUser }}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export const useAuth = () => {
    return useContext(AuthContext);
};
