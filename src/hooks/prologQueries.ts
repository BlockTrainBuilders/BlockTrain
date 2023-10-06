import { Ask, AskClass } from "@okp4/law-stone-schema";

export type PrologQuery = Record<string, unknown>;

export function composeIsOwnerQuery(user: string, dataset: string): PrologQuery {
  const prolog_query = `is_owner(${user}, ${dataset}).`;
  return composePrologAsk(prolog_query);
}

export function composeCanAccessModelQuery(user: string, model: string): PrologQuery {
  const prolog_query = `can_access_model(${user}, ${model}).`;
  return composePrologAsk(prolog_query);
}

export function composeRevenueSplitQuery(
  dataset: string,
  model: string,
  share: string
): PrologQuery {
  const prolog_query = `revenue_split(${dataset}, ${model}, ${share}).`;
  return composePrologAsk(prolog_query);
}

export function composeWasTrainedOnQuery(model: string, dataset: string): PrologQuery {
  const prolog_query = `was_trained_on(${model}, ${dataset}).`;
  return composePrologAsk(prolog_query);
}

export function composePrologAsk(prolog_query: string):PrologQuery{
  const ask: AskClass = { query: prolog_query };
  const query: Ask = { ask };
  return query;
}


// // Usage Examples:
// const isOwnerQuery = composeIsOwnerQuery("Alice", "Dataset1");
// const canAccessModelQuery = composeCanAccessModelQuery("Bob", "Model1");
// const revenueSplitQuery = composeRevenueSplitQuery(
//   "Dataset1",
//   "Model1",
//   "Share1"
// );
// const wasTrainedOnQuery = composeWasTrainedOnQuery("Model1", "Dataset1");

// console.log(isOwnerQuery); // Output: is_owner(Alice, Dataset1).
// console.log(canAccessModelQuery); // Output: can_access_model(Bob, Model1).
// console.log(revenueSplitQuery); // Output: revenue_split(Dataset1, Model1, Share1).
// console.log(wasTrainedOnQuery); // Output: was_trained_on(Model1, Dataset1).
