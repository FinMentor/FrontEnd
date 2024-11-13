import styled from "@emotion/styled";
import { Link } from "react-router-dom";

export const Nav = styled.nav`
    display: flex;
    justify-content: space-around;
    background-color: #f8f8f8;
    position: fixed;
    height: 64px;
    bottom: 0;
    width: 428px;
`;

export const NavLink = styled(Link)`
    text-decoration: none;
    color: #333;
    font-weight: bold;
    display: flex;
    flex-direction: column;
    align-items: center;

    svg {
        margin-bottom: 5px;
    }
`;
