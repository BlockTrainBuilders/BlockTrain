import { useState } from "react";
import { DataCard } from "./DataCard";
import { AkashParameters } from "./AkashParamaters";
import { composeIsOwnerQuery } from "../hooks/prologQueries";
import { law_stone_contract_addr as contract_addr } from "../config/contracts.json"
import { usePrologQuery } from "../hooks/usePrologQuery";

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

    const isOwnerDataSet1Query = composeIsOwnerQuery("X", "dataset1");
    const isOwnerDataSet2Query = composeIsOwnerQuery("X", "dataset2");

    const ownerDataSet1 = usePrologQuery({
        contractAddress: contract_addr,
        query: isOwnerDataSet1Query,
    });
    const ownerDataSet2 = usePrologQuery({
        contractAddress: contract_addr,
        query: isOwnerDataSet2Query,
    });

    function formatAddress (address: string) {
        return `${address.substring(0,6)}...${address.substring(address.length - 6, address.length)}`;
    }
    const formattedAddress1 = ownerDataSet1?.result?.answer?.results[0]?.substitutions[0].term.name ? formatAddress(ownerDataSet1.result?.answer?.results[0]?.substitutions[0].term.name) : "Loading...";
    const formattedAddress2 = ownerDataSet2?.result?.answer?.results[0]?.substitutions[0].term.name ? formatAddress(ownerDataSet2.result?.answer?.results[0]?.substitutions[0].term.name) : "Loading...";

    console.log("ownerDataSet1", ownerDataSet1);
    return (
        <>
        <h2>Choose from related datasets...</h2>
        <div className="models">
            <div className="model" style={selectData === "Dataset 1" ? selected : undefined} onClick={() => setSelectData("Dataset 1")}>
                <DataCard title="Dataset 1" description="My awesome data set FOR FREE" cost={"$ 0.0"} author={ownerDataSet1 ? formattedAddress1 : "Loading..."}/>
            </div>
            <div className="model" style={selectData === "Dataset 2" ? selected : undefined} onClick={() => setSelectData("Dataset 2")}>
                <DataCard title="Dataset 2" description="My awesome data set BUT FOR $100!!!" cost={"$ 100.0"} author={ownerDataSet2 ? formattedAddress2 : "Loading..."}/>
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