import { Nav, NavLink, IconWrapper } from "./BottomTab.styles";
import { TABS } from "@/constant/tabs";
import { useLocation } from "react-router-dom";

function BottomTab() {
    const location = useLocation();

    return (
        <Nav>
            {TABS.map(tab => (
                <NavLink to={tab.path} key={tab.name}>
                    <IconWrapper>{location.pathname === tab.path ? <tab.invertIcon /> : <tab.icon />}</IconWrapper>
                    {tab.name}
                </NavLink>
            ))}
        </Nav>
    );
}

export default BottomTab;
