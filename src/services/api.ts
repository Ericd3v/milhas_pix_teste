import type { RankingItem } from "../types";


export async function fetchRanking(mileValue: number): Promise<RankingItem[]> {
  const query = mileValue.toFixed(2);

  try {
   const baseUrl = import.meta.env.DEV === true ? '/api' : `${import.meta.env.BASE_URL}`
   const res = await fetch(`${baseUrl}/simulate-ranking?mile_value=${query}`);

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
