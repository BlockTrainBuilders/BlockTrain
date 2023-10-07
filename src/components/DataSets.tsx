import { useState } from "react";
import { DataCard } from "./DataCard";
import { AkashParameters } from "./AkashParamaters";

export function DataSets({
    setSubmitted,
}: {
    setSubmitted: (submitted: boolean) => void;
}) {
    const [selectData, setSelectData] = useState<string | null>(null);
    
    const selected = {
        padding: '10px',
        border: `${selectData ? '5px solid green' : '1px solid black'}`,
        borderRadius: '5px',
      };
      const inputArea = {
        padding: '10px',
      };

    return (
        <>
        <h2>Choose from related datasets...</h2>
        <div className="models">
            <div className="model" style={selectData === "Dataset 1" ? selected : undefined} onClick={() => setSelectData("Dataset 1")}>
                <DataCard title="Dataset 1" description="My awesome data set FOR FREE" cost={"$ 0.0"}/>
            </div>
            <div className="model" style={selectData === "Dataset 2" ? selected : undefined} onClick={() => setSelectData("Dataset 2")}>
                <DataCard title="Dataset 2" description="My awesome data set BUT FOR $100!!!" cost={"$ 100.0"}/>
            </div>
        </div>
        {
            selectData && <>
            <AkashParameters />
            <button onClick={() => setSubmitted(true)}>Train and deploy</button>
        </>
        }
        {!selectData && <><h2>...or upload new dataset</h2>
        <div style={inputArea}>
            <input type="text" placeholder="Model Name" />
            <button>Upload Dataset</button>
        </div></>}
      </>
    );
}