import { configureGraz } from "graz";
import "./App.css";
import {
  OKP4TestnetChain,
} from "./constants";
import { Sidebar } from "./components/Sidebar";
import { QueryLawStone } from "./components/QueryLawStone";
import { law_stone_contract_addr as contract_addr } from "./config/contracts.json"
import { Connection } from "./components";

configureGraz({
  defaultChain: OKP4TestnetChain,
});


function App() {
  return (
    <>
    <Sidebar />
    <div className="mainApp">
      <h1>Settings</h1>	
    </div>

      <QueryLawStone contractAddress={ contract_addr} />
      <Connection chainInfo={OKP4TestnetChain} />
    </>
  );
}

export default App;