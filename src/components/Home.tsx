import { configureGraz, useAccount } from "graz";
import "../App.css";
import {
  OKP4TestnetChain,
} from "../constants";
import { law_stone_contract_addr as contract_addr } from "../config/contracts.json"
import { Sidebar } from "./Sidebar";
import { composeIsOwnerQuery } from "../hooks/prologQueries";
import { PrologQueryComponent } from "./prologQueryComponent";
configureGraz({
  defaultChain: OKP4TestnetChain,
});


export function Home() {
  const { data }= useAccount();
  const addr = data?.bech32Address ?? "";


  const isOwnerQuery = composeIsOwnerQuery(addr, "dataset1");
  return (
    <><Sidebar />
    
    <div className="mainApp">
  <div>
    <PrologQueryComponent
      contractAddress={contract_addr} // Your contract address
      query={isOwnerQuery}
      onQueryResult={(data) => <div>{JSON.stringify(data)}</div>}
    />
  </div>
      
    </div>
    </>
  );
}