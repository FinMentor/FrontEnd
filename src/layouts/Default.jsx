import { Outlet } from "react-router-dom";
import Header from "@/components/Header";
import BottomTab from "@/components/BottomTab";
import { OutletContainer } from "./Default.styles";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCurrentTab } from "@/states/tabSlice";
import { useLocation } from "react-router-dom";

export default function DefaultLayout() {
    const dispatch = useDispatch();
    const location = useLocation();

    useEffect(() => {
        dispatch(setCurrentTab(window.location.pathname));
    }, [dispatch, location.pathname]);

    return (
        <>
            <Header />
            <OutletContainer>
                <Outlet />
            </OutletContainer>
            <BottomTab />
        </>
    );
}
