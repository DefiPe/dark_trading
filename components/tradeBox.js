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
import { Badge, Avatar } from "@nextui-org/react";
import NotificationIcon from "@/components/NotificationIcon";
import { Setting4 } from "iconsax-react";

// const customStyles = {
//   content: {
//     top: '50%',
//     left: '50%',
//     right: 'auto',
//     bottom: 'auto',
//     marginRight: '-50%',
//     transform: 'translate(-50%, -50%)',
//     backgroundColor: "#1F2128"
//   },
// };

const fetcher = (url) => fetch(url).then((res) => res.json());

//Modal.setAppElement('#__next');

const ZERO_EX_PROXY = "0xdef1c0ded9bec7f1a1670819833240f027b25eff";

const networkList = [
  {
    name: "Ethereum",
    icon: "eth-icon.svg",
    alt: "ethereum-icon"
  },
  {
    name: "Polygon",
    icon: "polygon-icon.svg",
    alt: "polygon-icon.svg",
  },
]

function TradeBox({ tokendata }) {
  //console.log("alham dulillah ",tokendata);

  //const [modalIsOpen, setIsOpen] = useState(false); // Model is Open or Not
  const [networkCss, setNetworkCss] = useState(1); //Buy token amount
  const [tokenSelectMsg, setTokenSelectMsg] = useState("Trending"); //Buy token amount
  const [sellTokenAmount, setSellTokenAmount] = useState(null); //Sell token amount
  const [tokenData, setTokenData] = useState(null);

  const [estimatedGas, setEstimatedGas] = useState(null);
  const [toggleToken, setToggleToken] = useState(); // Distinguish between buy and sell Model

  const [selectBuyToken, setSelectBuyToken] = useState(tokenData?.[0]); // Buy Token Id
  const [selectSellToken, setSelectSellToken] = useState(null); // Sell Token Id

  //const receiveToken = useNetworkStore((state) => state.receiveToken);
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

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const { data: priceJson, isLoading } = useSWR(
    sellTokenAmount > 0 && selectSellToken != null
      ? `/api/price?buyToken=${selectBuyToken?.address}&sellToken=${selectSellToken?.address
      }&sellAmount=${parseUnits(
        sellTokenAmount.toString(),
        selectSellToken?.decimals
      )}&networkID=${networkNumber}`
      : null,
    fetcher
  );
  //console.log("Price ", priceJson);
  const { data: walletClient } = useWalletClient(); // Hook of Wallet public Data
  const { isConnected } = useAccount(); // Hook of Address is Connected of not
  const { openConnectModal } = useConnectModal(); // Hook of Wallet Connect by RainbowKit
  const { chain } = getNetwork(); // Hook for Chain Id
  const [publicClient, privateClient] = publicClientViem();



  useEffect(() => {
    setReceiveToken(tokenData?.[0]);
    // console.log("hollaa due to token Dats")
    // getFirstToken();
  }, [tokenData])

  useEffect(() => {
    //setReceiveToken(tokenData?.[0]);
    // console.log("hollaa due to token Dats")
    (tokenData == null) && getFirstToken();
  }, [])

  useEffect(() => {
    //setReceiveToken(tokenData?.[0]);
    // console.log("hollaa due to token Dats")
    isOpen && getFirstToken();
  }, [isOpen == true])


  

  useEffect(() => {
    //console.log(chain?.id, "hhhhf", networkNumber);

    if (chain?.id != networkNumber) {
      setNetworkNumber(chain?.id);
      setTokenData([]);
      if (chain?.id == "137") {
        setNetworkCss(2);
      } else {
        setNetworkCss(1);
      }
      console.log("hollaa due to Network")
      getFirstToken();
    }
  }, [chain?.id != networkNumber]);


  useEffect(() => {
    if (selectSellToken !== null && sellTokenAmount != null) {
      // getPrice();
      if (isConnected === true) {
        enoughTokenFlag();
      }
    }
    //getCurrentFiatPrice?.usd && getFiatInputPrice();
  }, [sellTokenAmount]);


  async function getFirstToken() {
    try {
      console.log("holla")
      let data = await fetch(
        `https://api.defipe.io/pagination/${chain?.id ? chain?.id : 1
        }?page=1&limit=10`
      );
      let jsonVal = await data?.json();
      // console.log(chain?.id, "Data ", jsonVal?.data);
      setTokenData(jsonVal?.data);
      setSelectBuyToken(jsonVal?.data?.[0]);
      setSelectSellToken(null);
      setSellTokenAmount(null);

    } catch (e) {
      console.log("error ", e);
    }
  }


  async function getSearchToken(_val) {
    console.log("eta ",_val);
    if (_val) {
      let priceJson = await fetch(
        `https://api.defipe.io/searchbychainId/${chain?.id ? chain?.id : 1
        }/${_val}`
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
        `https://api.defipe.io/pagination/${chain?.id ? chain?.id : 1
        }?page=${paginationId}&limit=10`
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
                {networkList.map(({ name, icon, alt }, index) => (

                  <div className={styles.chainSelectDiv} key={index}
                    style={(networkCss == index + 1) ? { backgroundColor: "#242731", color: "#6C5DD3", border: "2px solid #6C5DD3" } : { color: "yellow" }}
                  >

                    <img src={icon} alt={alt} />
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
                          <>
                            {val?.logoURI ? (

                              // <Badge content={<NotificationIcon size={20} />}>
                              //   <Avatar

                              //     radius="full"
                              //     src={val?.logoURI}
                              //   />
                              // </Badge>
                              <img
                                src={val?.logoURI}
                                alt="erc20 icon"

                                className={styles?.tokenImage}
                              />
                            ) : (
                              <Image
                                src="/ERC20Error.png"
                                width={25}
                                height={25}
                                alt="erc20 icon"
                                className={styles?.tokenImage}
                              />
                            )}
                          </>
                          <div>
                            <p className={styles?.tokenListHeader}>{val?.name}</p>
                            <p className={styles?.tokenListSymbol}>{val?.symbol}</p>
                          </div>
                        </div>
                        <p className={styles?.tokenListChain}>{getNetworkID()}</p>
                      </div>
                    );
                  })}


                  <button
                    //className={style.loadMoreButton}
                    style={{ margin: "1rem", backgroundColor: "red", color: "white" }}
                    onClick={() => getMoreToken()}
                  >

                    Load More
                  </button>

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

  function getNetworkID() {
    //console.log("net ", networkNumber)
    if (networkNumber == 137) return "Polygon-pos";
    return "Ethereum";
  }


  function selectedToken(index) {
    if (toggleToken === false) {

      setSelectSellToken(tokenData?.[index]);
      setSellToken(tokenData?.[index]);


    } else if (toggleToken === true) {
      setSelectBuyToken(tokenData?.[index]);

      setReceiveToken(tokenData?.[index]);

    }
    //setBuyTokenAmount(0);
    setSellTokenAmount(0);
    //setIsOpen(false);
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
      // let abc = {
      //   buyToken: selectBuyToken?.address,
      //   sellToken: selectSellToken?.address,
      //   sellAmount: parseUnits(sellTokenAmount, selectSellToken?.decimals),
      //   takerAddress: walletClient?.account?.address,
      // };
      // const query = qs.stringify(abc);
      let priceJsons = await fetch(
        `/api/swap?buyToken=${selectBuyToken?.address}&sellToken=${selectSellToken?.address
        }&sellAmount=${parseUnits(
          sellTokenAmount,
          selectSellToken?.decimals
        )}&takerAddress=${walletClient?.account?.address}&networkID=${networkNumber}`
      );
      // let abc = {
      //   buyToken: selectBuyToken?.address,
      //   sellToken: selectSellToken?.address,
      //   sellAmount: parseUnits(sellTokenAmount, selectSellToken?.decimals),
      //   takerAddress: walletClient?.account?.address,
      // };
      // const query = qs.stringify(abc);
      // let priceJsons = await fetch(`/api/swap?${query}`);
      let priceData = await priceJsons.json();
      //console.log("Swap ", query);
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

          //console.log("what ",!allowenceFlag);

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

          setBuyTokenAmount(formatPrice);
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

    const data = await publicClient?.readContract({
      address: selectSellToken?.address,
      abi: erc20ABI,
      functionName: "balanceOf",
      args: [walletClient?.account.address],
    });
    let walletTokenBalance = formatUnits(data, selectSellToken?.decimals);

    // console.log(walletTokenBalance, ">= ", sellTokenAmount);
    // console.log("flag ", walletTokenBalance >= sellTokenAmount);

    if (walletTokenBalance - sellTokenAmount >= 0) {
      setDisableSwapBtn(true);
    } else {
      setSwapBtnMessage(`Not Enough ${selectSellToken?.symbol}`);
      setDisableSwapBtn(false);
    }

    //return formatUnits(data, tokenData?.[selectSellToken].decimals);
  }

  async function testAllowence(proxyAddress, allowenceAmount) {
    if (proxyAddress === "0x0000000000000000000000000000000000000000")
      return true;
    //console.log("prox ", proxyAddress);
    const data = await publicClient?.readContract({
      address: selectSellToken?.address,
      abi: erc20ABI,
      functionName: "allowance",
      args: [walletClient?.account.address, proxyAddress],
    });
    //console.log("allow ", formatUnits(data, tokenData?.[selectSellToken].decimals), "and ", allowenceAmount);

    //console.log(data >= allowenceAmount);
    return data >= allowenceAmount;
  }

  async function approveFunction(approveAddress, approveAmount) {
    try {
      // const publicClient = createPublicClient({
      //   chain: polygon,
      //   transport: http(
      //     `https://polygon-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_ID}`
      //   ),
      // });

      // const client = createWalletClient({
      //   account: walletClient?.account.address,
      //   chain: polygon,
      //   transport: custom(walletClient),
      // });

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
      // const client = createWalletClient({
      //   account: walletClient?.account.address,
      //   chain: polygon,
      //   transport: custom(walletClient),
      // });



      const txParams = {
        from: priceData?.from,
        to: priceData?.to,
        data: priceData?.data,
        value: priceData?.value,
        gasPrice: priceData?.gasPrice,
      };

      let hashKey = await privateClient?.sendTransaction(txParams);

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


                {(selectSellToken != null) ? <> <img src={selectSellToken?.logoURI} />
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

          <Image src="down-arrow.svg" alt="" height={100} width={100} className={styles.tradeTougle} />
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
              <img src={selectBuyToken?.logoURI} />
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
              disabled={!disableSwapBtn}
              onClick={() =>
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
              {swapBtnMessage}
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