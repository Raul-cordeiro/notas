import { useEffect, useState } from "react";
// Componente para buscar notas a pagar ou receber
// Supondo que sua API tenha um endpoint que aceita ?tipo=pagar ou ?tipo=receber
// e retorna um JSON com as notas 

interface Nota {
  id: number;
  numero: string;
  empresa: string;
  valor_nota: string;
  tipo_nota: "pagar" | "receber";
  vencimento: string;
}

export default function BuscarNotas() {
  const [tipo, setTipo] = useState<"pagar" | "receber">("pagar");
  const [notas, setNotas] = useState<Nota[]>([]);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    async function fetchNotas() {
      setLoading(true);
      setErro(null);
      try {
        // Supondo que sua API aceite ?tipo=pagar ou ?tipo=receber
        const response = await fetch(`https://notas.raulcordeiro.com.br/Backend/listarnotas.php?tipo=${tipo}`);
        if (!response.ok) throw new Error("Erro ao buscar notas");
        const data = await response.json();
        setNotas(data);
      } catch (e: any) {
        setErro(e.message);
      } finally {
        setLoading(false);
      }
    }
    fetchNotas();
  }, [tipo]);

  return (
    <div className="container">
      <h2>Buscar Notas - {tipo === "pagar" ? "A Pagar" : "A Receber"}</h2>

      <select value={tipo} onChange={(e) => setTipo(e.target.value as "pagar" | "receber")}>
        <option value="pagar">A Pagar</option>
        <option value="receber">A Receber</option>
      </select>

      {loading && <p>Carregando...</p>}
      {erro && <p style={{ color: "red" }}>{erro}</p>}

      <ul>
        {notas.length === 0 && !loading && <li>Nenhuma nota encontrada.</li>}
        {notas.map((nota) => (
          <li key={nota.id}>
            {nota.numero} - {nota.empresa} - R$ {nota.valor_nota} - Vence em {nota.vencimento}
          </li>
        ))}
      </ul>
    </div>
  );
}
