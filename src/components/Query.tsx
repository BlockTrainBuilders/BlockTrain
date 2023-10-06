import { ReactElement, useEffect } from "react";
import { useQuerySmart } from "graz";

type QueryProps = {
  contractAddress: string;
  query: Record<string, unknown>;
  onQueryResult: (data?: Record<string, unknown>) => ReactElement;
  textButton: string;
};

export function Query({ contractAddress, query, onQueryResult }: QueryProps) {
  const { data, isLoading, error } = useQuerySmart<Record<string, unknown>, boolean>(
    contractAddress,
    query
  );

  useEffect(() => {
    console.log(`Result from smart query on ${contractAddress}`, {
      query,
      response: data,
    });
  }, [data, query, contractAddress]);

  return (
    <div>
      {isLoading || !data ? <span>Loading...</span> : onQueryResult(data)}
      {error && <span>Error:</span>}
        onQueryResult(data)
    </div>
  )
}
