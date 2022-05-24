import { useAccount } from "../components/hooks/ether";
import { useEthers } from "../components/providers";

export default function Home() {
  const { connect, requireInstall, provider } = useEthers();

  return (
    <div>
      <p
        className="font-bold bg-blue-800"
        onClick={() => {
          connect();
        }}
      >
        Home
      </p>
    </div>
  );
}
