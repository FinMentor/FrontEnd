import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { setCurrentTabIndex } from "@/states/tabSlice";
import Header from "@/components/Header";
import BottomTab from "@/components/BottomTab";
import { OutletContainer } from "./Default.styles";
import { TABS } from "@/constant/tabs";

export default function DefaultLayout() {
    const dispatch = useDispatch();
    const location = useLocation();

    const showNavigator = useSelector(state => state.navigator.showNavigator);
    const targetTabIndex = TABS.findIndex(tab => tab.path === location.pathname);

    useEffect(() => {
        dispatch(setCurrentTabIndex(targetTabIndex));
    }, [dispatch, targetTabIndex]);
    return (
        <>
            <Header />
            <OutletContainer>
                <Outlet />
            </OutletContainer>
            {showNavigator && <BottomTab />}
        </>
    );
}
