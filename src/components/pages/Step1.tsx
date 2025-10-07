import { useContext, useState, useEffect } from "react";
import azul from "../../assets/images/azul.png";
import smiles from "../../assets/images/smiles.png";
import portugal from "../../assets/images/portugal.png";
import pass from "../../assets/images/pass.png";
import { BsChevronExpand } from "react-icons/bs";
import { AiFillUnlock } from "react-icons/ai";
import "./style.css";
import { MilesContext } from "../../contexts/MilesContext";
import { FiRefreshCcw } from "react-icons/fi";
import { LuPlus } from "react-icons/lu";

export default function Step1() {
  
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isOpen, setIsOpen] = useState(false); // State para o accordion mobile

  const { cpf, navigate, setCpf, selectedProgram, setSelectedProgram } =
    useContext(MilesContext);

  const programImages: Record<string, string> = {
    azul: azul,
    smiles: smiles,
    pass: pass,
    portugal: portugal,
  };

  // Função para controlar o state do accordion mobile
  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  // Função auxiliar para formatar o CPF (não deve conter Hooks)
  const formatCpf = (value: string) => {
    const rawCpf = value.replace(/\D/g, ""); // Remove caracteres não numéricos
    if (rawCpf.length <= 3) return rawCpf;
    if (rawCpf.length <= 6) return `${rawCpf.slice(0, 3)}.${rawCpf.slice(3)}`;
    if (rawCpf.length <= 9)
      return `${rawCpf.slice(0, 3)}.${rawCpf.slice(3, 6)}.${rawCpf.slice(6)}`;
    return `${rawCpf.slice(0, 3)}.${rawCpf.slice(3, 6)}.${rawCpf.slice(6, 9)}-${rawCpf.slice(9, 11)}`;
  };

  const handleProceed = () => {
    const rawCpf = cpf ? cpf.replace(/\D/g, "") : ""; // Obtém apenas os 11 dígitos
    
    // ✅ CORREÇÃO 2: Validação aprimorada do CPF (checa se tem 11 dígitos numéricos) e se o programa foi selecionado.
    if (!rawCpf || rawCpf.length !== 11 || !selectedProgram) {
      alert("Selecione um programa e digite um CPF válido com 11 dígitos.");
      return;
    }

    navigate("/step-2");
  };

  // Hook para verificar o tamanho da tela
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);

    handleResize(); // Executa uma vez ao montar

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {!isMobile ? (
        // ==================* INÍCIO DESKTOP * ==================
        <div className="page">
          <section className="content-section">
            <div className="step-container">
              <div className="card">
                <div className="card-header">
                  <h2 className="text-step">
                    <span className="one">01.</span> Escolha o programa de fidelidade
                  </h2>
                </div>

                {/* Botões dos programas */}
                <div className="programs">
                  {Object.keys(programImages).map((key) => (
                    <button
                      type="button"
                      key={key}
                      className={`program-btn ${
                        selectedProgram === key ? "active" : ""
                      }`}
                      onClick={() => setSelectedProgram(key)}
                    >
                      <img src={programImages[key]} alt={key} />
                    </button>
                  ))}
                </div>

                {/* Formulário */}
                <form className="form-row" onSubmit={(e) => e.preventDefault()}>
                  <label>
                    <h2 className="text-label">Produto</h2>
                    <div className="select-wrapper">
                      <select className="select-label" defaultValue="liminar">
                        <option value="liminar">Liminar</option>
                        <option value="outro">Outro</option>
                      </select>
                      <BsChevronExpand className="select-icon" />
                    </div>
                  </label>

                  <label>
                    <h2 className="text-label">CPFs Disponíveis</h2>
                    <div className="icon-wrapper">
                      <input
                        className="step-ilimitado"
                        type="text"
                        maxLength={14} // 14 é o tamanho do CPF formatado (XXX.XXX.XXX-XX)
                        value={cpf || ""}
                        placeholder="Ilimitado"
                        onChange={(e) => {
                          const formattedCpf = formatCpf(e.target.value);
                          setCpf(formattedCpf); 
                        }}
                      />
                      <AiFillUnlock className="lok-icon" />
                    </div>
                  </label>
                </form>
              </div>

              <div className="card-icon">
                <h4>Selecione o programa</h4>
                <p>
                  Escolha de qual programa de fidelidade você quer vender suas
                  milhas. Use apenas contas em seu nome.
                </p>
              </div>
            </div>

            {/* Botão fora do card */}
            <div className="actions-out">
              <button
                type="button"
                className="btn-primary"
                onClick={handleProceed}
                disabled={!selectedProgram}
              >
                Prosseguir →
              </button>
            </div>
          </section>
        </div>
      ) : (
        // ==================* INÍCIO MOBILE * ==================
        <div className="page">
          <section>
            <div className="card-mobile">
              <div className="header-mobile">
                <h2 className="text-step-mobile" style={{ color: "#2E3D50" }}>
                  <span className="one-mobile" style={{ color: "#1E90FF" }}>
                    01.
                  </span>{" "}
                  Escolha o programa de fidelidade
                </h2>
              </div>
              <div className="programs-mobile">
                <FiRefreshCcw className="refresh-icon" />
                <select
                  className="program-select-mobile"
                  value={selectedProgram ?? ""}
                  onChange={(e) => setSelectedProgram(e.target.value)}
                >
                  {Object.keys(programImages).map((key) => (
                    <option key={key} value={key}>
                      {key}
                    </option>
                  ))}
                </select>
                {selectedProgram && (
                  <img
                    src={programImages[selectedProgram]}
                    alt={selectedProgram}
                    className="program-image-mobile"
                  />
                )}
              </div>
              {/* Formulário */}
              <form className="form-row-mobile" onSubmit={(e) => e.preventDefault()}>
                <label>
                  <h2 className="text-mobile2">Produto</h2>
                  <div className="div-mobile">
                    <select className="mobile" defaultValue="liminar">
                      <option value="liminar">Liminar</option>
                      <option value="outro">Outro</option>
                    </select>
                    <BsChevronExpand className="select-icon-mobile" />
                  </div>
                </label>

                <label>
                  <h2 className="text-mobile2">CPFs Disponíveis</h2>
                  <div className="div-mobile">
                    <input
                      className="mobile" style={{background:'#E2E2E2'}}
                      type="text"
                      maxLength={14} // 14 é o tamanho do CPF formatado (XXX.XXX.XXX-XX)
                      value={cpf || ""}
                      placeholder="Ilimitado"
                      onChange={(e) => {
                        const formattedCpf = formatCpf(e.target.value);
                        setCpf(formattedCpf); 
                      }}
                    />
                    <AiFillUnlock className="lok-icon-mobile" />
                  </div>
                </label>
              </form>
            </div>
            <div className="space-mobile">
              <div className="program-mobile">
                {/* Botão + / - */}
                {/* O onClick agora chama o toggleOpen do nível superior */}
                <div className="toggle-header" onClick={toggleOpen}> 
                  {isOpen ? <span>−</span> : <LuPlus className="plus" />}
                  <h4 className="h4-mobile">Selecione o programa</h4>
                </div>

                {/* Conteúdo sanfona */}
                <div
                  className={`program-content-mobile ${isOpen ? "open" : ""}`}
                >
                  <p className="p-mobile">
                    Escolha de qual programa de fidelidade você quer vender suas
                    milhas. Use apenas contas em seu nome.
                  </p>
                  <select className="program-selecte-mobile">
                    <option value="">Escolha uma opção</option>
                  </select>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}
    </>
  );
}