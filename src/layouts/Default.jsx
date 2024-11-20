import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { setCurrentTabIndex } from "@/states/tabSlice";
import { setCurrentPage } from "@/states/pageSlice";
import Header from "@/components/Header";
import BottomTab from "@/components/BottomTab";
import { OutletContainer } from "./Default.styles";
import { TABS } from "@/constant/tabs";
import { PAGES } from "@/constant/pages";
import ErrorBoundary from "@/components/ErrorBoundary";

export default function DefaultLayout() {
    const dispatch = useDispatch();
    const location = useLocation();

    const showNavigator = useSelector(state => state.navigator.showNavigator);
    const targetTabIndex = TABS.findIndex(tab => tab.path === location.pathname);
    const targetPageIndex = PAGES.findIndex(page => page.path === location.pathname);
    console.log("targetTabIndex", targetTabIndex);
    console.log("targetPageIndex", targetPageIndex);
    useEffect(() => {
        dispatch(setCurrentTabIndex(targetTabIndex));
        dispatch(setCurrentPage(targetPageIndex));
    }, [dispatch, targetTabIndex, targetPageIndex]);
    return (
        <>
            <ErrorBoundary fallback={<div>에러 발생</div>}>
                <Header />
                <OutletContainer>
                    <Outlet />
                </OutletContainer>
                {showNavigator && <BottomTab />}
            </ErrorBoundary>
        </>
    );
}
