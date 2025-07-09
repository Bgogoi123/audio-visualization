import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div>
      <button onClick={() => navigate("/visualizer")}>Get Started</button>
    </div>
  );
};
export default Landing;
