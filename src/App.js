import "./App.css";
import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/config";
import { fetchUserInfo, login, logout } from "./features/userSlice";
import Content from "./components/content/Content";
import Layout from "./components/layout/Layout";
import LoginPage from "./pages/loginPage/LoginPage";
import ProfilePage from "./pages/profilePage/ProfilePage";
import SignupPage from "./pages/signupPage/SignupPage";
import NotificationsPage from "./pages/notificationsPage/NotificationsPage";
import PrivateRoutes from "./utils/privateRoutes/PrivateRoutes";
import NoRoutePage from "./pages/noRoutePage/NoRoutePage";
import MessagesPage from "./pages/messagesPage/MessagesPage";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(login(user));
        dispatch(fetchUserInfo(user.uid));
      } else {
        dispatch(logout());
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
            <Route path="notifications" element={<NotificationsPage />} />
            <Route path="messages" element={<MessagesPage />} />
          </Route>
        </Route>
        <Route path="login" element={<LoginPage />} />
        <Route path="signup" element={<SignupPage />} />
        <Route path="*" element={<NoRoutePage />} />
      </Routes>
    </div>
  );
}

export default App;
