import type { PillGroupProps } from "../../types";

export default function PillGroup({
  options,
  selected,
  onSelect,
}: PillGroupProps) {
  return (
    <div className="pill-group">
      {options.map((opt) => (
        <button
          key={opt}
          type="button"
          className={`pill ${selected === opt ? "active" : ""}`}
          onClick={() => onSelect(opt)}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}
