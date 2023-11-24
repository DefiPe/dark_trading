import styles from "@/styles/dex.module.css";
import Graph from "@/components/graph";
import TradeBox from "@/components/tradeBox";
import MainLayout from "../MainLayout/mainLayout";
import TokenStatusBar from "@/components/tokenStatusBar";
//import TopNavbar from "../TopLayout/topNavbar";
import React from "react";

const DexLayout = ({ tokenData }) => {
  return (
    <>
      <MainLayout >
        <div className={styles.dexLayout}>
          <TokenStatusBar>
            <div className={styles.dexContent}>
              {/* <TokenStatusBar/> */}
              <Graph />
              <div className={styles.tradeBoxContainer}>
                <TradeBox initialData={tokenData} />
              </div>
            </div>
          </TokenStatusBar>

        </div>

      </MainLayout >


    </>
  );
}

export default DexLayout;