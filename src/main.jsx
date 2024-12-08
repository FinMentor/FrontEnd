import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import store from "./states/store";
import "./assets/main.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import AppRoutes from "./routes";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: false,
            throwOnError: true,
        },
        mutations: {
            retry: false,
            throwOnError: true,
        },
    },
});

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <Provider store={store}>
                <AppRoutes />
                {/* <ReactQueryDevtools /> */}
            </Provider>
        </QueryClientProvider>
    </StrictMode>,
);
