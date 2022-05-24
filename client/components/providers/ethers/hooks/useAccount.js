import React from "react";

import useSWR from "swr";

export const handler = (ether, provider) => () => {
  const { data, mutate, ...rest } = useSWR(
    () => (ether ? "ether/accounts" : null),
    async () => {
      const accounts = await ether.listAccounts();
      return accounts[0];
    }
  );

  React.useEffect(() => {
    provider &&
      provider.on("accountsChanged", (accounts) => {
        mutate(accounts[0] ?? null);
      });
  }, [mutate]);

  return {
    account: {
      data,
      mutate,
      ...rest,
    },
  };
};
