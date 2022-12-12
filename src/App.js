import { Route, Routes } from "react-router-dom";
import "./App.css";
import Content from "./components/content/Content";
import Layout from "./components/layout/Layout";
import LoginPage from "./pages/loginPage/LoginPage";
import SignupPage from "./pages/signupPage/SignupPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Content />} />
        </Route>
        <Route path="login" element={<LoginPage />} />
        <Route path="signup" element={<SignupPage />} />
      </Routes>
    </div>
  );
}

export default App;
