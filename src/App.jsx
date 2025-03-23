import React from "react";
import { Routes, Route } from "react-router-dom";
import TelaInicial from "./TelaInicial";
import Login from "./pages/Login"; // crie esse componente depois
import Cadastro from "./pages/Cadastro"; // crie esse também
import Cadastro2 from "./pages/Cadastro2"; // crie esse também
import Cadastro3 from "./pages/Cadastro3"; // crie esse também
import SelecionarTipoCadastro from './pages/SelecionarTipoCadastro';


import "./global.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<TelaInicial />} />
      <Route path="/login" element={<Login />} />
      <Route path="/selecionarTipoCadastro" element={<SelecionarTipoCadastro />} />
      <Route path="/cadastro" element={<Cadastro />} />
      <Route path="/cadastro2" element={<Cadastro2 />} />
      <Route path="/cadastro3" element={<Cadastro3 />} />
    </Routes>
  );
}

export default App;