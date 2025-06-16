import React, { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom/client";


ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  </React.StrictMode>
);
import { Routes, Route, useNavigate } from "react-router-dom";
import CadastroNota from "./Cadastronota";
import CadastroProduto from "./Cadastroproduto";

import './letreiro.css';
import "./App.css";

interface Nota {
  numero: string;
  empresa: string;
  vencimento: string;
  valor_nota: string;
}

// Rodapé brabo
function Footer() {
  return (
    <footer style={{
      marginTop: '2rem',
      padding: '1rem',
      backgroundColor: 'BLACK',
      color: '#f0f0f0',
      textAlign: 'center',
      fontSize: '0.9rem',
      fontWeight: 'bold',
      borderTop: '2px solid #444'
    }}>
      Raul Cordeiro Tecnologias © {new Date().getFullYear()} — “TUDO NO TEMPO DE DEUS.”
    </footer>
  );
}

function Home() {
  const navigate = useNavigate();
  const [notasPagar, setNotasPagar] = useState<Nota[]>([]);
  const [notasReceber, setNotasReceber] = useState<Nota[]>([]);
  
  // Buscar notas a pagar e receber
  // Usando o useEffect para buscar as notas ao carregar o componente
  // Isso garante que as notas sejam atualizadas sempre que o componente for montado
  // ou quando houver uma mudança relevante (como uma atualização de estado)
  useEffect(() => {
  fetch("https://notas.raulcordeiro.com.br/Backend/listarnotas.php")

    .then(res => res.json())
    .then(data => {
      if (data.status === "ok") {
        setNotasPagar(data.pagar);
        setNotasReceber(data.receber);
      } else {
        console.error("Erro no backend:", data);
      }
    })
    .catch(err => {
      console.error("Erro ao buscar notas:", err);
    });
}, []);

useEffect(() => {
  fetch("http://notas.raulcordeiro.com.br/Backend/somanotas.php")
    .then(res => res.json())
    .then(data => {
      if(data.status === "ok") {
        setSomaTotais({
          pagar: data.pagar,
          receber: data.receber
        });
      }
    })
    .catch(err => console.error("Erro ao buscar totais:", err));
}, []);

  const [somaTotais, setSomaTotais] = useState({ pagar: 0, receber: 0 });





  return (
    <div className="home-container">
      <div className="marquee-container">
        <h1 className="marquee">⚡ GOLPLEX - Controle de Notas Fiscais ⚡</h1>
      </div>
      <p>Bem-vindo - Raul Cordeiro Tecnologias</p>

      <div className="card">
        <h2>O que você deseja fazer?</h2>
        <div className="button-group">
          <button onClick={() => navigate("/cadastronota")}>Cadastro de Notas</button>
          <button onClick={() => navigate("/cadastrarproduto")}>Cadastro de Produtos</button>
        </div>
      </div>

      <div className="card">
        <h2>📤 Notas a Pagar</h2>
        {notasPagar.length === 0 ? <p>Nenhuma nota a pagar.</p> : (
          <ul>
            {notasPagar.map((nota, i) => (
              <li key={i}>
                {nota.numero} - {nota.empresa} - Vence em {nota.vencimento} - R$ {nota.valor_nota}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="card">
        <h2>📥 Notas a Receber</h2>
        {notasReceber.length === 0 ? <p>Nenhuma nota a receber.</p> : (
          <ul>
            {notasReceber.map((nota, i) => (
              <li key={i}>
                {nota.numero} - {nota.empresa} - Vence em {nota.vencimento} - R$ {nota.valor_nota}
              </li>
            ))}
          </ul>
        )}
      </div>
        <div className="card destaque-card">
          <h2>💰 Totais</h2>
          <p>Total a Pagar: <strong>R$ {somaTotais.pagar.toFixed(2)}</strong></p>
          <p>Total a Receber: <strong>R$ {somaTotais.receber.toFixed(2)}</strong></p>
        </div>

      <Footer />
    </div>
  );  
}

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/cadastronota" element={<CadastroNota />} />
      <Route path="/cadastrarproduto" element={<CadastroProduto />} />
      <Route path="*" element={<h1>404 - Rota perdida no limbo 😵</h1>} />
    </Routes>
  );
}
