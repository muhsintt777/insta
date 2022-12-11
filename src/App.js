import { Route, Routes } from "react-router-dom";
import "./App.css";
import Content from "./components/content/Content";
import Layout from "./components/layout/Layout";
import LoginPage from "./pages/loginPage/LoginPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Content />} />
        </Route>
        <Route path="login" element={<LoginPage />} />
      </Routes>
    </div>
  );
}

export default App;
