import styled from "@emotion/styled";
import { Link } from "react-router-dom";

export const Nav = styled.nav`
    background-color: #f8f9fa;
    height: 44px;
    padding: 16px 24px 16px 24px;
    display: flex;
    position: fixed;
    top: 0;
    width: 428px;
    align-items: center;
    box-sizing: border-box;
    z-index: 100;
    font-family: "Pretendard-Medium";
    font-size: 20px;
`;

export const NavLink = styled(Link)`
    text-decoration: none;
    margin: 0 10px;
    text-decoration: none;
    font-size: 20px;
    color: #333;
    box-sizing: border-box;
`;
