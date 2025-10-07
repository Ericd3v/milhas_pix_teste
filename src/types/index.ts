export type RankingItem = {
  isUser: any;
  value: any;
  position: number;
  mile_value: number;
  description: string;
};

export type PillGroupProps = {
  options: string[];
  selected: string;
  onSelect: (value: string) => void;
};

export type Step = {
  label: string;
  description?: string;
  path: string;
};

export type StepsProps = {
  current: number;
  steps?: Step[];
};
