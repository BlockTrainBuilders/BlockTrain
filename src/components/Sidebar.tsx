import { configureGraz } from "graz";
import { Connection } from ".";
import { OKP4TestnetChain } from "../constants";
import { useNavigate } from "react-router-dom";

configureGraz({
  defaultChain: OKP4TestnetChain,
});


export function Sidebar() {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/settings');
  };

    return (
    <div className="sidebar">
        <h1>BlockTrain</h1>

        <Connection chainInfo={OKP4TestnetChain} />
        <button onClick={handleButtonClick}>Settings</button>
      </div>
    );
}