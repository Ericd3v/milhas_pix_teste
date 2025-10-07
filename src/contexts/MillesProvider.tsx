// MilesProvider.tsx
import { useState, type ReactNode } from "react";
import { MilesContext } from "./MilesContext";
import { useNavigate } from "react-router-dom";

interface IMilesProps {
  children: ReactNode;
}

export default function MilesProvider({ children }: IMilesProps) {
  const [cpf, setCpf] = useState<string>("");
  const [selectedProgram, setSelectedProgram] = useState<string>("")
  const navigate = useNavigate();

  return (
    <MilesContext.Provider value={{ cpf, setCpf, selectedProgram, setSelectedProgram, navigate }}>
      {children}
    </MilesContext.Provider>
  );
}
