import { createBrowserRouter, RouterProvider } from "react-router-dom";
import DefaultLayout from "@/layouts/Default";
import { TABS } from "@/constant/tabs";

const router = createBrowserRouter([
    {
        element: <DefaultLayout />,
        children: TABS.map(tab => ({
            path: tab.path,
            element: tab.element,
        })),
    },
]);

export default function Router() {
    return <RouterProvider router={router} />;
}
