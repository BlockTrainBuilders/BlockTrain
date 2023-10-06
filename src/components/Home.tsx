import { configureGraz } from "graz";
import "../App.css";
import {
  OKP4TestnetChain,
} from "../constants";
import { QueryLawStone } from "../components/QueryLawStone";
import { law_stone_contract_addr as contract_addr } from "../config/contracts.json"
import { Sidebar } from "./Sidebar";
configureGraz({
  defaultChain: OKP4TestnetChain,
});


export function Home() {
  return (
    <><Sidebar />
    
    <div className="mainApp">
        <div>
          <QueryLawStone contractAddress={ contract_addr} />
        </div>
      
    </div>
    </>
  );
}
