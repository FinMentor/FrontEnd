import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
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

    const targetTabIndex = TABS.findIndex(tab => location.pathname.startsWith(tab.path));
    const targetPageIndex = PAGES.findIndex(page => location.pathname.startsWith(page.path));

    let showNavigator = true;
    if (targetPageIndex !== -1) {
        showNavigator = PAGES[targetPageIndex].showNavigator;
    }

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
