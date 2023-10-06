import { useAccount, useBalance } from "graz";
import { Coin } from "graz/dist/cosmjs";

export function Balance() {
  const { isConnected }: { isConnected: boolean } = useAccount();

  const {
    data: balance,
    isLoading,
  }: { data: Coin | undefined; isLoading: boolean } = useBalance("uknow");

  return (
    <div>
      {isConnected ? (
        isLoading ? (
          <div>Fetching balances...</div>
        ) : balance?.amount ? (
          <div>Balance: {Number(balance?.amount) / 1000000} $KNOW</div>
        ) : (
          <div>This wallet does not hold $KNOW tokens</div>
        )
      ) : (
        "No balance to display, please connect"
      )}
    </div>
  );
}
