// PrologQueryComponent.tsx
import { ReactElement } from "react";
import { usePrologQuery } from "../hooks/usePrologQuery";
import { PrologQuery } from "../hooks/prologQueries";

interface PrologQueryComponentProps {
  contractAddress: string;
  query: PrologQuery;
  onQueryResult: (data?: PrologQueryResult) => ReactElement;
}

export function PrologQueryComponent({
  contractAddress,
  query,
  onQueryResult,
}: PrologQueryComponentProps) {
  const { result, error, isLoading } = usePrologQuery({
    contractAddress,
    query,
  });

  return (
    <div>
      {isLoading || !result ? <span>Loading...</span> : onQueryResult(result)}
      {error && <span>Error: {"unknown: Dont know how the prologQueryResult returns errors"}</span>}
    </div>
  );
}

type PrologQueryResult = Record<string, unknown>;
