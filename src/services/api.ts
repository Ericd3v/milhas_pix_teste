import type { RankingItem } from "../types";


export async function fetchRanking(mileValue: number): Promise<RankingItem[]> {
  const query = mileValue.toFixed(2);

  try {
   const res = await fetch(`${import.meta.env.VITE_API_URL}/simulate-ranking?mile_value=${query}`);

    if (!res.ok) {
      throw new Error(`${res.status} ${res.statusText}`);
    }

    const data: unknown = await res.json();

    if (Array.isArray(data)) {
      return data as RankingItem[];
    }

    return [];
  } catch (error) {
    console.error("Erro ao buscar ranking:", error);

    return [];
  }
}
