import { useState } from "react";
import { ModelCard } from "./ModelCard";
import { Sidebar } from "./Sidebar";
import { DataSets } from "./DataSets";
import { LoadingSpinner } from "./LoadingSpinner";
import { useAccount } from "graz";
import { composeCanAccessModelQuery } from "../hooks/prologQueries";
import { law_stone_contract_addr as contract_addr } from "../config/contracts.json"
import { usePrologQuery } from "../hooks/usePrologQuery";

export function Models() {
    const [selectModel, setSelectModel] = useState<boolean>(false);
    const [submitted, setSubmitted] = useState<boolean>(false);
    const { data }= useAccount();
    const addr = data?.bech32Address ?? "";
    const canAccessModelQuery = composeCanAccessModelQuery(addr, "model1");
    const { result, error, isLoading } = usePrologQuery({
      contractAddress: contract_addr,
      query: canAccessModelQuery,
    });
    console.log("result usePrologQuery", result.answer.success);

    const inputArea = {
        padding: '10px',
      };
    const divStyle = {
        display: 'flex',
        justifyContent: 'center',
        padding: '10px',
        margin: 'auto',
      };
    const selected = {
        padding: '10px',
        border: `${selectModel ? '5px solid green' : '1px solid black'}`,
        borderRadius: '5px',
      };
    return (
        <>
        <Sidebar />
        <div className="mainApp">
        {submitted ?
        <div>
            <h1>Training and deployment in progress...</h1>
            <div style={divStyle}>
            <LoadingSpinner />
            </div>
        </div>
        :<>
        
        <h1>AI Models Overview</h1>	
        <h2>Create a new model</h2>
        <div style={inputArea}>
            <input type="text" placeholder="Model Name" />
            <button>Create Model</button>
        </div>
        <h2>Available Models</h2>
        <div className="models">
            <div className="model" style={selected} onClick={() => setSelectModel(!selectModel)}>
                <ModelCard title="Model 1" usage="Sentiment Analysis" size="1.2 GB" license="Open Source" downloads="25" allowed={true}/>
            </div>
            <div className="modelNotAllowed">
                <ModelCard title="Model 2" usage="Price Prediction" size="2.4 GB" license="Propietary" downloads="5" allowed={false}/>
            </div>
        </div>
        {selectModel && <DataSets setSubmitted={setSubmitted} />}
      </>
      
      }</div>
      </>
    );
}