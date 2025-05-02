
import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/home/header";
import TaskCreationArea from "./components/pages/TaskCreationArea";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import PrivateRoute from "./components/auth/PrivateRoute";
import { AuthProvider } from "./context/AuthContext";
import TaskDetails from "./components/pages/TaskDetails";
import ErrorPage from "./components/pages/ErrorPage";
import SpinWheel from "./components/pages/SpinWheel"; 

const Layout = ({ children }) => {
  const location = useLocation();
  const hideHeaderPaths = ["/login", "/register"];
  const shouldShowHeader = !hideHeaderPaths.includes(location.pathname);

  return (
    <div className="min-h-screen bg-gray-50">
      {shouldShowHeader && <Header />}
      {children}
    </div>
  );
};

const AppRoutes = () => (
  <Routes>
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route
      path="/"
      element={
        <PrivateRoute>
          <div className="container mx-auto px-4 py-6">
            <TaskCreationArea />
          </div>
        </PrivateRoute>
      }
    />
    <Route
      path="/tasks/:id"
      element={
        <PrivateRoute>
          <TaskDetails />
        </PrivateRoute>
      }
    />
    <Route
      path="/spin"
      element={
        <PrivateRoute>
          <SpinWheel />
        </PrivateRoute>
      }
    />{" "}
   
    <Route path="/error" element={<ErrorPage />} />
    <Route path="*" element={<ErrorPage />} />
  </Routes>
);

const App = () => (
  <BrowserRouter>
    <AuthProvider>
      <Layout>
        <AppRoutes />
      </Layout>
    </AuthProvider>
  </BrowserRouter>
);

export default App;
