import { useState } from "react";
import { ModelCard } from "./ModelCard";
import { Sidebar } from "./Sidebar";
import { DataSets } from "./DataSets";

export function Models() {
    const [selectModel, setSelectModel] = useState(false);
    const inputArea = {
        padding: '10px',
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
        <h1>AI Models Overview</h1>	
        <h2>Create a new model</h2>
        <div style={inputArea}>
            <input type="text" placeholder="Model Name" />
            <button>Create New Model</button>
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
        {selectModel && <DataSets />}
      </div>
      </>
    );
}