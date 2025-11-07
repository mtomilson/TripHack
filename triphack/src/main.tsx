import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { ApolloProvider } from "@apollo/client/react";

import HomePage from "./components/HomePage.tsx";
import NavBar from "./components/NavBar.tsx";
import Discover from "./components/Discover.tsx";
import Onboarding from "./components/Onboarding.tsx";
import Profile from "./components/Profile.tsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: "http://localhost:5000/api/graphql",
  }),
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/Discover" element={<Discover />} />
          <Route path="/Onboarding" element={<Onboarding />} />
          <Route path="/Profile" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  </StrictMode>
);
