import {
    useAccount,
    useDisconnect,
    useSuggestChainAndConnect,
    WalletType,
} from "graz";
import { ChainInfo, Key } from "graz/dist/keplr";

export function Connection({ chainInfo }: { chainInfo: ChainInfo }) {
    const { suggestAndConnect } = useSuggestChainAndConnect();
    const { disconnect } = useDisconnect();
    const {
        data: account,
        isConnected,
    }: { data: Key | null; isConnected: boolean } = useAccount();

    const gas = {
        price: "0.012",
        denom: "uknow",
    };

    const formattedAddress = `${account?.bech32Address.toString().substring(0,6)}...${account?.bech32Address.toString().substring(account?.bech32Address.toString().length - 6, account?.bech32Address.toString().length)}` ;

    const linkedAddress = {
        border: "1px solid grey",
        padding: "10px",
        margin: "10px",
        borderRadius: "5px",
    }

    return (
        <>
            {isConnected ? (
                <>
                    <div style={linkedAddress}>Linked wallet address: {formattedAddress}</div>
                    <button onClick={() => disconnect(true)}>Disconnect</button>
                </>
            ) : (
                <>
                    <button
                        onClick={() =>
                            suggestAndConnect({
                                chainInfo,
                                walletType: WalletType.KEPLR,
                                gas,
                            })
                        }
                    >
                        Connect with Keplr
                    </button>
                </>
            )}
        </>
    );
}