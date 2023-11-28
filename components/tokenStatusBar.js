import React from "react";
import { Skeleton } from "@nextui-org/react";
import styles from "@/styles/tokenStatusBar.module.css";
import Image from "next/image";
import useSWR from "swr";
import { useNetworkStore } from "@/state/Store";
import ReadMore from "@/components/ReadMore";
import { Global, Xrp } from "iconsax-react";
import { openInNewTab } from "@/utils/openInNewTab";
import { useRouter } from "next/router";



const fetcher = (url) => fetch(url).then((res) => res.json());


const TokenStatusBar = ({ children }) => {
    const router = useRouter();
    const networkNumber = useNetworkStore((state) => state.networkId);
    const sellToken = useNetworkStore((state) => state.sellToken);
    const receiveToken = useNetworkStore((state) => state.receiveToken);
    const setbuyTokenFiatPrice = useNetworkStore((state) => state.setBuyTokenFiatPrice);
    const setSellTokenFiatPrice = useNetworkStore((state) => state.setSellTokenFiatPrice);
    const {slug} = router.query;


    function getNetwork() {
        if (slug[0] == "polygon") return "polygon-pos";
        return "ethereum";
    }

    const { data: sellTokenData } = useSWR(
        (receiveToken) ?
            `https://api.coingecko.com/api/v3/coins/${getNetwork()}/contract/${sellToken?.address}?localization=false&community_data=false&developer_data=false&tickers=false` : null,
        fetcher
    );

    sellTokenData && setSellTokenFiatPrice((sellTokenData?.market_data?.current_price?.["usd"]));

    function getMarketUrl() {
        let urlRes;
        if (receiveToken?.address == "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee") {
            if (getNetwork() == "polygon-pos") {
                urlRes = "https://api.coingecko.com/api/v3/coins/polygon-pos/contract/0x0000000000000000000000000000000000001010?localization=false&community_data=false&developer_data=false&tickers=false";
            } else {
                urlRes = "https://api.coingecko.com/api/v3/coins/ethereum?localization=false&tickers=false&market_data=true&community_data=true&developer_data=false&sparkline=false";

            }

        } else {
            urlRes = `https://api.coingecko.com/api/v3/coins/${getNetwork()}/contract/${receiveToken?.address}?localization=false&community_data=false&developer_data=false&tickers=false`;
        }
        return urlRes;

    }


    const { data: tokenData } = useSWR(
        (receiveToken) ? getMarketUrl() : null,
        fetcher
    );

    setbuyTokenFiatPrice((tokenData?.market_data?.current_price?.["usd"]));



    return (
        <>
            <div className={styles.tokenStatusContainer}>
                <div className={styles.tokenStatusMain}>
                    {(tokenData?.image?.large) ? <Image loader={() => tokenData?.image?.large} src={tokenData?.image?.large} alt="" width={100} height={100} /> : <Skeleton className="flex rounded-full w-9 h-9" isLoaded={false} />}

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
                                (tokenData?.market_data?.price_change_percentage_24h >= 0) ? <span style={{ color: "#00b96d", fontWeight: "700" }}>↑ {(tokenData?.market_data?.price_change_percentage_24h)}%</span> : <span style={{ color: "#ff666e", fontWeight: "700" }}>↓{(tokenData?.market_data?.price_change_percentage_24h)}%</span>
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

            {children}

            <div className={styles.aboutToken}>
                <h2>About {tokenData?.name}</h2>

                {tokenData ? <ReadMore data={tokenData?.description?.en} /> : <></>}
                <hr className={styles.hr} />
                <h3>Link</h3>
                <div className={styles.socialBox}>
                    {tokenData?.links?.homepage[0] ? (
                        <button
                            onClick={() => openInNewTab(tokenData?.links?.homepage[0])}
                            className={styles.flexIcon}
                        >
                            <Global size="32" color="#FFFFFF" />
                            <span>{tokenData?.links?.homepage[0].split("/")[2]}</span>
                        </button>
                    ) : (
                        <></>
                    )}

                    {tokenData?.links?.twitter_screen_name ? (
                        <button
                            onClick={() =>
                                openInNewTab(
                                    `https://twitter.com/${tokenData?.links?.twitter_screen_name}`
                                )
                            }
                            className={styles.flexIcon}
                        >
                            <Xrp size="32" color="#FFFFFF" />
                            <span>Twitter</span>
                        </button>
                    ) : (
                        <></>
                    )}

                    {/* {tokenData?.links?.subreddit_url ? (
                        <button
                            onClick={() => openInNewTab(tokenData?.links?.subreddit_url)}
                            className={styles.flexIcon}
                        >
                            <Image
                                src="/reddit.svg"
                                alt="Reddit icon"
                                height={100}
                                width={100}
                            />
                            <p>Reddit</p>
                        </button>
                    ) : (
                        <></>
                    )} */}
                </div>
            </div>



        </>


    );
};

export default TokenStatusBar;