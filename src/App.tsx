import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PrimaryLayout } from "./layouts/primary-layout/primary-layout";
import { Home } from "./screens/home/home";

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PrimaryLayout />}>
          <Route index element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
