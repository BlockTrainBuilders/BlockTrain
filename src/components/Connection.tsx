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

    return (
        <>
            {isConnected ? (
                <>
                    <div>Linked wallet address: {account?.bech32Address}</div>
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