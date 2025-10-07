import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import type { Step, MenuProps } from "../../types/MenuProps";
import "./style.css";
import { BsArrowReturnLeft } from "react-icons/bs";


export default function Steps({ current }: MenuProps) {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [prevStep, setPrevStep] = useState(current);

  const items: Step[] = [
    { label: "Passo 1", description: "Escolha a companhia", path: "/" },
    { label: "Passo 2", description: "Ofereça suas milhas", path: "/step-2" },
    { label: "Passo 3", description: "Insira os dados", path: "/step-3" },
    { label: "Passo 4", description: "Pedido finalizado", path: "/step-4" },
  ];

  // Detecta mobile
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const direction = current > prevStep ? "left" : "right";
  useEffect(() => setPrevStep(current), [current]);

  const progress = ((current - 1) / (items.length - 1)) * 100;

  return (
    <>
      {!isMobile ? (
        <div className="menu-container">
          <div className="menu-circles">
            {items.map((item, index) => {
              const isActive = current === index + 1;
              const isCompleted = current > index + 1;

              return (
                <div
                  key={index}
                  className={`menu-item ${isActive ? "current-menu" : ""}`}
                >
                  <Link to={item.path}>
                    <div
                      className={`circle ${
                        current >= index + 1 ? "active" : ""
                      }`}
                    >
                      <p />
                    </div>

                    <div
                      className={`menu-label ${
                        current >= index + 1 ? "active" : ""
                      }`}
                    >
                      <p>
                        <span>{item.label}</span>
                      </p>
                      <p>{item.description}</p>
                    </div>
                  </Link>

                  {index < items.length - 1 && (
                    <div className={`line ${isCompleted ? "active" : ""}`} />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        // ======= MENU MOBILE =======
        <div className="mobile-footer">
          {/* Barra de progresso */}
          <div className="progress-container">
            <div className="progress-bar" style={{ width: `${progress}%` }} />
          </div>

          {/* Conteúdo do menu com transição */}
          <div
            key={current}
            className={`mobile-footer-content slide-${direction}`}
          >
            <Link
              to={current > 1 ? items[current - 2].path : items[0].path}
              className={`mobile-prev-button ${
                current === 1 ? "disabled" : ""
              }`}
              aria-disabled={current === 1}
            >
             <div className="btn-back"> <BsArrowReturnLeft /></div>

            </Link>

            <p className="mobile-step-text">
              {current} de {items.length}
            </p>

            <Link
              to={
                current < items.length
                  ? items[current].path
                  : items[items.length - 1].path
              }
              className="mobile-next-button"
            >
              {current === items.length ? "Finalizado" : "Prosseguir →"}
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
