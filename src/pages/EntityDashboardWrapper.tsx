import { useParams, useNavigate } from "react-router-dom";
import { EntityDashboard } from "./EntityDashboard"; // or "@/pages/EntityDashboard"

const EntityDashboardWrapper = () => {
  const { entity } = useParams();
  const navigate = useNavigate();

  if (!entity) {
    return <div>Missing entity parameter</div>;
  }

  return (
    <EntityDashboard
      entityId={entity}
      onBack={() => navigate("/entities")} // Back button behavior
    />
  );
};

export default EntityDashboardWrapper;
