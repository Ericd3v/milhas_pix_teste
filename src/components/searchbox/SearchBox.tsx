// FILE: src/components/SearchBox.tsx
import { useState } from "react";

type SearchProps = {
  placeholder?: string;
  onSearch: (query: string) => void;
};

export function SearchBox({ placeholder = "Buscar...", onSearch }: SearchProps) {
  const [query, setQuery] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };

  return (
    <div className="search-box" >
      <input
        type="text"
        value={query}
        placeholder={placeholder}
        onChange={handleChange}
        style={{
          padding: "8px 16px",
          height: "52px",
          width: "110%",
          border: "1px solid #ccc",
          borderRadius: "18px",
          fontSize: "16px",
         
        }}
      />
    </div>
  );
}