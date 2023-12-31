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
    const [success, setSuccess] = useState<boolean>(false);
    function trainAndDeploy() {
        setSubmitted(true);
        setTimeout(() => {
            setSubmitted(false);
            setSuccess(true);
        }, 10000);
    }
    const { data }= useAccount();
    const addr = data?.bech32Address ?? "";
    const { result: model1Result, error: error1, isLoading: isLoading1 } = usePrologQuery({
      contractAddress: contract_addr,
      query: composeCanAccessModelQuery(addr, "model1"),
    });
    const answer1 = model1Result?.answer as { success: boolean };
    const canAccessModel1 = answer1?.success as boolean;

    const { result: model2Result, error: error2, isLoading: isLoading2 } = usePrologQuery({
      contractAddress: contract_addr,
      query: composeCanAccessModelQuery(addr, "model2"),
    });
    const answer2 = model2Result?.answer as { success: boolean };
    const canAccessModel2 = answer2?.success as boolean;

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
        border: `${selectModel ? '5px solid green' : ''}`,
        borderRadius: '5px',
      };
    const classUsed1 = canAccessModel1 ? "model" : "modelNotAllowed";
    const classUsed2 = canAccessModel2 ? "model" : "modelNotAllowed";
    return (
        <>
        <Sidebar />
        <div className="mainApp">
        {success &&
        <div>
            <h1>Model Submitted ✅</h1>
            <div style={divStyle}><a href="https://deploy.cloudmos.io/" target="_blank">Go to cloudmos</a></div>
        </div>}
        {submitted && !success &&
        <div>
            <h1>Training and deployment in progress...</h1>
            <div style={divStyle}>
            <LoadingSpinner />
            </div>
            <h2 style={divStyle}>Wait for it...</h2>
            <div style={divStyle}>
            <img src="https://media.giphy.com/media/H7TsKHN6xAoAy96fJr/giphy.gif" alt="loading" />
            </div>
        </div>}
        {!submitted &&!success &&<>
        <h1>AI Models Overview</h1>	
        <h2>Create a new model</h2>
        <div style={inputArea}>
            <input type="text" placeholder="Model Name" />
            <button>Create Model</button>
        </div>
        <h2>Available Models</h2>
        <div className="models">
          <div className={classUsed1} style={selected}>
            <div onClick={canAccessModel1 ? () => setSelectModel(!selectModel) : () => {}}>
                <ModelCard title="Model 1" usage="Sentiment Analysis" size="1.2 GB" license="Open Source" downloads="25" allowed={canAccessModel1}/>
                {error1 && <span>Error: {"unknown: Dont know how the prologQueryResult returns errors"}</span>}
                {isLoading1 && <span>Loading...</span>}
            </div>
            
            </div>
            <div className={classUsed2}>
            <div >
                <ModelCard title="Model 2" usage="Price Prediction" size="2.4 GB" license="Propietary" downloads="5" allowed={canAccessModel2}/>
                {error2 && <span>Error: {"unknown: Dont know how the prologQueryResult returns errors"}</span>}
                {isLoading2 && <span>Loading...</span>}
            </div>
            
            </div>
        </div>
        {selectModel && <DataSets setSubmitted={trainAndDeploy} />}
      </>
      
      }</div>
      </>
    );
}