import { useEffect, useState } from "react";
import styles from '@/styles/topNavbar.module.css';
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button, NavbarMenuToggle, NavbarMenu, NavbarMenuItem } from "@nextui-org/react";
//import Cross from "@/components/Cross";
//import { HambergerMenu } from "iconsax-react";
// import { fuseSparknet } from "viem/chains";
import Image from "next/image";
const TopNavbar = () => {
  const [isFlag, setIsFlag] = useState(false);

  useEffect(() => {
    setIsFlag(true);
  }, []);

  const { openConnectModal } = useConnectModal();
  const { isConnected } = useAccount();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [toggleMenu, setToggleMenu] = useState(false)

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




          {/* <Navbar onMenuOpenChange={setIsMenuOpen} className={styles.topNavMobile}>
            <NavbarContent>
              <NavbarMenuToggle
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                className="sm:hidden"
              />
              <NavbarBrand>
                <Link href="/">
                  <Image
                    src="/white-logo.svg"
                    width={100}
                    height={100}
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
              <NavbarContent justify="end">

                <NavbarMenuToggle
                  aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                  className="sm:hidden"
                  icon={isMenuOpen ? <Cross /> : <HambergerMenu size="44" color="#ffffff" />}
                  style={{ height: "3rem", width: "3rem" }}
                />
              </NavbarContent>

            </div>


            <NavbarMenu style={{ backgroundColor: "#1F2128" }}>
              {menuItems.map((item, index) => (
                <NavbarMenuItem key={`${item}-${index}`}>
                  <Link
                    color={
                      index === 0 ? "white" : "foreground"
                    }
                    className="w-full"
                    href={index == 0 ? "/" : "#"}
                    size="lg"

                    style={index == 0 ? { color: "White", cursor: "pointer" } : { color: "#ffffff78", cursor: "not-allowed" }}
                  >
                    {item}
                  </Link>
                </NavbarMenuItem>
              ))}
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
            </NavbarMenu>

          </Navbar> */}
          {/* <div className={styles.ham}> */}
          <header className={styles.topNavMobile}>
            <Link href="/">
              <Image
                src="/white-logo.svg"
                alt="defipe_logo"
                height={100}
                width={100}
                className={styles.logoIcon}
              />
            </Link>

            <button className={styles.menuHamburger} onClick={() => (setToggleMenu(true))}>
              <Image
                src="/hamurger.svg"
                height={100}
                width={100}
              />
            </button>

          </header>
          {/* </div> */}
          <div className={styles.menuItemDiv} style={toggleMenu ? { width: '80vw', left: '0px' } : { width: '0px', left: '-50rem' }}>
            <div className={styles.menuIconDiv}>
              <Image
                src="/lg.svg"
                alt="defipe_logo"
                className={styles.logoIconFull}
                height={100}
                width={100}
              />
              <button onClick={() => (setToggleMenu(false))} className={styles.menuIconCross}>
                <Image src="/plus.svg" height={100}
                  width={100}
                />
              </button>
            </div>
            {
              (toggleMenu) ? <> <div className={styles.menuItems}>
                <Link href="#"><Image src="/dashboard.svg" height={100} width={100} className={styles.menuIcon} />Dashboard</Link>
                <Link href="#"><Image src="/market.svg" height={100} width={100} className={styles.menuIcon} />Market</Link>
                <Link href="#"><Image src="/trade.svg" height={100} width={100} className={styles.menuIcon} />Trade</Link>
                <Link href="#"><Image src="/settings.svg" height={100} width={100} className={styles.menuIcon} />Settings</Link>

              </div>
                {/* <button className={styles.connect}>
                  Connect Wallet
                </button> */}
                {isConnected ? (
                  <div style={{margin:"0px auto"}}>
                    <ConnectButton accountStatus="address" chainStatus="icon" />
                  </div>

                ) : (
                  <>
                    {" "}
                    {openConnectModal && (
                      <button
                        onClick={openConnectModal}
                        type="button"
                        className={styles.connect}
                      >
                        Connect Wallet
                      </button>
                    )}
                  </>
                )}

              </> : <></>
            }

          </div>

        </> : <></>}


    </>
  );
};

export default TopNavbar;