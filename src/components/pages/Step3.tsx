import { useContext, useState, useEffect, type FormEvent } from "react";
import { MilesContext } from "../../contexts/MilesContext";
import { FaLock, FaUser, FaWhatsapp } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import azul from "../../assets/images/azul.png";
import smiles from "../../assets/images/smiles.png";
import portugal from "../../assets/images/portugal.png";
import pass from "../../assets/images/pass.png";
import { LuEyeClosed, LuEye } from "react-icons/lu";
import { RiSubtractFill } from "react-icons/ri";
import "./style.css"; 

export default function Step3() {
  const { cpf, navigate, selectedProgram } = useContext(MilesContext);

  const programImages: Record<string, string> = {
    azul,
    smiles,
    portugal,
    pass,
  };

  const chosenImage = selectedProgram ? programImages[selectedProgram] : null;

  // States
  const [phone, setPhone] = useState("");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // =========================
  // Funções Auxiliares
  // =========================

  const formatPhone = (value: string) => {
    // Remove tudo que não for dígito
    const digits = value.replace(/\D/g, "");
    
    // Formatação (11) 91234-5678 ou (11) 1234-5678
    if (digits.length <= 2) return `(${digits}`;
    if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
    if (digits.length <= 11) return `(${digits.slice(0, 2)}) ${digits.slice(2, digits.length === 11 ? 7 : 6)}-${digits.slice(digits.length === 11 ? 7 : 6)}`;
    
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7, 11)}`;
  };

  const handlePhoneChange = (value: string) => {
    setPhone(formatPhone(value));
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Adicionar validação simples aqui
    if (!email || !password || phone.replace(/\D/g, "").length < 10) {
      alert("Por favor, preencha todos os campos corretamente.");
      return;
    }
    
    // Se a validação passar, navega
    navigate("/step-4");
  };

  // =========================
  // Responsividade
  // =========================
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    handleResize(); // Executa ao montar para definir o estado inicial correto
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  
  // =================================================================
  // Componente de Formulário Reutilizável para Desktop e Mobile
  // =================================================================

  const RenderFormContent = ({ isMobileVersion = false }) => (
    <form onSubmit={handleSubmit} className={isMobileVersion ? "form-grid-mobile" : "form-grid"}>
      {/* 1. CPF do Titular (readOnly) */}
      <div className={isMobileVersion ? "form-group-mobile" : "form-group"}>
        <label>CPF do Titular</label>
        <div className={isMobileVersion ? "input-wrapper-mobile" : "input-wrapper"}>
          <FaUser className="input-icon" style={{ color: "#1E90FF" }} />
          <input
            type="text"
            placeholder="000.000.000-00"
            value={cpf ?? ""}
            readOnly
          />
        </div>
      </div>

      {/* 2. Login de acesso (Email/Login) */}
      <div className={isMobileVersion ? "form-group-mobile" : "form-group"}>
        <label>Login de acesso</label>
        <div className={isMobileVersion ? "input-wrapper-mobile" : "input-wrapper"}>
          <MdEmail className="input-icon" style={{ color: "#1E90FF" }} />
          <input
            type="text"
            placeholder="login"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </div>

      {/* 3. Senha de acesso */}
      <div className={isMobileVersion ? "form-group-mobile" : "form-group"}>
        <label>Senha de acesso</label>
        <div className={isMobileVersion ? "input-wrapper-mobile" : "input-wrapper"}>
          <FaLock className="input-icon" style={{ color: "#1E90FF" }} />
          <input
            type={passwordVisible ? "text" : "password"}
            placeholder="senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            className="password-toggle"
            onClick={togglePasswordVisibility}
            style={{ marginTop: "4px" }}
          >
            {passwordVisible ? <LuEye /> : <LuEyeClosed />}
          </button>
        </div>
      </div>

      {/* 4. Telefone para autenticação */}
      <div className={isMobileVersion ? "form-group-mobile" : "form-group"}>
        <label>Telefone para autenticação</label>
        <div className={isMobileVersion ? "input-wrapper-mobile" : "input-wrapper"}>
          <FaWhatsapp className="input-icon" color="#25D366" />
          <input
            type="text"
            placeholder="(11) 91234-5678"
            maxLength={15} // (xx) xxxxx-xxxx
            value={phone}
            onChange={(e) => handlePhoneChange(e.target.value)}
          />
        </div>
      </div>
    </form>
  );

  // =================================================================
  // Renderização Desktop
  // =================================================================

  if (!isMobile) {
    return (
      <div className="page step3">
        <section className="content">
          <div className="two-col">
            <div className="card">
              <div className="card-header">
                <h2 className="text-step">
                  <span className="one">03.</span> Insira os dados do programa de fidelidade
                </h2>
                {chosenImage && (
                  <div className="program-logo">
                    <img src={chosenImage} alt={selectedProgram || "Programa"} />
                  </div>
                )}
              </div>
              
              {/* Formulário Desktop */}
              <RenderFormContent /> 

            </div>

            {/* CARD INFORMATIVO  */}
            <aside className="card-row">
              <h4>Dados da Conta</h4>
              <p>
                Por favor, insira os dados da conta que deseja cadastrar e
                verifique se estão corretos.
              </p>
            </aside>
          </div>

          {/* AÇÕES (Botões) */}
          <div className="form-actions" style={{ margin: "0px 70px 0 0" }}>
            <button type="button" onClick={() => navigate("/step-2")} className="btn">
              ← Voltar
            </button>

            <p className="terms">
              Ao prosseguir você concorda com os{" "}
              <a href="#">termos de uso</a>
            </p>
            
            {/* O botão de Concluir deve ser do tipo submit e acionar o form */}
            <button
              type="submit"
              className="btn-primary"
              style={{ marginRight: "220px" }}
              onClick={(e) => handleSubmit(e as unknown as FormEvent<HTMLFormElement>)} // Aciona o submit
            >
              Concluir →
            </button>
          </div>
        </section>
      </div>
    );
  }

  // =================================================================
  // Renderização Mobile 
  // =================================================================

  return (
        <div className="page step3-mobile">
        <section className="content-mobile">
          <div className="two-col-mobile">
            <div className="card-mobile3">
              <div className="header-mobile3">
                <h2 className="text-step-mobile3">
                  <span className="one-mobile">03.</span> Insira os dados do programa de fidelidade
                </h2>
                {chosenImage && (
                  <div className="program-logo">
                    <img src={chosenImage} alt={selectedProgram || "Programa"} />
                  </div>
                )}
              </div>
              
              {/* Formulário Desktop */}
             <div className="form-mobile">< RenderFormContent /> </div>

            </div>

            {/* CARD INFORMATIVO LATERAL */}
            <aside className="card-row-mobile">
               <RiSubtractFill className="menos"/>
              <h4 className="h4-form-mobile">Dados da Conta</h4>
             
              <p className="p-form-mobile">
                Por favor, insira os dados da conta que deseja cadastrar e
                verifique se estão corretos.
              </p>
            </aside>
          </div>
        </section>
      </div>



  );
}