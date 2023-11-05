import { useEffect, useState } from "react";
import styles from '@/styles/topNavbar.module.css';
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import Link from "next/link";
import { getNetwork } from "@wagmi/core";
import { useNetworkStore } from "@/state/Store";



const TopNavbar = () => {
const [isFlag, setIsFlag] = useState(false);

useEffect(()=> {
  setIsFlag(true);
},[]);

  const { openConnectModal } = useConnectModal();
  const { isConnected } = useAccount();
  const { chain } = getNetwork();

  return (
    <>
      <div className={styles.topNavBar}>
        <form className={styles.search}>
          <input
            className={styles.xyz}
            type="text"
            placeholder="search token name or address..."
          />

        </form>


       {
        (isFlag)?  <div className={styles.navOptions}>

        {isConnected ? (
          <ConnectButton accountStatus="address" chainStatus="icon" />
        ) : (
          <>
            {" "}
            {openConnectModal && (
              <button
                onClick={openConnectModal}
                type="button"
                className={styles.button}
              >
                Connect Wallet
              </button>
            )}
          </>
        )}
      </div>:<></>
       }

      </div>

    </>
  );
};

export default TopNavbar;