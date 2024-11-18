import { createBrowserRouter, RouterProvider } from "react-router-dom";
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
                children: tab.subPage.map(subPage => {
                    return {
                        path: subPage.path,
                        element: subPage.element,
                    };
                }),
            })),
            ...PAGES,
        ],
    },
]);

export default function Router() {
    return <RouterProvider router={router} />;
}
