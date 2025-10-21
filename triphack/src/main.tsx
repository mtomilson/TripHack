import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import HomePage from "./components/HomePage.tsx";
import NavBar from "./components/NavBar.tsx";
import Test from "./components/Test.tsx";
import Login from "./components/Login.tsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path ="/" element={<HomePage/>}/>
        <Route path ="/Test" element={<Test/>}/>
        <Route path ="/Login" element={<Login/>}/>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
