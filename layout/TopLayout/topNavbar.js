import { useEffect, useState } from "react";
import styles from '@/styles/topNavbar.module.css';
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
// import menuImg from "@/public/hamburger_menu.svg";
// import { Input } from "@nextui-org/react";
//import {SearchIcon} from "./SearchIcon";

import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button, NavbarMenuToggle, NavbarMenu, NavbarMenuItem } from "@nextui-org/react";
import NotificationIcon from "@/components/NotificationIcon";
import Hamberger from "@/components/Hamberger";
import Cross from "@/components/Cross";
import { HambergerMenu } from "iconsax-react";
const TopNavbar = () => {
  const [isFlag, setIsFlag] = useState(false);

  useEffect(() => {
    setIsFlag(true);
  }, []);

  const { openConnectModal } = useConnectModal();
  const { isConnected } = useAccount();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    "Trade",
    "AI Guide",
    "Dashboard",
    "Wallet",
    "My Settings",
    "Team Settings",
    "Help & Feedback",
  ];



  return (
    <>
      {
        (isFlag) ? <>
          <div className={styles.topNavBar}>
            {/* <form className={styles.search}>
              <input
                className={styles.xyz}
                type="text"
                placeholder="search token name or address..."
              />

            </form> */}

            <div className={styles.search}>

            </div>
            {/* <div className={styles.search}>
      <Input type="email" label="Email" />
     </div> */}



            <div className={styles.navOptions}>

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
            </div>


          </div>

          {/* <div className={styles.topNavMobile}>
            <Link href="/">

              <img
                src="/white-logo.svg"
                alt="defipe_logo"
                className={styles.logoIcon}
              />

            </Link>

            <img
              src="/hamburger_menu.svg"
              alt="defipe_logo"
              className={styles.hambergerMenu}
            // width={100}
            // height={100}
            />
          </div> */}


          <Navbar onMenuOpenChange={setIsMenuOpen} className={styles.topNavMobile}>
            <NavbarContent>
              {/* <NavbarMenuToggle
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                className="sm:hidden"
              /> */}
              <NavbarBrand>
                <Link href="/">

                  <img
                    src="/white-logo.svg"
                    alt="defipe_logo"
                    className={styles.logoIcon}
                  />

                </Link>
              </NavbarBrand>
            </NavbarContent>

            <NavbarContent className="hidden sm:flex gap-4" justify="center">
              <NavbarItem>
                <Link color="foreground" href="#">
                  Features
                </Link>
              </NavbarItem>
              <NavbarItem isActive>
                <Link href="#" aria-current="page">
                  Customers
                </Link>
              </NavbarItem>
              <NavbarItem>
                <Link color="foreground" href="#">
                  Integrations
                </Link>
              </NavbarItem>
            </NavbarContent>
            <div style={{ width: "60%", display: "flex", alignItems: "center", justifyContent: "space-evenly" }}>
              {/* {isConnected ? (
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
              )} */}
              <NavbarContent justify="end">

                <NavbarMenuToggle
                  aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                  className="sm:hidden"
                  icon={isMenuOpen ? <Cross /> : <HambergerMenu size="44" color="#ffffff"/>}
                  style={{height:"3rem", width:"3rem"}}
                />
              </NavbarContent>

            </div>


            <NavbarMenu style={{ backgroundColor: "#1F2128" }}>
              {menuItems.map((item, index) => (
                <NavbarMenuItem key={`${item}-${index}`}>
                  <Link
                    // color={
                    //   index === 0 ? "white" : "foreground"
                    // }
                    className="w-full"
                    href={index == 0 ? "/" : "#"}
                    size="lg"

                    style={index == 0 ? { color: "White", cursor: "pointer" } : { color: "#ffffff78", cursor: "not-allowed" }}
                  >
                    {item}
                  </Link>
                </NavbarMenuItem>
              ))}
              {/* {isConnected ? (
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
              )} */}
            </NavbarMenu>

          </Navbar>

        </> : <></>}


    </>
  );
};

export default TopNavbar;