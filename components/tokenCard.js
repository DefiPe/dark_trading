import { useEffect, useState } from "react";
import styles from '@/styles/tokenCard.module.css'
import Graph from "@/components/graph";

const TokenCard = () =>{
    return(
        <>
        <div className={styles.dashboard}>
            <h1 className={styles.header}>Dashboard</h1>
            <div className={styles.button01}>
                <button className={styles.cubeButton}><img src="Frame.svg"></img></button>
                <button className={styles.cubeButton}><img src="plus.svg"></img></button>
                <button className={styles.cubeButton}><img src="expand.svg"></img></button>
            
            </div>
        </div>
        <div className={styles.wrapper}>
            <div className={styles.wrapperChild1}>
        <div className={styles.cardContainer}>
            <div className={styles.card}>
                <div className={styles.cardTitle}>
                    <img src="bit.svg">
                    </img>
                    <span>2%</span>
                </div>
                <div className="cardDetails">
                    <h2>Bitcoin</h2>
                    <span>$234789</span>
                </div>
            </div>
            <div className={styles.card}>
            <div className={styles.cardTitle}>
                    <img src="tether.svg">
                    </img>
                    <span>2%</span>
                </div>
                <div className="cardDetails">
                    <h2>Tether</h2>
                    <span>$234789</span>
                </div>
            </div>
            <div className={styles.card}>
            <div className={styles.cardTitle}>
                    <img src="bnb.svg">
                    </img>
                    <span>2%</span>
                </div>
                <div className="cardDetails">
                    <h2>BNB</h2>
                    <span>$234789</span>
                </div>
            </div>
            <div className={styles.card}>
            <div className={styles.cardTitle}>
                    <img src="eth.svg">
                    </img>
                    <span>2%</span>
                </div>
                <div className="cardDetails">
                    <h2>Etherium</h2>
                    <span>$234789</span>
                </div>
            </div>

        </div>
        <div className={styles.graphContainer}><Graph /></div>
        </div>
        <div className={styles.wrapperChild2}>
        <div className={styles.walletContainer}>
            <div className={styles.walletHeader}>Wallet
            <img src="3dot.svg"></img>
            </div>
            <div className={styles.walletAddress}>
                <img src="defi.svg"></img>
                <p>0xA36f...26a4</p>
            </div>
            <div className={styles.walletPrice}>
                total Price
                <h2>$45,231.62</h2>
            </div>
            <div className={styles.walletFunctions}>
                <div><img src="1.svg"></img></div>
                <div ><img src="2.svg"></img></div>
                <div ><img src="3.svg"></img></div>
                <p>Defipe Wallet</p>
            </div>
            
            </div> 
            <div className={styles.transactionContainer}>Transaction History
        <img src="3dot.svg"></img>
            </div>
            <div className={styles.transactionFeatures}>
               <p>Recieve</p>
               <p>send</p>
               <p>sell</p>
               <p>buy</p>
               <p>distribute</p>
            </div>
            <div className={styles.transactionHistoryContainer}>
                <div className={styles.transactionHistory}>
                    <img src="eth.svg"></img>
                    <h4>ETH</h4>
                    <p>2022-07-01 08:25:30</p>
                    <h6>1.46</h6>
                    <p>pending</p>
                </div>

            </div>
        </div>
        
        </div>
        
        </>
    )
}

export default TokenCard;