
import React, { useState, useEffect, useContext } from "react";
import { fetchRanking } from "../../services/api";
import { formatCurrency, parseCurrencyToNumber } from "../../utils/currency";
import useDebounce from "../../hooks/useDebounce";
import type { RankingItem } from "../../types";
import RankingList from "../RankingList";
import PillGroup from "../PillGroup";
import { PiAirplaneInFlight } from "react-icons/pi";
import { FaAnglesDown } from "react-icons/fa6";
import "./style.css";
import { MilesContext } from "../../contexts/MilesContext";

export default function Step2() {
  const { navigate } = useContext(MilesContext);

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [defineMedia, setDefineMedia] = useState(false);

  const [mileValue, setMileValue] = useState<number | "">("");
  const [displayMileValue, setDisplayMileValue] = useState("");
  const [milhasOfertadas, setMilhasOfertadas] = useState("");

  const [ranking, setRanking] = useState<RankingItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState("Imediato");

  const debouncedMileValue = useDebounce(mileValue, 500);

  // =========================
  // Ranking fetch
  // =========================
  useEffect(() => {
    if (!debouncedMileValue) {
      setRanking([]);
      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await fetchRanking(Number(debouncedMileValue));
        setRanking(data);
      } catch (err) {
        console.error("Erro ao buscar ranking", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [debouncedMileValue]);

  // =========================
  // Input handlers
  // =========================
  const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const numeric = parseCurrencyToNumber(e.target.value);

    if (!Number.isNaN(numeric)) {
      setMileValue(numeric);
      setDisplayMileValue(e.target.value);
    } else {
      setMileValue("");
      setDisplayMileValue(e.target.value);
    }
  };

  const handleFocusValue = () => {
    setDisplayMileValue(mileValue ? mileValue.toString() : "");
  };

  const handleBlurValue = () => {
    if (mileValue !== "") {
      setDisplayMileValue(formatCurrency(Number(mileValue)));
    }
  };

  // =========================
  // Responsividade
  // =========================
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // =========================
  // Desktop version
  // =========================
  if (!isMobile) {
    return (
      <div className="page step2">
        <section className="content">
          <div className="two-col">
            {/* Coluna Esquerda */}
            <div className="card">
              <div className="card-header">
                <h2 className="text-step">
                  <span className="one">02.</span> Oferte suas milhas
                </h2>
                <p className="card-step2">Escolha entre R$ 14,00 e R$ 16,56</p>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  navigate("/step-3");
                }}
                className="form-vertical"
              >
                <label className="step2-label">
                  <h2 
                    style={{
                      width:"400px",
                      height:"40px",
                      margin: "8px",
                      padding:"8px 12px 8px 8px",
                      fontSize: "16px",
                      fontWeight: "500",
                      lineHeight: "130%",
                    }}
                  >
                    Quando deseja receber o pagamento?
                  </h2>
                  <div className="pill-group-desk" >
                  <PillGroup  
                    options={[
                      "Imediato",
                      "Em 2 dias",
                      "Em 7 dias",
                      "Depois do voo",
                    ]}
                    selected={selectedOption}
                    onSelect={setSelectedOption}
                  /></div>
                </label>

                <div className="label-input">
                  <label>
                    <p>Milhas ofertadas</p>
                    <div className="input-icon-wrapper">
                      <input
                        style={{ border: "solid 1px #ccc" }}
                        required
                        value={milhasOfertadas}
                        onChange={(e) =>
                          setMilhasOfertadas(e.target.value.replace(/\D/g, ""))
                        }
                        placeholder="10.000"
                      />
                      <PiAirplaneInFlight className="airplane-icon" />
                    </div>
                  </label>

                  <label>
                    <p>Valor a cada 1.000 milhas</p>
                    <div className="input-icon-wrapper">
                      
                      <input
                        type="tel"
                        className="input-with-icon"
                        required
                        value={displayMileValue}
                        onChange={handleChangeValue}
                        onBlur={handleBlurValue}
                        onFocus={handleFocusValue}
                        placeholder="     0,00"
                      />
                      <FaAnglesDown className="dropdown-icon" style={{color:'#DC2B2B'}} />
                      <span className="real-icon">R$</span>
                    </div>
                  </label>
                </div>
              </form>

              <label>
                <div className="checkbox-container">
                  <input
                    type="checkbox"
                    checked={defineMedia}
                    onChange={() => setDefineMedia(!defineMedia)}
                  />
                  <span className="slider"></span>
                  <h3
                    style={{
                      color: "#ccc",
                      fontWeight: "500",
                      margin: "14px 0 12px 2px",
                      width: "299px",
                      height: "21px",
                      fontSize: "16px",
                    }}
                  >
                    Definir média de milhas por passageiro
                  </h3>
                </div>
              </label>

              <div className="form-actions">
                <button
                  type="button"
                  onClick={() => navigate("/")}
                  className="btn"
                >
                  ← Voltar
                </button>
                <button
                  type="submit"
                  className="btn-primary"
                  onClick={() => navigate("/step-3")}
                >
                  Prosseguir →
                </button>
              </div>
            </div>

            {/* Coluna Direita */}
            <div className="row">
              <div className="card-row">
                <h4>Média de milhas</h4>
                <p>
                  Ao vender mais de 20.000 milhas, ative as Opções Avançadas
                  para definir a média de milhas por emissão.
                </p>
              </div>
                      <h3>Ranking das ofertas</h3>
            <aside className="card side">
          
          <ul className="ranking" style={{borderTop:'solid 1px #ededed'}}>
            {loading ? (
              <li className="muted">Carregando...</li>
            ) : (
              <RankingList ranking={ranking} />
            )}
          </ul>
        </aside>

              <h2
                style={{
                  textAlign: "left",
                  fontWeight: "500",
                  margin: "12px 12px 12px",
                  borderTop: "solid 1px #ccc",
                }}
              >
                Receba até:
              </h2>
              <div className="receba-ate">
                <span>
                  {formatCurrency(
                    Number(milhasOfertadas || 0) * Number(mileValue || 0)
                  )}
                </span>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }





  // =========================
  // Mobile version
  // =========================
  return (

      <div className="page-mobile">
    <section className="content-mobile">
      <div className="card-mobile2">
        {/* Header */}
        <div className="header-mobile">
          <h2 className="text-step-mobile" style={{ fontWeight: "500" }}>
            <span className="one-mobile">02.</span> Oferte suas milhas
          </h2>
        </div>

        {/* Quero receber (PillGroup) */}
        <div className="milhas-mobile">
          <label className="step2-label-mobile">
            <h3 className="h3-mobil">Quero receber</h3>
            <div className="pil-group-mobile">
              {["Imediato", "Em 2 dias", "Em 7 dias", "Depois do voo"].map(
                (option) => (
                  <button
                    key={option}
                    type="button"
                    className={selectedOption === option ? "active" : ""}
                    onClick={() => setSelectedOption(option)}
                  >
                    {option}
                  </button>
                )
              )}
            </div>
          </label>
        </div>

        {/* Milhas ofertadas */}
        <div className="ofertas-mobile2">
          <label>Milhas ofertadas</label>
          <div className="program-select-mobile2">
            <input
              type="text"
              value={milhasOfertadas}
              onChange={(e) =>
                setMilhasOfertadas(e.target.value.replace(/\D/g, ""))
              }
              placeholder="10.000"
            />
            <PiAirplaneInFlight className="icon" style={{color:'#1E90FF'}}  />
          </div>
        </div>

        {/* Valor por milha */}
        <div className="ofertas-mobile2">
          <label>Valor a cada 1.000 milhas</label>
          <div className="program-select-mobile2">
            <span className="span-mobil">R$</span>
            
            <input className=" input-valor"
              type="text"
              style={{ border: "solid 1px #DC2B2B" }}
              value={      displayMileValue}
              onChange={handleChangeValue}
              onBlur={handleBlurValue}
              onFocus={handleFocusValue}
              placeholder="           0,00"
            />
            <FaAnglesDown className="icon"  />
          </div>
          <p className="error-text">Escolha entre R$ 14,00 e R$ 16,56</p>
        </div>

      {/* Ranking Mobile (Pills) */}
           <div className="ranking-mobile-pills">
       {loading ? (
        <p className="muted" style={{ margin: '10px 0', textAlign: 'center' }}>Carregando...</p>
              ) : (
             ranking.map((item, index) => (
               <div 
                 className={`ranking-pill ${item.isUser ? 'ranking-pill-you' : ''}`}
                    key={index} 
>
                 {item.isUser && "Você "}
                  {item.position}º R$ {formatCurrency(item.value)}
               </div>
                     ))
                   )}
           </div>

        {/* Checkbox média */}
              <div className="checkbox-container-mobile">
        <label className="switch">
          <input
            type="checkbox"
            id="defineMedia"
            checked={defineMedia}
            onChange={() => setDefineMedia(!defineMedia)}
          />
          <span className="slider"></span>
        </label>
        <span className="label-text">Definir média de milhas por passageiro</span>
      </div>

        {/* Card média */}
        {defineMedia && (
          <div className="media-card">
            <p className="media-p">
              Melhor média para a sua oferta:  <span className="green"> 27.800  </span>
              
            </p>
            
            
          </div>
        )}
      </div>

      {/* Receba até */}
      <div className="receba-ate">
        <span>Receba até:</span>
        <strong>
          {formatCurrency(
            Number(milhasOfertadas || 0) * Number(mileValue || 0)
          )}
        </strong>
      </div>
    </section>
  </div>
    
);}
