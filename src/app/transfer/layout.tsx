import { Inter } from "next/font/google";
import ProviderWeb3Modal from "./../components/ProviderWeb3Modal";

const inter = Inter({ subsets: ["latin"] });

export default function TransferLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProviderWeb3Modal>
      <div className={inter.className}>{children}</div>
    </ProviderWeb3Modal>
  );
}
