import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { setCurrentTab } from "@/states/tabSlice";
import Header from "@/components/Header";
import BottomTab from "@/components/BottomTab";
import { OutletContainer } from "./Default.styles";

export default function DefaultLayout() {
    const dispatch = useDispatch();
    const location = useLocation();
    const showNavigator = useSelector(state => state.navigator.showNavigator);

    useEffect(() => {
        dispatch(setCurrentTab(window.location.pathname));
    }, [dispatch, location.pathname]);
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
