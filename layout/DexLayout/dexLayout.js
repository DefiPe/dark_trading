import styles from "@/styles/dex.module.css";
import Graph from "@/components/graph";
import TradeBox from "@/components/tradeBox";
import MainLayout from "../MainLayout/mainLayout";
import TokenStatusBar from "@/components/tokenStatusBar";
import TopNavbar from "../TopLayout/topNavbar";
import React from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";

const DexLayout = ({ tokenData }) => {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  return (
    <>
      <MainLayout >
        {/* <TopNavbar /> */}

        <div style={{ paddingTop: "2.5rem" }}>
          <TokenStatusBar />
          <div className={styles.dexContent}>
            {/* <TokenStatusBar/> */}
            <Graph />
            <div className={styles.tradeBoxContainer}>
              <TradeBox tokendata={tokenData} />
            </div>


          </div>
        </div>
        
      </MainLayout >


    </>
  );
}

export default DexLayout;