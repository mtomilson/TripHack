import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import HomePage from "./components/HomePage.tsx";
import NavBar from "./components/NavBar.tsx";
import Discover from "./components/Discover.tsx";
import Onboarding from "./components/Onboarding.tsx";
import Profile from "./components/Profile.tsx"
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path ="/" element={<HomePage/>}/>
        <Route path ="/Discover" element={<Discover/>}/>
        <Route path ="/Onboarding" element={<Onboarding/>}/>
        <Route path ="/Profile" element={<Profile/>}/>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
