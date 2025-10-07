import { Outlet, useLocation } from "react-router-dom";
import Steps from "../components/Steps/Steps";

export default function StepsLayout() {
  const location = useLocation();

  const currentMap: Record<string, number> = {
    "/": 1,
    "/step-2": 2,
    "/step-3": 3,
    "/step-4": 4,
  };

  const current = currentMap[location.pathname] ?? 0;

  return (
    <div className="page">
      {current > 0 && <Steps current={current} />}

      <section className="content">
        <Outlet />
      </section>
    </div>
  );
}
