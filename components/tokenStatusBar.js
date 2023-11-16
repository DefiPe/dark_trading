import React from "react";
import { Skeleton } from "@nextui-org/react";
import styles from "@/styles/tokenStatusBar.module.css";
import Image from "next/image";
import useSWR from "swr";
import { useNetworkStore } from "@/state/Store";
//import { openInNewTab } from "@/components/openInNewTab";


const fetcher = (url) => fetch(url).then((res) => res.json());


const TokenStatusBar = () => {

    const networkNumber = useNetworkStore((state) => state.networkId);
    const sellToken = useNetworkStore((state) => state.sellToken);
    const receiveToken = useNetworkStore((state) => state.receiveToken);
    const setbuyTokenFiatPrice = useNetworkStore((state) => state.setBuyTokenFiatPrice);
    const setSellTokenFiatPrice = useNetworkStore((state) => state.setSellTokenFiatPrice);


    function getNetwork() {
        if (networkNumber == 137) return "polygon-pos";
        return "ethereum";
    }

    const { data: sellTokenData } = useSWR(
        (receiveToken) ?
            `https://api.coingecko.com/api/v3/coins/${getNetwork()}/contract/${sellToken?.address}?localization=false&community_data=false&developer_data=false&tickers=false` : null,
        fetcher
    );

    sellTokenData && setSellTokenFiatPrice((sellTokenData?.market_data?.current_price?.["usd"]));


    const { data: tokenData } = useSWR(
        (receiveToken) ?
            `https://api.coingecko.com/api/v3/coins/${getNetwork()}/contract/${receiveToken?.address}?localization=false&community_data=false&developer_data=false&tickers=false` : null,
        fetcher
    );

    setbuyTokenFiatPrice((tokenData?.market_data?.current_price?.["usd"]));



    return (
        <div className={styles.tokenStatusContainer}>
            <div className={styles.tokenStatusMain}>
                {(tokenData?.image?.large) ? <img src={tokenData?.image?.large} alt="" width={100} height={100} /> : <Skeleton className="flex rounded-full w-12 h-12" isLoaded={false} />}


                <div>
                    {(tokenData?.name) ? <h1>{tokenData?.name}</h1> : <Skeleton className="h-3 w-4/5 rounded-lg" />}

                    {(tokenData?.symbol) ? <p>{tokenData?.symbol?.toUpperCase()}/USD</p> : <Skeleton className="h-3 w-4/5 rounded-lg" />}
                </div>
            </div>
            <div className={styles.tokenStatusDiv}>
                <div>
                    <p>Last Price</p>
                    {(tokenData?.market_data?.current_price?.["usd"]) ? <h2>{(tokenData?.market_data?.current_price?.["usd"])} USD</h2> : <Skeleton className="h-3 w-4/5 rounded-lg" />}

                </div>
            </div>
            <div className={`${styles.tokenStatusDiv} ${styles.tokenDivOne}`}>
                <div>
                    <p>24h Change</p>
                    {
                        (tokenData?.market_data?.price_change_percentage_24h) ?
                            (tokenData?.market_data?.price_change_percentage_24h >= 0) ? <span style={{ color: "#00b96d", fontWeight:"700" }}>{(tokenData?.market_data?.price_change_percentage_24h)}%</span> : <span style={{ color: "#ff666e" }}>{(tokenData?.market_data?.price_change_percentage_24h)}%</span>
                            :
                            <Skeleton className="h-3 w-4/5 rounded-lg" />
                    }
                </div>
            </div>
            <div className={`${styles.tokenStatusDiv} ${styles.tokenDivTwo}`}>
                <div>
                    <p>24h High</p>
                    {(tokenData?.market_data?.high_24h?.usd) ? <h2> {(tokenData?.market_data?.high_24h?.usd)} USD</h2> : <Skeleton className="h-3 w-4/5 rounded-lg" />}
                </div>
            </div>
            <div className={`${styles.tokenStatusDiv} ${styles.tokenDivThree}`}>
                <div>
                    <p>24h Low</p>
                    {(tokenData?.market_data?.low_24h?.usd) ? <h2> {(tokenData?.market_data?.low_24h?.usd)} USD</h2> : <Skeleton className="h-3 w-4/5 rounded-lg" />}
                </div>
            </div>
        </div>

    );
};

export default TokenStatusBar;