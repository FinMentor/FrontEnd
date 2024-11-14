import { Nav, NavLink } from "./Header.styles";
import { useSelector } from "react-redux";

function Header() {
    const currentTab = useSelector(state => state.tab.currentTab);

    return (
        <Nav>
            {currentTab}
            <NavLink to="/"></NavLink>
        </Nav>
    );
}

export default Header;
