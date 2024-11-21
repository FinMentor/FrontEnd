import { RouterProvider, createBrowserRouter } from "react-router-dom";
import DefaultLayout from "@/layouts/Default";
import { TABS } from "@/constant/tabs";
import { PAGES } from "@/constant/pages";

const router = createBrowserRouter([
    {
        element: <DefaultLayout />,
        children: [
            ...TABS.map(tab => ({
                path: tab.path,
                element: tab.element,
                children: tab.subPage.map(subPage => ({
                    path: subPage.path,
                    element: subPage.element,
                })),
            })),
            ...PAGES,
        ],
    },
]);

export default function AppRoutes() {
    return <RouterProvider router={router} />;
}
