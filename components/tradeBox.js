import React, { useEffect, useState } from "react";
import styles from '@/styles/tradeBox.module.css';
import Image from "next/image";
//import Modal from 'react-modal';
import { useNetworkStore } from "@/state/Store";
import useSWR from "swr";
import { formatUnits, parseUnits } from "viem";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { useAccount, useWalletClient } from "wagmi";
import { erc20ABI, getNetwork } from "@wagmi/core";
//import { mainnet, polygon } from "viem/chains";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import publicClientViem from "@/utils/client";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Skeleton, Divider, Spacer } from "@nextui-org/react";
import { Setting4 } from "iconsax-react";
import { useRouter } from "next/router";
import LoadMoreBtn from "./LoadMoreBtn";



const fetcher = (url) => fetch(url).then((res) => res.json());

const ZERO_EX_PROXY = "0xdef1c0ded9bec7f1a1670819833240f027b25eff";

const networkList = [
  {
    name: "Ethereum",
    icon: "eth-icon.svg",
    alt: "ethereum-icon",
    netWork: 1
  },
  {
    name: "Polygon",
    icon: "polygon-icon.svg",
    alt: "polygon-icon.svg",
    netWork: 137
  },
]

function TradeBox({ initialData }) {
  const [networkCss, setNetworkCss] = useState(1); //Buy token amount
  const [tokenSelectMsg, setTokenSelectMsg] = useState("Trending"); //Buy token amount
  const [sellTokenAmount, setSellTokenAmount] = useState(null); //Sell token amount
  const [tokenData, setTokenData] = useState(null);
  const [toggleToken, setToggleToken] = useState(); // Distinguish between buy and sell Model
  const [selectBuyToken, setSelectBuyToken] = useState(initialData); // Buy Token Id
  const [selectSellToken, setSelectSellToken] = useState(null); // Sell Token Id


  const setReceiveToken = useNetworkStore((state) => state.setReceiveToken);
  const setSellToken = useNetworkStore((state) => state.setsellToken);
  const networkNumber = useNetworkStore((state) => state.networkId); // Hook of State Store of Network Id
  const setNetworkNumber = useNetworkStore((state) => state.setNetworkId); // Hook of State Store of Set Network Id
  const buytokenFiatPrice = useNetworkStore((state) => state.buyTokenFiatPrice);
  const selltokenFiatPrice = useNetworkStore((state) => state.sellTokenFiatPrice);



  const [swapBtnMessage, setSwapBtnMessage] = useState("Swap Now"); // Message on button
  const [disableSwapBtn, setDisableSwapBtn] = useState(false); // Flag for Token Swap Button
  const [approveTougle, setApproveTougle] = useState(false); // Flag for ERC20 Approved or Not
  const [paginationId, setPaginationId] = useState(2); // Pagination id of Token Data Load More
  const [selectNetwork, setSelectNetwork] = useState(initialData?.chainId);
  const { chain } = getNetwork(); // Hook for Chain Id

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const router = useRouter();
  const { slug } = router.query;


  const { data: priceJson, isLoading } = useSWR(
    sellTokenAmount > 0 && selectSellToken != null
      ? `/api/price?buyToken=${selectBuyToken?.address}&sellToken=${selectSellToken?.address
      }&sellAmount=${parseUnits(
        sellTokenAmount.toString(),
        selectSellToken?.decimals
      )}&networkID=${chain?.id}`
      : null,
    fetcher
  );

  //console.log("Price ", priceJson);
  const { data: walletClient } = useWalletClient(); // Hook of Wallet public Data
  const { isConnected } = useAccount(); // Hook of Address is Connected of not
  const { openConnectModal } = useConnectModal(); // Hook of Wallet Connect by RainbowKit
  const [publicClient, privateClient] = publicClientViem();



  useEffect(() => {
    setReceiveToken(initialData);
    setSelectBuyToken(initialData);
    if (selectNetwork == "137") {
      setNetworkCss(2);
    } else {
      setNetworkCss(1);
    }
  }, [initialData])

  useEffect(() => {
    (tokenData == null) && getFirstToken();
  }, [])

  // useEffect(() => {
  //   if (chain?.id != networkNumber) {
  //     setNetworkNumber(chain?.id);
  //     setTokenData([]);
  //     if (chain?.id == "137") {
  //       setNetworkCss(2);
  //     } else {
  //       setNetworkCss(1);
  //     }

  //     getFirstToken();
  //   }
  // }, [chain?.id != networkNumber]);


  useEffect(() => {
    if (selectSellToken !== null && sellTokenAmount != null) {
      // getPrice();
      if (isConnected == true) {
        enoughTokenFlag();
      }
    }
    //getCurrentFiatPrice?.usd && getFiatInputPrice();
  }, [sellTokenAmount || selectSellToken?.address]);


  useEffect(() => {
    getFirstToken();
  }, [selectNetwork]);

  function tokenToggle() {
    let togData = selectBuyToken;
    setSelectBuyToken(selectSellToken);
    setSelectSellToken(togData);
  }


  async function getFirstToken() {
    try {
      let data = await fetch(
        `https://api.defipe.io/pagination/${selectNetwork}?page=1&limit=40`
      );
      let jsonVal = await data?.json();
      setTokenData(jsonVal?.data);
      setSellTokenAmount(null);
    //console.log("get first ",jsonVal?.data);

    } catch (e) {
      console.log("error ", e);
    }
  }


  async function getSearchToken(_val) {
    if (_val) {
      let priceJson = await fetch(
        `https://api.defipe.io/searchbychainId/${selectNetwork}/${_val}`
      );

      let priceData = await priceJson?.json();
      //console.log("Tks ", priceData);
      if (priceData != []) {
        setTokenData(priceData);
        setTokenSelectMsg("Search results")
      }
    }
    else {
      getFirstToken();
      setTokenSelectMsg("Trending")
    }
  }


  async function getMoreToken() {
    try {
      let data = await fetch(
        `https://api.defipe.io/pagination/${selectNetwork}?page=${paginationId}&limit=10`
      );
      let jsonVal = await data.json();
      //console.log("Data ", paginationId);
      setTokenData((tokenData) => [...tokenData, ...jsonVal?.data]);
      setPaginationId(paginationId + 1);
    } catch (e) {
      console.log("error ", e);
    }
  }


  function modelTokenList() {
    try {
      return (
        <div className={styles?.tokenModal}>
          <div className={styles?.tokenModalInput}>
            <input
              placeholder="Search Token or paste address"
              onChange={(event) =>
                // (event?.target?.value?.length > 2) &&
                getSearchToken(event?.target?.value)

              }
            />


          </div>
          <hr className={styles.tradeBoxHr} />


          <div className={styles.tradeFlex}>
            <div className={styles.chainList}>
              <h3>Chains</h3>
              <div className={styles.chainSelect}>
                {networkList.map(({ name, icon, alt, netWork }, index) => (

                  <div className={styles.chainSelectDiv} key={index} onClick={() => { setNetworkCss(index + 1); setSelectNetwork(netWork) }}
                    style={(networkCss == index + 1) ? { backgroundColor: "#242731", color: "#6C5DD3", border: "2px solid #6C5DD3" } : {}}
                  >

                    <Image src={`/${icon}`} alt={alt} height={100} width={100} />
                    <p>{name}</p>
                  </div>

                ))}
              </div>
            </div>




            {tokenData?.length !== 0 ? (
              <>
                <div className={styles?.tokenList}>
                  <h3 style={{ marginBottom: "1rem" }}>{tokenSelectMsg}</h3>

                  {tokenData?.map((val, i) => {
                    return (
                      <div
                        key={i}
                        onClick={() => selectedToken(i)}
                        className={styles?.selectedTokenModal}

                      >
                        <div className={styles?.tokenFlex}>

                          {(val?.logoURI) ? (<Image
                            loader={() => val?.logoURI}
                            src={val?.logoURI}
                            width={100}
                            height={100}
                            alt="erc20_icon"
                            className={styles?.tokenImage}
                          />
                          ) :
                            <Skeleton className="flex rounded-full w-8 h-8" isLoaded={false} style={{
                              height: "2rem",
                              width: "2rem",
                              marginRight: "0.5rem",
                              //backgroundColor:"#242731"
                            }} />
                          }

                          <div>
                            <p className={styles?.tokenListHeader}>{val?.name}</p>
                            <p className={styles?.tokenListSymbol}>{val?.symbol}</p>
                          </div>
                        </div>
                        <p className={styles?.tokenListChain}>{getNetworkID(val?.chainId)}</p>
                      </div>
                    );
                  })}


                  {/* <button
                    //className={style.loadMoreButton}
                    style={{ margin: "1rem", backgroundColor: "red", color: "white" }}
                    onClick={() => getMoreToken()}
                  >

                    Load More
                  </button> */}


                  <Button size="sm" endContent={<LoadMoreBtn />} className={styles.loadMoreBtn} onClick={() => getMoreToken()}>
                    Load More
                  </Button>

                </div>

              </>

            ) : (
              <p>No Data</p>
            )}


          </div>


        </div>
      );
    } catch (e) {
      //console.log(e);
    }
  }

  function getNetworkID(_val) {
    //console.log("net ", networkNumber)
    if (_val == 137) return "Polygon";
    return "Ethereum";
  }

  function getNetworkFromName(_val) {
    //console.log("net ", networkNumber)
    if (_val == 137) return "polygon";
    return "ethereum";
  }


  function selectedToken(index) {
    if (slug[0] != getNetworkFromName(selectNetwork)) {

      //redirect(`/${getNetworkFromName(selectNetwork)}/eth`);
      router.push(`/dex/${getNetworkFromName(selectNetwork)}/${tokenData?.[index]?.address}`)

    } else {
      if (toggleToken === false) {
        setSelectSellToken(tokenData?.[index]);
        setSellToken(tokenData?.[index]);
      } else if (toggleToken === true) {
        router.push(`/dex/${slug[0]}/${tokenData?.[index]?.address}`)
        setSelectBuyToken(tokenData?.[index]);
        setReceiveToken(tokenData?.[index]);
      }
    }

    setSellTokenAmount(0);
    onOpenChange(false);
  }


  const numberInputOnWheelPreventChange = (e) => {
    // Prevent the input value change
    e.target.blur();

    // Prevent the page/container scrolling
    e.stopPropagation();

    // Refocus immediately, on the next tick (after the current function is done)
    setTimeout(() => {
      e.target.focus();
    }, 0);
  };


  async function getSwap() {
    try {
      if (sellTokenAmount > 0 && !selectBuyToken && !selectSellToken) return;
      let priceJsons = await fetch(
        `/api/swap?buyToken=${selectBuyToken?.address}&sellToken=${selectSellToken?.address
        }&sellAmount=${parseUnits(
          sellTokenAmount,
          selectSellToken?.decimals
        )}&takerAddress=${walletClient?.account?.address}&networkID=${chain?.id}`
      );

      let priceData = await priceJsons.json();
      //console.log("Price data ", priceData);
      if (priceData?.code == 109 || priceData?.code == 111) {
        setSwapBtnMessage(`Not Enough ${selectSellToken?.symbol}`);
        setDisableSwapBtn(false);
      } else if (priceData?.code == 105) {
        setApproveTougle(true);
        setSwapBtnMessage(`Approve ${selectSellToken?.symbol}`);
        setDisableSwapBtn(true);

        //console.log("Now perform allowence");
        return null;
      } else if (priceData?.code >= 0) {
        setSwapBtnMessage(`There is some issue`);
        setDisableSwapBtn(false);
      } else {
        if (
          priceData?.sellTokenAddress !==
          "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee"
        ) {
          let allowenceFlag;
          priceData?.to &&
            (allowenceFlag = await testAllowence(
              priceData?.allowanceTarget,
              priceData?.sellAmount
            ));



          if (!allowenceFlag) {
            /////***************ERC20 Allow */

            setApproveTougle(true);
            setSwapBtnMessage(`Approve ${selectSellToken?.symbol}`);
            setDisableSwapBtn(true);

            //console.log("Now perform allowence");
            return null;
          }
          return priceData;
        } else {
          setSwapBtnMessage(`Swap Now`);
          setDisableSwapBtn(true);

          let formatPrice = formatUnits(
            priceData?.buyAmount,
            selectBuyToken?.decimals
          );

          //setBuyTokenAmount(formatPrice);
          return priceData;
        }
      }
    } catch (e) {
      //console.log(e);
    }
  }

  async function enoughTokenFlag() {
    if (
      selectSellToken?.address == "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee"
    ) {
      setDisableSwapBtn(true);
      return;
    }

    if (sellTokenAmount == null) return;

    let data;
    try {

      walletClient?.account?.address && (data = await publicClient?.readContract({
        address: selectSellToken?.address,
        abi: erc20ABI,
        functionName: "balanceOf",
        args: [walletClient?.account?.address],
      }))
      let walletTokenBalance = formatUnits(data, selectSellToken?.decimals);
      if (walletTokenBalance - sellTokenAmount >= 0) {
        setDisableSwapBtn(true);
      } else {
        setSwapBtnMessage(`Not Enough ${selectSellToken?.symbol}`);
        setDisableSwapBtn(false);
      }
    } catch (e) {

    }


    //return formatUnits(data, tokenData?.[selectSellToken].decimals);
  }

  async function testAllowence(proxyAddress, allowenceAmount) {
    if (proxyAddress == "0x0000000000000000000000000000000000000000") return true;
    let data;
    try {

      walletClient?.account?.address && (data = await publicClient?.readContract({
        address: selectSellToken?.address,
        abi: erc20ABI,
        functionName: "allowance",
        args: [walletClient?.account?.address, proxyAddress],
      }))
    } catch (e) {

    }
    return data >= allowenceAmount;
  }

  async function approveFunction(approveAddress, approveAmount) {
    try {
      const { request } = await publicClient?.simulateContract({
        account: walletClient?.account.address,
        address: selectSellToken?.address,
        abi: erc20ABI,
        functionName: "approve",
        args: [approveAddress, approveAmount],
      });
      //console.log(tokenData?.[selectSellToken].address, "add ", request);

      let hashKey;
      request && (hashKey = await privateClient?.writeContract(request));
      const id = toast.loading("Please wait...");

      let receipt;
      hashKey &&
        (receipt = await publicClient?.waitForTransactionReceipt({
          hash: hashKey,
        }));

      toast.update(id, {
        render: "Transaction is successful",
        type: "success",
        isLoading: false,
        theme: "dark",
      });
      if (receipt?.status == "success") {
        setSwapBtnMessage(`Swap Now`);
        setDisableSwapBtn(true);
        setApproveTougle(false);
      }

      //console.log("Approve Recept ", receipt);
    } catch (e) {
      //console.log(e);
    }
  }

  async function tradeNow() {
    try {
      let priceData = await getSwap();

      let ad = await privateClient?.getAddresses();


      let txParams = {
        from: ad[0],
        to: priceData?.to,
        data: priceData?.data,
        value: priceData?.value,
        gasPrice: priceData?.gasPrice,
      };


      let hashKey;
      priceData && (hashKey = await privateClient?.sendTransaction(
        {
          from: priceData?.from,
          to: priceData?.to,
          data: priceData?.data,
          value: priceData?.value,
          gasPrice: priceData?.gasPrice,
        }
      ))

      const id = toast.loading("Please wait...");

      //console.log("hashkey ", hashKey);
      let transaction;
      hashKey &&
        (transaction = await publicClient?.waitForTransactionReceipt({
          hash: hashKey,
        }));

      //do something else
      toast.update(id, {
        render: "Transaction is successful",
        type: "success",
        isLoading: false,
        theme: "dark",
      });
      setSellTokenAmount(0);

      //console.log("Success ", transaction);
    } catch (e) {
      //console.log(e);
    }
  }


  return (
    <>
      <div className={styles.tradeBox}>
        <div className={styles.tradeBoxH1Flex}>
          <h3>Swap</h3>
          <div>
            {/* <Image src="reload-icon.svg" alt="" height={100} width={100} className={styles.tradeSetting} /> */}
            {/* <Image src="trading-setting.svg" alt="" height={100} width={100} className={styles.tradeSetting} /> */}
            <Setting4 size="32" color="#ffffff" className={styles.tradeSetting} />
          </div>
        </div>

        {/* <div className="space"></div> */}
        <hr className={styles.tradeBoxHr} />
        <div className={styles.space}></div>
        <div className={styles.containtBox}>
          <div className={styles.tradeBoxMaxCrypto}>
            <p>You pay</p>
            {/* <p className={styles.userBalance}>Max 49,678.56 USDT</p> */}
          </div>
          <div className={styles.space}></div>
          <div className={styles.flexInput}>
            {
              <div
                className={styles.flexInputButton}
                onClick={() => {
                  onOpenChange(true);
                  setToggleToken(false);
                }}

              >
                {/* <img src={`${selectSellToken?.logoURI}`} />
                <p>{`${selectSellToken?.symbol}`}</p> */}


                {(selectSellToken != null) ? <>
                  {
                    (selectSellToken?.logoURI) ? <img src={selectSellToken?.logoURI} /> : <Skeleton className="flex rounded-full w-8 h-8" isLoaded={false} style={{
                      height: "2rem",
                      width: "2rem",
                      marginRight: "0.5rem"
                    }} />
                  }


                  <p>

                    {selectSellToken?.symbol}
                  </p>
                </> : <p>Token</p>
                }
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="5"
                  stroke="currentColor"
                  className={styles.buttonIconBox}
                >

                  <path d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
              </div>


            }
            <input
              name="send_amount"
              type="number"
              step="0.0"
              placeholder="0"
              onChange={(event) => setSellTokenAmount(event.target.value)}
              value={sellTokenAmount || ""}
              onWheel={numberInputOnWheelPreventChange}
            />
          </div>
          {
            (priceJson?.buyAmount) ? (selectBuyToken?.decimals && buytokenFiatPrice) ? <p className={styles.fiatPrice}> ~ {((formatUnits(priceJson?.buyAmount, selectBuyToken?.decimals)) * buytokenFiatPrice)?.toFixed(2)} USD</p> : <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "1rem", marginRight: "0.6rem" }}><Skeleton className="h-3 w-1/5 rounded-lg" /></div> : <Spacer y={11} />
          }
        </div>



        <div className={styles.flexTradeBoxHr}>
          <hr className={styles.tradeBoxHr} />

          <Image src="/down-arrow.svg" alt="" height={100} width={100} className={styles.tradeTougle} onClick={() => { }} />
          <hr className={styles.tradeBoxHr} />
        </div>


        <div className={styles.containtBox}>

          <div className={styles.tradeBoxMaxCrypto}>
            <p>You receive</p>
          </div>
          <div className={styles.space}></div>
          <div className={styles.flexInput}>
            <div
              className={styles.flexInputButton}
              onClick={() => {
                onOpenChange(true);
                setToggleToken(true);
              }}
            >

              {
                (selectBuyToken?.logoURI) ? <img src={selectBuyToken?.logoURI} /> : <Skeleton className="flex rounded-full w-8 h-8" isLoaded={false} style={{
                  height: "2rem",
                  width: "2rem",
                  marginRight: "0.5rem"
                }} />
              }
              <p>
                {selectBuyToken?.symbol}
              </p>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="5"
                stroke="currentColor"
                className={styles.buttonIconBox}
              >
                <path d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
            </div>

            <input
              name="token_amount"
              type="text"
              placeholder="0"
              value={
                priceJson?.buyAmount
                  ? formatUnits(
                    priceJson?.buyAmount?.toString(),
                    selectBuyToken?.decimals
                  )
                  : "" || ""
              }

              onWheel={numberInputOnWheelPreventChange}
            />
          </div>
          {
            (priceJson?.buyAmount) ? (selectBuyToken?.decimals && buytokenFiatPrice) ? <p className={styles.fiatPrice}> ~ {((formatUnits(priceJson?.buyAmount, selectBuyToken?.decimals)) * buytokenFiatPrice)?.toFixed(2)} USD</p> : <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "1rem", marginRight: "0.6rem" }}><Skeleton className="h-3 w-1/5 rounded-lg" /></div> : <Spacer y={8} />
          }

        </div>

        {isConnected == false ? (
          <>
            {openConnectModal && (
              <button
                className={styles?.button34}
                onClick={openConnectModal}
                role="button"
              >
                Connect Wallet
              </button>
            )}
          </>
        ) : (


          <>
            <button
              className={
                !disableSwapBtn
                  ? `${styles.button34} ${styles?.disableSwapBtn}`
                  : styles?.button34
              }
              role="button"
              disabled={(selectNetwork != chain?.id) ? false : !disableSwapBtn}
              onClick={(selectNetwork != chain?.id) ? async () => { await privateClient?.switchChain({ id: selectNetwork }) } : () =>
                approveTougle
                  ? approveFunction(
                    ZERO_EX_PROXY,
                    parseUnits(
                      sellTokenAmount.toString(),
                      selectSellToken?.decimals
                    )
                  )
                  : tradeNow()
              }
            >
              {(selectNetwork != chain?.id) ? `Switch to ${getNetworkID(selectNetwork)} Network` : swapBtnMessage}
            </button>
          </>



        )}




        {priceJson?.price == null ? (
          <div className={styles.gasDiv}></div>
        ) : (
          <div className={styles.gasBox}>
            <>
              <div className={styles.flexGasPrice}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  style={{
                    height: "0.8rem",
                    width: "0.8rem",
                    marginRight: "0.2rem",
                  }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                  />
                </svg>
                {
                  (isLoading == true) ?

                    <Skeleton isLoaded={false} className="w-4/5 rounded-lg">
                      <div className="h-3 w-full rounded-lg bg-secondary-300"></div>
                    </Skeleton> :
                    <p>{`1 ${selectSellToken?.symbol} = ${priceJson?.price} ${selectBuyToken?.symbol}`} </p>
                }

              </div>
              <div className={styles.flexGasPrice}>


                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  style={{
                    height: "0.8rem",
                    width: "0.8rem",
                    marginRight: "0.2rem",
                  }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z"
                  />
                </svg>

                <p> {parseFloat((formatUnits(priceJson?.gasPrice, 9)))?.toFixed(2)} Gwei</p>
              </div>
            </>
          </div>
        )}
      </div>


      <>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} style={{ backgroundColor: "black", color: "white" }} size="2xl" >
          <ModalContent>
            {(onClose) => (
              <>

                <ModalBody>
                  {modelTokenList()}
                </ModalBody>

              </>

            )}
          </ModalContent>
        </Modal>
      </>



      <ToastContainer theme="dark" />

    </>
  )
}
export default TradeBox;