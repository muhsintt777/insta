import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Content from "./components/content/Content";
import Layout from "./components/layout/Layout";
import { fetchUserInfo, login, logout } from "./features/userSlice";
import { auth } from "./firebase/config";
import LoginPage from "./pages/loginPage/LoginPage";
import ProfilePage from "./pages/profilePage/ProfilePage";
import SignupPage from "./pages/signupPage/SignupPage";
import PrivateRoutes from "./utils/privateRoutes/PrivateRoutes";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (!user) {
        dispatch(logout());
      } else {
        dispatch(
          login({
            uid: user.uid,
            email: user.email,
          })
        );
        dispatch(fetchUserInfo(user.uid));
      }
    });
    return () => {
      unsub();
    };
  }, [dispatch]);
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Content />} />

          <Route element={<PrivateRoutes />}>
            <Route path="profile" element={<ProfilePage />} />
          </Route>
        </Route>
        <Route path="login" element={<LoginPage />} />
        <Route path="signup" element={<SignupPage />} />
      </Routes>
    </div>
  );
}

export default App;
