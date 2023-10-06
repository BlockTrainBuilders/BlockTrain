import { configureGraz } from "graz";
import { Connection } from ".";
import { OKP4TestnetChain } from "../constants";
import { useNavigate } from "react-router-dom";

configureGraz({
  defaultChain: OKP4TestnetChain,
});


export function Sidebar() {
  const navigate = useNavigate();

  const goToSettings = () => {
    navigate('/settings');
  };

  const goToHome = () => {
    navigate('/');
  };

  const goToModels = () => {
    navigate('/models');
  };

  const goToConfiguration = () => {
    navigate('/configuration');
  };

    return (
    <div className="sidebar">
        <h1 onClick={goToHome}>BlockTrain</h1>
        
        <Connection chainInfo={OKP4TestnetChain} />
        <button className="navButton" onClick={goToModels}>Models</button>
        <button className="navButton" onClick={goToSettings}>Access Settings</button>
        <button className="navButton" onClick={goToConfiguration}>Customize Configuration</button>
      </div>
    );
}