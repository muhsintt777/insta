import "./App.css";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PrimaryLayout } from "./layouts/primary-layout/primary-layout";
import { AuthLayout } from "layouts/auth-layout/auth-layout";
import { Home } from "./screens/home/home";
import { Login } from "screens/auth/login/login";

export const App = () => {
  const [showLoader, setShowLoader] = useState(false);

  return (
    <>
      {showLoader ? (
        <p>loadeinggg</p>
      ) : (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<PrimaryLayout />}>
              <Route path="home" index element={<Home />} />
            </Route>
            <Route path="/auth" element={<AuthLayout />}>
              <Route path="login" element={<Login />} />
              <Route path="signup" element={<>sefsefe</>} />
            </Route>
          </Routes>
        </BrowserRouter>
      )}
    </>
  );
};
