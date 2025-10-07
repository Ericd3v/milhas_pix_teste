import type { RankingItem } from "../../types";

export default function RankingList({ ranking }: { ranking: RankingItem[] }) {
  // 1. Caso a lista esteja vazia
  if (!ranking.length) {
    return <li className="muted">Insira seu valor para atualizar o ranking</li>;
  }

  // 2. Função para formatar a moeda
  const formatCurrency = (value: number | string): string => {
    const numberValue = typeof value === "string" ? parseFloat(value) : value;

    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(numberValue);
  };

  // 3. Renderização dos itens do ranking
  return (
    <>
      {ranking.map((rank) => {
        // Verifica se é o item a ser destacado
        const isHighlight = rank.description
          .toLowerCase()
          .includes("essa será sua posição");

        return (
          // CORREÇÃO: Substituímos <tbody> por <div> para criar um contêiner válido para o item.
          // O className 'ranking-item' é adicionado para facilitar o CSS.
          <div 
            key={rank.position}
            className={`ranking-item ${isHighlight ? "highlight" : ""}`}
          >
            <p className="ranking-details">
              <strong className="position-text">{rank.position}º</strong>{" "}
              <span className="mile-value">{formatCurrency(rank.mile_value)}</span>
            </p>
            
            {/* Exibe o indicador "Você" se for o destaque */}
            {isHighlight && <span className="you-indicator">Você</span>}
          </div>
        );
      })}
    </>
  );
}