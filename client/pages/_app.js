import "../styles/globals.css";

import { EthersProvider } from "../components/providers";

function MyApp({ Component, pageProps }) {
  return (
    <EthersProvider>
      <Component {...pageProps} />
    </EthersProvider>
  );
}

export default MyApp;
