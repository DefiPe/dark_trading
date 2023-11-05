
import styles from "@/styles/tokenStatusBar.module.css";
import Image from "next/image";
const TokenStatusBar = () => {
    return (
        <div className={styles.tokenStatusContainer}>
            <div className={styles.tokenStatusMain}>
                <Image src="https://upload.wikimedia.org/wikipedia/commons/0/05/Ethereum_logo_2014.svg" alt="" height={100} width={100} />
                <div>
                    <h1>Ethereum</h1>
                    <p>BTC/USDC</p>
                </div>
            </div>

            {/* 
            <div className={styles.tokenStatusMain}>
                <Image src="https://upload.wikimedia.org/wikipedia/commons/0/05/Ethereum_logo_2014.svg" alt="" height={100} width={100}/>
                <div>
                    <h1>Ethereum</h1>
                    <p>BTC/USDC</p>
                </div>
            </div>
            <div className={styles.tokenStatusMain}>
                <Image src="https://upload.wikimedia.org/wikipedia/commons/0/05/Ethereum_logo_2014.svg" alt="" height={100} width={100}/>
                <div>
                    <h1>Ethereum</h1>
                    <p>BTC/USDC</p>
                </div>
            </div>
            <div className={styles.tokenStatusMain}>
                <Image src="https://upload.wikimedia.org/wikipedia/commons/0/05/Ethereum_logo_2014.svg" alt="" height={100} width={100}/>
                <div>
                    <h1>Ethereum</h1>
                    <p>BTC/USDC</p>
                </div>
            </div>
            <div className={styles.tokenStatusMain}>
                <Image src="https://upload.wikimedia.org/wikipedia/commons/0/05/Ethereum_logo_2014.svg" alt="" height={100} width={100}/>
                <div>
                    <h1>Ethereum</h1>
                    <p>BTC/USDC</p>
                </div>
            </div> */}

            <div className={styles.tokenStatusDiv}>
                <div>
                    <p>Last Price</p>
                    <h2>33,697 USDC</h2>
                </div>
            </div>
            <div className={styles.tokenStatusDiv}>
                <div>
                    <p>Last Price</p>
                    <h2>33,697 USDC</h2>
                </div>
            </div>
            <div className={styles.tokenStatusDiv}>
                <div>
                    <p>Last Price</p>
                    <h2>33,697 USDC</h2>
                </div>
            </div>
            <div className={`${styles.tokenStatusDiv} ${styles.tokenStatusBorder}`}>
                <div>
                    <p>Last Price</p>
                    <h2>33,697 USDC</h2>
                </div>
            </div>
        </div>

    );
};

export default TokenStatusBar;