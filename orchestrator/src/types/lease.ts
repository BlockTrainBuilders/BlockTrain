export type ProviderApiLeaseStatusResponseType = {
  services: {
    [key: string]: {
      name: string;
      available: number;
      total: number;
      uris: string[];
      observed_generation: number;
      replicas: number;
      updated_replicas: number;
      ready_replicas: number;
      available_replicas: number;
    };
  };
  forwarded_ports: null; // TODO
  ips: null; // TODO
};

export type RestApiDeploymentLeasesResponseType = {
  leases: {
    lease: {
      lease_id: {
        owner: string;
        dseq: string;
        gseq: number;
        oseq: number;
        provider: string;
      };
      state: string;
      price: {
        denom: string;
        amount: string;
      };
      created_at: string;
      closed_on: string;
    };
    escrow_payment: {
      account_id: {
        scope: string;
        xid: string;
      };
      payment_id: string;
      owner: string;
      state: string;
      rate: {
        denom: string;
        amount: string;
      };
      balance: {
        denom: string;
        amount: string;
      };
      withdrawn: {
        denom: string;
        amount: string;
      };
    };
  }[];
  pagination: {
    next_key: string | null;
    total: string;
  };
};
