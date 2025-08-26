import React, { Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Loader from "../components/Loader"; // Create a Loader component for fallback UI
import ErrorBoundary from "../errorHandling/errorBoundary";
// Lazy load components
import { useSelector } from "react-redux";
const LoginPage = React.lazy(() => import("../pages/LoginPage"));
const ForgotPasswordPage = React.lazy(() => import("../pages/ForgotPasswordPage"));
const RegistrationPage = React.lazy(() => import("../pages/RegistrationPage"));
// const Dashboard = React.lazy(() => import("../pages/Dashboard"));
const Dashboard = React.lazy(() => import("../pages/userDashboard"));

// const AudioToTextChatbox = React.lazy(()=> import("../components/AudioToTextChatbox"));



// const NotFound = React.lazy(() => import("@/pages/NotFound"));

const AppRoutes = () => {
    const authState = useSelector((state) => state.auth);
    console.log("Auth State:", authState); // Check Redux state

    return (

        <Router>
            <Suspense fallback={<Loader />}>
            {/* Error Boundary catches error while lazy loaded pages fails to load */}
            <ErrorBoundary>   
                <Routes>
                    <Route path="/" element={<LoginPage />} />
                    <Route path="/ForgotPasswordPage" element={<ForgotPasswordPage />} />
                    <Route path="/RegistrationPage" element={<RegistrationPage />} />
                     <Route path="/Dashboard" element={<Dashboard />} />
                    {/* <Route path="/bar" element={<BarGraph />} /> */}
                    {/* <Route element={<ProtectedRoute />}>
                        <Route path="/dashboard" element={<Dashboard />} />
                    </Route>
                    <Route element={<ProtectedRoute />}>
                        <Route path="/Admin" element={<Admin />} />
                    </Route> */}
                    {/* <Route path="/dashboard" element={<Dashboard />} /> */}
                    
                    {/* <Route path="/speech" element={<AudioToTextChatbox />} /> */}
                    {/* <Route path="/dashboard" element={<Dashboard />} /> */}
                    {/* <Route path="*" element={<NotFound />} /> */}
                </Routes>
            </ErrorBoundary>
            </Suspense>
        </Router>
    );
};

export default AppRoutes;
