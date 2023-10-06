import { ModelCard } from "./ModelCard";
import { Sidebar } from "./Sidebar";

export function Models() {
    return (
        <>
        <Sidebar />
        <div className="mainApp">
        <h1>Available AI Models</h1>	
        <div className="models">
            <ModelCard title="Model 1" usage="Sentiment Analysis" size="1.2 GB" license="Open Source" downloads="25" allowed={true}/>
            <ModelCard title="Model 2" usage="Price Prediction" size="2.4 GB" license="Propietary" downloads="5" allowed={false}/>
        </div>
        <div>
            <input type="text" placeholder="Model Name" />
            <button>Create New Model</button>
        </div>
      </div>
      </>
    );
}