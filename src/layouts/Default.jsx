import { Outlet } from "react-router-dom";
import Header from "@/components/Header";
import BottomTab from "@/components/BottomTab";

export default function DefaultLayout() {
    return (
        <>
            <Header />
            <Outlet />
            <BottomTab />
        </>
    );
}
