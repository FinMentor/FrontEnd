/* eslint-disable react/prop-types */
import { ErrorBoundary as ReactErrorBoundary } from "react-error-boundary";
import { Navigate } from "react-router-dom";
import { Suspense } from "react";
import { useCookies } from "react-cookie";

function ErrorFallback({ error }) {
    const [, , removeCookie] = useCookies(["jwt", "accessToken", "refreshToken"]);
    console.log("ErrorBoundary에서 받은 에러:", error);
    // 403 에러 처리
    if (error?.response?.status === 403) {
        console.log("403 에러 감지 - 로그인 페이지로 리다이렉트");
        removeCookie("jwt");
        removeCookie("accessToken");
        removeCookie("refreshToken");
        return <Navigate to="/login" replace />;
    }
    return (
        <div>
            <h1>Something went wrong.</h1>
        </div>
    );
}

function ErrorBoundary({ children }) {
    console.log("ErrorBoundary 호출됨");
    return (
        <ReactErrorBoundary
            FallbackComponent={ErrorFallback}
            onError={(error, errorInfo) => {
                console.log("ErrorBoundary onError 호출됨:");
                console.log("에러:", error);
                console.log("에러 정보:", errorInfo);
            }}
        >
            <Suspense fallback={<div>로딩 중...</div>}>{children}</Suspense>
        </ReactErrorBoundary>
    );
}

export default ErrorBoundary;
