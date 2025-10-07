// FILE: src/pages/Step4.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Player } from "@lottiefiles/react-lottie-player";
import successAnimation from "../../assets/lottie/Success Send.json";
import CelebrateAnimation from "../../assets/lottie/Celebrate.json";
import "./style.css";

export default function Step4() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    setLoading(true);

    setTimeout(() => {
      navigate("/offers");
    }, 2000);
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
  // Conteúdo Reutilizável (Evita duplicação)
  // =================================================================
   const SuccessContent = ({ isMobileVersion = false, hideButton = false }) => (
    <>
      <Player
        autoplay
        loop
        src={CelebrateAnimation}
        style={{
          height: "101px",
          background: "#ccdcecd2",
          width: "100px",
          border: "none",
          borderRadius: "100%",
          margin: isMobileVersion ? "0 auto 20px" : "0 auto",
        }}
      />

      <div
        className="text-order"
        style={{
          alignItems: "center",
          fontWeight: "500",
          margin: isMobileVersion ? "0 auto 20px" : "50px 0 20px 200px",
          lineHeight: "28px",
          textAlign: isMobileVersion ? 'center' : 'left',
        }}
      >
        <h2
          style={{
            color: "#1E90FF",
            width: isMobileVersion ? "100%" : "490px",
            height: "auto",
            fontSize: isMobileVersion ? "20px" : "28px",
            marginBottom: '8px'}}
        >
          Ordem de venda criada com sucesso!
        </h2>

        <p
          style={{
            color: "#2E3D50",
            width: isMobileVersion ? "100%" : "444px",
            height: "auto",
            fontSize: "14px",
            margin: '10px',
            textAlign:'center'
          }}
        >
          Agora é só aguardar — assim que suas milhas forem vendidas, o valor
          será transferido direto para sua conta via Pix.
        </p>
      </div>

      {/* CONDICIONAL: Oculta o botão se hideButton for TRUE */}
      {!hideButton && (
        <div
          style={{
            marginTop: 20,
            textAlign: "center",
            width: isMobileVersion ? "100%" : "auto"
          }}
        >
          <button
            onClick={handleClick}
            disabled={loading}
            style={{
              background: "#1E90FF",
              borderColor: "#1E90FF",
              padding: "10px 24px",
              fontSize: "16px",
              color: "#fff",
              borderRadius: "44px",
              cursor: loading ? "not-allowed" : "pointer",
              position: "relative",
              border: loading ? "none" : "",
              backgroundColor: loading ? "#fff" : "#1E90FF",
              minWidth: '200px'
            }}
          >
            {loading ? (
              <Player
                autoplay
                loop
                src={successAnimation}
                style={{
                  height: "60px",
                  width: "60px",
                  border: "none",
                  backgroundColor: "transparent",
                  borderRadius: "100%",
                  alignContent:'center'
                }}
              />
            ) : (
              "Ver minhas ofertas → "
            )}
          </button>
        </div>
      )}
    </>
  );


  // =================================================================
  // Renderização Desktop
  // =================================================================
  if (!isMobile) {
    return (
      <div className="page">
        <section className="content">
          <div
            className="card success"
            style={{
              width: "900px",
              height: "443px",
              padding: "16px 16px",
              display: 'flex', 
              flexDirection: 'column', 
              justifyContent: 'center', 
              alignItems: 'center'
            }}
          >
            <SuccessContent />
          </div>
        </section>
      </div>
    );
  }

  // =================================================================
  // Renderização Mobile 
  // =================================================================

  return (
    <div className="page step4-mobile"> 
   
    

    {/* Conteúdo Principal (Centralizado) */}
    <section className="content-mobile" style={{
      padding: '40px 16px',
      flexGrow: 1, // Permite que o conteúdo principal ocupe o espaço extra
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      paddingBottom: '80px', // Espaço para o rodapé fixo não cobrir o conteúdo
    }}>
      <div 
        className="card-mobile4" 
        style={{ 
          width: "100%", 
          height: "auto", 
          padding: "40px",
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center',
          border: 'none', // Remove a borda se estiver como na imagem f033bf.png
          boxShadow: 'none', // Remove a sombra
          margin: '0 auto',
        }}
      >
       <SuccessContent isMobileVersion={true} hideButton={true} />
      </div>
    </section>

    {/* Rodapé Fixo (Fica na parte inferior) */}
    <div className="footer-fixed-actions">
      {/* Botão "Sair" (Estilo secundário) */}
      <button className="btn btn-secondary">
        Sair
      </button>

      {/* Botão "Ver minhas ofertas" (Usa a mesma lógica de loading do SuccessContent) */}
    
      <button
          onClick={handleClick}
          disabled={loading}
          className="btn-primary" 
          style={{
            minWidth: '200px',
            backgroundColor: loading ? "#fff" : "#1E90FF",
            color: loading ? 'transparent' : '#fff',
            border: loading ? '1px solid #1E90FF' : 'none',
          }}
        >
          {loading ? (
            <Player
              autoplay
              loop
              src={successAnimation}
              style={{
                height: "60px",
                width: "60px",
                backgroundColor: "transparent",
              }}
            />
          ) : (
            "Ver minhas ofertas →"
          )}
      </button>
    </div>
  </div>
  );
}