import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import store from "./states/store";
import "./assets/main.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import AppRoutes from "./routes";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <Provider store={store}>
                <AuthProvider>
                    <AppRoutes />
                </AuthProvider>
                <ReactQueryDevtools />
            </Provider>
        </QueryClientProvider>
    </StrictMode>,
);
