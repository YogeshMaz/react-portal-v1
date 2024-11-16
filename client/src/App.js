import React, { createContext, useEffect, useState } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import "./App.css";
import Sidebar from "./components/Sidebar";
import Header from "./components/header";
import CustomerRfqs from "./pages/rfq_management/CustomerRfqs";
import RfqDashboard from "./pages/rfq_management/RfqDashboard";
import PartnerRFQs from "./pages/rfq_management/PartnerRfqResponse";
import ProjectDashboard from "./pages/project_management/ProjectDashboard";
import UpcomingDeliveries from "./pages/project_management/UpcomingDeliveries";
import QualityCheck from "./pages/project_management/QualityCheck";
import VendorPos from "./pages/purchase/VendorPos";
import VendorInvoices from "./pages/purchase/VendorInvoices";
import RequestViewPayments from "./pages/purchase/RequestViewPayments";
import AddDrawings from "./pages/drawings/AddDrawings";
import ViewDrawings from "./pages/drawings/ViewDrawings";
import AddAssets from "./pages/assets/AddAssets";
import ViewAssets from "./pages/assets/ViewAssets";
import AssestUtilisation from "./pages/assets/AssestUtilisation";
import Analytics from "./pages/analytics/Analytics";
import ExampleTableEditWithModel from "./pages/TestTable/Table_Ex";
import LoginReport from "./pages/analytics/LoginReport";
import Profile from "./pages/login/profile";
import LoginPage from "./pages/Authentication/Login";
import ForgotPassword from "./pages/Authentication/Forgotpassword";
import PasswordReset from "./pages/Authentication/ResetPassword";
import DashboardBox from "./pages/Dashboard/Dashboard";
import { useTheme } from "./components/ThemeContext";
import { useAuth } from "./pages/Authentication/AuthContext";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap";

import TablePage from "./components/junk/TablePage";
import FormPage from "./components/junk/FormPage";

const MyContext = createContext();

function App() {
  const { toggleTheme, theme } = useTheme();
  const { isAuthenticated, loading } = useAuth(); // Get authentication state and loading state from context
  const [isToggleSidebar, setIsToggleSidebar] = useState(false); // State for toggling sidebar

  // Values to provide via MyContext
  const values = {
    isToggleSidebar,
    setIsToggleSidebar,
  };

  // Get current location path
  const location = useLocation();
  const isLoginPage = location.pathname === "/login"; // Check if the current route is the login page
  const isForgotPwdPage = location.pathname === "/forgot_password"; // Check if the current route is the forgot password page
  const isResetPwdPage = location.pathname === "/reset_password";

  useEffect(() => {
    console.log("Current path:", location.pathname); // Debugging: Check current route
    console.log("Is authenticated:", isAuthenticated); // Debugging: Check authentication status

    // Apply background color if on login or forgot password pages
    if (isLoginPage || isForgotPwdPage || isResetPwdPage) {
      document.body.classList.add("bgColor"); // Add background color class for login and forgot password pages
    } else {
      document.body.classList.remove("bgColor"); // Remove background color class for other pages
    }

    // Cleanup to remove the class when the component unmounts or changes
    return () => {
      document.body.classList.remove("bgColor");
    };
  }, [isLoginPage, isForgotPwdPage, isResetPwdPage, isAuthenticated, location.pathname]);

  // Show loading spinner while checking the authentication state
  if (loading) {
    return <div>Loading...</div>; // Return a loading state while authentication status is being determined
  }

  return (
    <MyContext.Provider value={values}>
      {/* Render Header if not on login or forgot password page */}
      {!(isLoginPage || isForgotPwdPage || isResetPwdPage) && <Header />}

      <div
        className={isLoginPage || isForgotPwdPage || isResetPwdPage ? "mainLogin" : "main d-flex"}
      >
        {/* Show Sidebar if not on login or forgot password page */}
        {!(isLoginPage || isForgotPwdPage || isResetPwdPage) && (
          <div className={`sidebarWrapper ${isToggleSidebar ? "toggle" : ""}`}>
            <Sidebar />
          </div>
        )}

        <div
          className={
            isLoginPage || isForgotPwdPage || isResetPwdPage
              ? "contentLogin" // If it's the login or forgot password page, use login-specific styles
              : `content ${isToggleSidebar ? "toggle" : ""}` // Else, use regular styles, conditionally apply sidebar toggle styles
          }
        >
          <Routes>
            {/* Initially navigate to login page */}
            <Route
              path="/"
              element={
                !isAuthenticated ? (
                  <Navigate to="/login" />
                ) : (
                  <Navigate to="/dashboard" />
                )
              }
            />

            {/* Authenticated Routes */}
            <Route
              path="/dashboard"
              element={
                isAuthenticated ? <DashboardBox /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/customer-rfqs"
              element={
                isAuthenticated ? <CustomerRfqs /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/rfq-dashboard"
              element={
                isAuthenticated ? <RfqDashboard /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/partner-rfq-response"
              element={
                isAuthenticated ? <PartnerRFQs /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/project-dashboard"
              element={
                isAuthenticated ? (
                  <ProjectDashboard />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/upcoming-deliveries"
              element={
                isAuthenticated ? (
                  <UpcomingDeliveries />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/quality-check"
              element={
                isAuthenticated ? <QualityCheck /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/vendor-pos"
              element={
                isAuthenticated ? <VendorPos /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/vendor-invoices"
              element={
                isAuthenticated ? <VendorInvoices /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/view-payments"
              element={
                isAuthenticated ? (
                  <RequestViewPayments />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/add-drawing"
              element={
                isAuthenticated ? <AddDrawings /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/view-drawings"
              element={
                isAuthenticated ? <ViewDrawings /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/add-assets"
              element={
                isAuthenticated ? <AddAssets /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/view-assets"
              element={
                isAuthenticated ? <ViewAssets /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/asset-utilisation"
              element={
                isAuthenticated ? (
                  <AssestUtilisation />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/analytics"
              element={
                isAuthenticated ? <Analytics /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/test_table"
              element={
                isAuthenticated ? (
                  <ExampleTableEditWithModel />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/loginReport"
              element={
                isAuthenticated ? <LoginReport /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/profile"
              element={isAuthenticated ? <Profile /> : <Navigate to="/login" />}
            />
            <Route
              path="/table"
              element={
                isAuthenticated ? <TablePage /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/form"
              element={
                isAuthenticated ? <FormPage /> : <Navigate to="/login" />
              }
            />

            {/* Login Route */}
            <Route
              path="/login"
              element={
                !isAuthenticated ? <LoginPage /> : <Navigate to="/dashboard" />
              }
            />

            {/* Forgot Password Route */}
            <Route
              path="/forgot_password"
              element={
                !isAuthenticated ? (
                  <ForgotPassword />
                ) : (
                  <Navigate to="/dashboard" />
                )
              }
            />

             {/* Reset Password Route */}
             <Route
              path="/reset_password"
              element={
                !isAuthenticated ? (
                  <PasswordReset />
                ) : (
                  <Navigate to="/dashboard" />
                )
              }
            />

          </Routes>
        </div>
      </div>
    </MyContext.Provider>
  );
}

export default App;
export { MyContext };
