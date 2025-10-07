import type { RankingItem } from "../../types";

export default function RankingList({ ranking }: { ranking: RankingItem[] }) {
  if (!ranking.length) {
    return <li className="muted">Insira seu valor para atualizar o ranking</li>;
  }

  const formatCurrency = (value: number | string): string => {
    const numberValue = typeof value === "string" ? parseFloat(value) : value;

    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(numberValue);
  };

  return (
    <>
      {ranking.map((rank) => {
        const isHighlight  = rank.description
          .toLowerCase()
          .includes("essa será sua posição");

        return (
          <tbody 
            key={rank.position}
            className={isHighlight ? "highlight" : undefined}
          >
            <p >
              <strong className="highlight" >{rank.position}º</strong>{" "}
              <span>{formatCurrency(rank.mile_value)}</span>
            </p>

            {isHighlight && <span className="you" >Você</span>}
          </tbody>
        );
      })}
    </>
  );
}