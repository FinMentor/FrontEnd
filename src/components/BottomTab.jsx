import { Nav, NavLink } from "./BottomTab.styles";
import { TABS } from "@/constant/tabs";
function BottomTab() {
    return (
        <Nav>
            {TABS.map(tab => (
                <NavLink to={tab.path} key={tab.name}>
                    <tab.icon />
                    {tab.name}
                </NavLink>
            ))}
        </Nav>
    );
}

export default BottomTab;
