// import Head from "next/head";
import styles from '@/styles/sideNavBar.module.css';
import { useState } from "react";

const SideNavBar = () => {
	const [isExpanded, setExpendState] = useState(false);
	const menuItems = [
		{
			text: "Dashboard",
			icon: "Icon.svg",
		},
		{
			text: "market",
			icon: "vector.svg",
		},
		{
			text: "trade",
			icon: "exchange.svg",
		},
		{
			text: "settings",
			icon: "gear.svg",
		},
	];
	return (
		<div
			className={
				isExpanded
					? `${styles.sidenavContainer}`
					: `${styles.sidenavContainer} ${styles.sidenavContainerNX}`
			}
		>
			<div className={styles.navUpper}>
				<div className={styles.navHeading}>
					{/* {isExpanded && (
						<div className={styles.navBrand}>
							<img src="white-logo.svg" alt="" srcSet="" />
							<h2>Defipe</h2>
						</div>
					)} */}
					<button
						className={
							isExpanded ? `${styles.hamburger} ${styles.hamburgerIN}` : `${styles.hamburger} ${styles.hamburgerOUT}`
						}
						// onClick={() => setExpendState(!isExpanded)}
					>
						<img src="white-logo.svg" alt="" srcSet="" />
					</button>
					{isExpanded && (
						<div className={styles.navBrand}>
							{/* <img src="white-logo.svg" alt="" srcSet="" /> */}
							<h2>Defipe</h2>
						</div>
					)}
				</div>

			</div>
			<div className={styles.navMenu}>
				{menuItems.map(({ text, icon }) => (
					<a
						className={isExpanded ? `${styles.menuItem}` : `${styles.menuItem} ${styles.menuItemNX}`}
						href="#"
					>
						<img className={styles.menuItemIcon} src={icon} alt="" srcSet="" />
						{isExpanded && <p>{text}</p>}
					</a>
				))}
			</div>
			<div className={styles.navFooter}>
				{isExpanded && (
					<div className={styles.navDetails}>
						<img
							className={styles.navFooterAvatar}
							src="admin-avatar.svg"
							alt=""
							srcSet=""
						/>
					</div>
				)}
				<img className={styles.logoutIcon} src="logout.svg" alt="" srcSet="" />
			</div>
		</div>
	);
};

export default SideNavBar;
