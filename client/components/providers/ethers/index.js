import React from "react";

// Metamask Detect Provider
import detectEthereumProvider from "@metamask/detect-provider";

// ethers.js
import { ethers } from "ethers";

// Hooks
import { setupHooks } from "./hooks/setupHooks";

// Context
const EthersContext = React.createContext(null);

const createState = ({ ether, provider, isLoading }) => {
  return {
    ether,
    provider,
    isLoading,
    hooks: setupHooks(ether, provider),
  };
};

export default function EthersProvider({ children }) {
  const [etherApi, setEtherApi] = React.useState(
    createState({ ether: null, provider: null, isLoading: null })
  );

  React.useEffect(() => {
    const loadProvider = async () => {
      const provider = await detectEthereumProvider();
      if (provider) {
        const ether = new ethers.providers.Web3Provider(provider);
        setEtherApi(
          createState({
            ether,
            provider,
            isLoading: false,
          })
        );
      } else {
        setEtherApi((api) => ({
          ...api,
          isLoading: false,
        }));
        console.error("Please install metamask");
      }
    };

    loadProvider();
  }, []);

  const _etherApi = React.useMemo(() => {
    const { ether, provider, isLoading } = etherApi;

    return {
      ...etherApi,
      isEtherLoaded: ether !== null,
      requireInstall: !isLoading && !ether,
      connect: provider
        ? async () => {
            try {
              await provider.request({ method: "eth_requestAccounts" });
            } catch (e) {
              console.error(e);
            }
          }
        : () => {
            console.error("Error on connecting to metamask");
          },
    };
  }, [etherApi]);

  return (
    <EthersContext.Provider value={_etherApi}>
      {children}
    </EthersContext.Provider>
  );
}

export function useEthers() {
  return React.useContext(EthersContext);
}

export function useHooks(cb) {
  const { hooks } = useEthers();

  return cb(hooks);
}
