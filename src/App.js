import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";
import Habits from "./pages/Habits/Habits";
import Today from "./pages/Today/Today";
import History from "./pages/History/History";
import GlobalStyle from "./assets/images/css/GlobalStyle";
import { UserContext } from "./components/UserContext";
import { useState } from "react";

export default function App() {
  const [user, setUser] = useState(null);
  
  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <UserContext.Provider value={{ user, setUser }}>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/cadastro" element={<SignUp />} />
            <Route path="/habitos" element={<Habits />} />
            <Route path="/hoje" element={<Today />} />
            <Route path="/historico" element={<History />} />
          </Routes>
        </UserContext.Provider>
      </BrowserRouter>
    </>
  );
}
