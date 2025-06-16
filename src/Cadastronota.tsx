import React, { useState } from "react";
import "./Cadastronota.css";

interface NotaFiscalFormData {
  numero: string;
  data_entrada: string;
  vencimento: string;
  empresa: string;
  produto: string;
  quantidade: string;
  valor_nota: string;
  tipo_nota: string;
}

export default function NotaFiscalForm() {
  const [formData, setFormData] = useState<NotaFiscalFormData>({
    numero: "",
    data_entrada: "",
    vencimento: "",
    empresa: "",
    produto: "",
    quantidade: "",
    valor_nota: "",
    tipo_nota: ""
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let result;

    try {
      const response = await fetch("https://notas.raulcordeiro.com.br/Backend/cadastrarnota.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      result = await response.json();
    } catch (err) {
      alert("Erro ao conectar ou processar resposta do servidor. Tente novamente.");
      console.error("Erro ao enviar ou parsear JSON:", err);
      return;
    }

    if (result.status === "ok") {
      alert("Nota fiscal cadastrada com sucesso!");
      setFormData({
        numero: "",
        data_entrada: "",
        vencimento: "",
        empresa: "",
        produto: "",
        quantidade: "",
        valor_nota: "",
        tipo_nota: ""
      });
    } else {
      alert("Erro ao cadastrar nota fiscal: " + result.mensagem);
    }
  };

  return (
    <div className="container">
      <div className="card">
        <form onSubmit={handleSubmit}>
          <h2>Cadastrar Nota Fiscal</h2>
          <p className="letreiro">Lucas Bike - Administrativo.</p>

          <label htmlFor="numero">Número da Nota:</label>
          <input
            id="numero"
            type="text"
            name="numero"
            value={formData.numero}
            onChange={handleChange}
            required
          />

          <label htmlFor="data_entrada">Data de Entrada:</label>
          <input
            id="data_entrada"
            type="date"
            name="data_entrada"
            value={formData.data_entrada}
            onChange={handleChange}
            required
          />

          <label htmlFor="vencimento">Data de Vencimento:</label>
          <input
            id="vencimento"
            type="date"
            name="vencimento"
            value={formData.vencimento}
            onChange={handleChange}
            required
          />

          <label htmlFor="empresa">Nome da Empresa:</label>
          <input
            id="empresa"
            type="text"
            name="empresa"
            value={formData.empresa}
            onChange={handleChange}
            required
          />

          <label htmlFor="produto">Nome do Produto:</label>
          <input
            id="produto"
            type="text"
            name="produto"
            value={formData.produto}
            onChange={handleChange}
            required
          />

          <label htmlFor="quantidade">Quantidade:</label>
          <input
            id="quantidade"
            type="number"
            name="quantidade"
            value={formData.quantidade}
            onChange={handleChange}
            required
          />

          <label htmlFor="valor_nota">Valor da Nota (R$):</label>
          <input
            id="valor_nota"
            type="number"
            step="0.01"
            name="valor_nota"
            value={formData.valor_nota}
            onChange={handleChange}
            required
          />

          <label htmlFor="tipo_nota">Tipo de Nota:</label>
          <select
            id="tipo_nota"
            name="tipo_nota"
            value={formData.tipo_nota}
            onChange={handleChange}
            required
          >
            <option value="">Selecione</option>
            <option value="receber">A Receber</option>
            <option value="pagar">A Pagar</option>
          </select>

          <button type="submit">Salvar Nota</button>
        </form>
      </div>

      <button className="botao-voltar" onClick={() => window.history.back()}>
        Voltar
      </button>
    </div>
  );
}
