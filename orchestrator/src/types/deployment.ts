export type RestApiDeploymentInfoResponseType = {
  deployment: {
    deployment_id: {
      owner: string;
      dseq: string;
    };
    state: string | "closed";
    version: string;
    created_at: string;
  };
  groups: {
    group_id: {
      owner: string;
      dseq: string;
      gseq: number;
    };
    state: string;
    group_spec: {
      name: string;
      requirements: {
        signed_by: {
          all_of: string[];
          any_of: string[];
        };
        attributes: Array<{
          key: string;
          value: string;
        }>;
      };
      resources: Array<{
        resource: {
          cpu: {
            units: {
              val: string;
            };
            attributes: any[];
          };
          gpu: {
            units: {
              val: string;
            };
            attributes: any[];
          };
          memory: {
            quantity: {
              val: string;
            };
            attributes: any[];
          };
          storage: Array<{
            name: string;
            quantity: {
              val: string;
            };
            attributes: any[];
          }>;
          endpoints: Array<{
            kind: string;
            sequence_number: number;
          }>;
        };
        count: number;
        price: {
          denom: string;
          amount: string;
        };
      }>;
    };
    created_at: string;
  }[];
  escrow_account: EscrowAccount;
};

interface EscrowAccount {
  id: {
    scope: string;
    xid: string;
  };
  owner: string;
  state: string;
  balance: {
    denom: string;
    amount: string;
  };
  transferred: {
    denom: string;
    amount: string;
  };
  settled_at: string;
  depositor: string;
  funds: {
    denom: string;
    amount: string;
  };
}
