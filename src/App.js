import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";
import Habits from "./pages/Habits/Habits";
import Today from "./pages/Today/Today";
import History from "./pages/History/History";
import GlobalStyle from "./assets/images/css/GlobalStyle";
import { UserContext } from "./components/UserContext";
import { useState } from "react";
import { ProgressContext } from "./components/ProgressContext";

export default function App() {
  const localUser = JSON.parse(localStorage.getItem("user"));
  const [user, setUser] = useState(localUser);
  const [progress, setProgress] = useState(null);

  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <UserContext.Provider value={{ user, setUser }}>
          <ProgressContext.Provider value={{ progress, setProgress }}>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/cadastro" element={<SignUp />} />
              <Route path="/habitos" element={<Habits />} />
              <Route path="/hoje" element={<Today />} />
              <Route path="/historico" element={<History />} />
            </Routes>
          </ProgressContext.Provider>
        </UserContext.Provider>
      </BrowserRouter>
    </>
  );
}
