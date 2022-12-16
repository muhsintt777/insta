import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Content from "./components/content/Content";
import Layout from "./components/layout/Layout";
import { addUserInfo, login, logout } from "./features/userSlice";
import { auth, db } from "./firebase/config";
import LoginPage from "./pages/loginPage/LoginPage";
import ProfilePage from "./pages/profilePage/ProfilePage";
import SignupPage from "./pages/signupPage/SignupPage";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(
          login({
            uid: user.uid,
            email: user.email,
          })
        );
        const fetchUserData = async () => {
          try {
            const docRef = doc(db, "users", user.uid);
            const userInfo = await getDoc(docRef);
            dispatch(addUserInfo({ ...userInfo.data() }));
          } catch (err) {
            console.log(err.message);
          }
        };
        fetchUserData();
        console.log(user);
      } else {
        dispatch(logout());
      }
    });
    return unsub;
  }, [dispatch]);
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Content />} />
          <Route path="profile" element={<ProfilePage />} />
        </Route>
        <Route path="login" element={<LoginPage />} />
        <Route path="signup" element={<SignupPage />} />
      </Routes>
    </div>
  );
}

export default App;
