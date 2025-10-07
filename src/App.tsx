import { Routes, Route } from "react-router-dom";
import Step1 from "./components/pages/Step1";
import Step2 from "./components/pages/Step2";
import Step3 from "./components/pages/Step3";
import Step4 from "./components/pages/Step4";
import OffersList from "./components/pages/OffersList";
import StepsLayout from "./layouts/StepsLayout";
import icon from "./assets/images/icon.png";
import "./App.css";
import MilesProvider from "./contexts/MillesProvider";

export default function App() {
  return (
    <MilesProvider>

    <div className="app-root">
      <header className="topbar">
        <div className="logo"><img src={icon} alt="logo Milhas Pix" /></div>
        <div className="balance">R$ 283,12</div>
      </header>

      <main className="container">
        <Routes>
          {/* Agrupa rotas que usam os Steps */}
          <Route element={<StepsLayout />}>
            <Route path="/" element={<Step1 />} />
            <Route path="/step-2" element={<Step2 />} />
            <Route path="/step-3" element={<Step3 />} />
            <Route path="/step-4" element={<Step4 />} />
          </Route>

          {/* Rotas fora do fluxo de steps */}
          <Route path="/offers" element={<OffersList />} />
        </Routes>
      </main>
      <footer className="footer">
        &copy; 2025 Milhas Pix. Todos os direitos reservados.
      </footer>
    </div>
    </MilesProvider>
  );
}
