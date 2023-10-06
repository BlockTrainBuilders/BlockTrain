// usePrologQuery.ts
import { useEffect, useState } from "react";
import { useQuerySmart } from "graz";
import { PrologQuery } from "./prologQueries";

type PrologQueryResult = Record<string, unknown>;

interface UsePrologQueryProps {
  contractAddress: string;
  query: PrologQuery;
}

export function usePrologQuery({
  contractAddress,
  query,
}: UsePrologQueryProps) {
  const [result, setResult] = useState<PrologQueryResult | null>(null);
  const [isError, setIsError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const { data, error: queryError } = useQuerySmart<PrologQueryResult, boolean>(
    contractAddress,
    query
  );

  useEffect(() => {
    if (data) {
      setResult(data);
      setIsLoading(false);
    }

    if (queryError) {
      setIsError(queryError);
      setIsLoading(false);
    }
  }, [data, queryError]);

  return { result, error: isError, isLoading };
}
