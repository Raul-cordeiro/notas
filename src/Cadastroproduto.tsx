import React, { useState } from 'react';
import './CadastrarProduto.css';

const CadastrarProduto: React.FC = () => {
  const [mensagem, setMensagem] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("https://notas.raulcordeiro.com.br/Backend/cadastrarproduto.php", {
        method: "POST",
        body: formData,
      });

      const resultado = await response.text();
      setMensagem(resultado);
      form.reset(); // limpa o formulário
    } catch (error) {
      setMensagem('Erro ao cadastrar produto.');
    }
  };

  return (
    <div className="form-wrapper">
      <div>
        <h2>Cadastrar Produto</h2>
        <p className="letreiro">Lucas Bike - Administrativo.</p>
        <form onSubmit={handleSubmit} encType="multipart/form-data">

          <input
            type="text"
            name="nome"
            placeholder="Nome do Produto"
            required
          /><br />

          <textarea
            name="descricao"
            placeholder="Descrição do Produto"
          /><br />

          <input
            type="number"
            name="preco"
            step="0.01"
            placeholder="Preço (R$)"
            required
          /><br />

          <input
            type="number"
            name="quantidade"
            placeholder="Quantidade"
            required
          /><br />

          <input
            type="file"
            name="imagem"
            accept="image/*"
          /><br />

          <button type="submit">Cadastrar Produto</button>
        </form>
    
        {mensagem && <p>{mensagem}</p>}
        <button className="botao-voltar2" onClick={() => window.history.back()}></button>
      </div>
      
    </div>
  );
};

export default CadastrarProduto;
