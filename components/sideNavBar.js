// import Head from "next/head";
import styles from '@/styles/sideNavBar.module.css';
import { Tooltip } from '@nextui-org/react';
import { Home2, Setting, ArrangeVerticalSquare, Diagram } from 'iconsax-react';


const SideNavBar = () => {
	const menuItems = [
		{
			text: "Dashboard(comming soon)",
			icon: <Home2 className={styles.menuItemIcon} size="32" color="#666666" variant="Outline" />,
		},
		{
			text: "trade",
			icon: <ArrangeVerticalSquare size="32" color="#FFFFFF" variant="Bold" />,
		},
		{
			text: "market(comming soon)",
			icon: <Diagram size="32" color="#666666" variant="Outline" />,
		},
		{
			text: "settings(comming soon)",
			icon: <Setting size="32" color="#666666" variant="Outline" />,
		},
	];
	return (
		<div
			className={
				styles.sidenavContainer
			}
		>
			<div className={styles.navUpper}>
				<div className={styles.navHeading}>
					<img src="white-logo.svg" alt="defi logo" srcSet="" />

				</div>

			</div>
			<div className={styles.navMenu}>
				{menuItems.map(({ text, icon, index }) => (

					<a
						key={index}
						className={styles.menuItem}
						href="#"
					><Tooltip
						key={text}
						placement="foreground"
						content={text}
						color="foreground"
					>
							{icon}
						</Tooltip>

					</a>

				))}
			</div>


			<div className={styles.navFooter}>
			</div>
		</div>
	);

	// return (
	// 	<>
	// 		<nav className={styles.sidebar}>
	// 			<header>
	// 				<div className={styles.imageText}>
	// 					<span className={styles.image}>
	// 						<img src="white-logo.svg" alt='logo' />
	// 					</span>
	// 					{/* <div className={`${styles.text} ${styles.headerText}`}>
	// 						<span className={styles.name}>Coding Lab</span>
	// 						<span className={styles.profession}>Web Development</span>

	// 					</div> */}

	// 					{/* <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAAXNSR0IArs4c6QAAAhJJREFUSEutV9txwzAMAzxJR7E36WjdxBmlk5g9PWxTIik5bfPR68WywAcAMiQAuf8A+X/YT/3ePI7O6xucMzTA+QWCEBe/Ps7B+Zj6Ww+xJJaePPuY++JL/WTb8yGwrv7wIt2CJ2Wvl5VSR/1w0CcUeFa93MzS0pNh14tvBH+D1ZdEZIdgBfEiuTXRqAqdyVtCDdOLaA5kYGAFNLDX46hPXSVE5BPABwTfXPgV1TUCvpWSVNMXd0DW/sKIHz5wG6Yl10D4Ty5Mr9/n5EUutcdhqeOenbGkCwVYKXhxKaTxgjlEdmZyVeDQuR6KYAqcghEnmD8BE5Dj2AFWti5bIkvKrmewX+qux1GynpK8ssohO6ilQ4ikAMt3C7kVg2o9tzEQfzDcL7jAv81YS1XHZMqVS13JpYzBZoxcfhoDaeUSDgkNvHDJ5brIpYGHGVfncrJTOm5n8B31rcW21Emf4sppaJkzr/aY6TlXw+pITg6DG+cyPa4T5mTmvwLPjV6X+tgFXGl6LKuAWTrpPk2usZwMutZi1GNuqUKl1LICvGbv0NNtj1v0uWYnzqW92uuxNhXdY6PFqmNjj9W5pLrUNTicDaT1rj6a+tQzgV5O2auNZT7cQIbbzbUUnQvhZN825+Oxp7z64Wx889gosTfitKOt/PzpZ49ZWrsNiwhXnyctmCevW+ONRWfPioB9sGhtijnxAyYG4DTmYRCKAAAAAElFTkSuQmCC"/> */}

	// 				</div>

	// 				<img className={styles.toggle} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAAXNSR0IArs4c6QAAAe5JREFUSEulVuuZgzAMk5nkRmk3oZP0Nuko102OSaL7gAA2sZPQ40fLK7YlyyIC9xAA3J/oq+M8n9m/Zc1yK/8IuEfSa+fz5mHLOL1eJHbKDIpoJI4g2WUHSiecU7kU1EXrqrCdIjrg2F72JCjYjBbFwVSPBYsQnJ5pgRRALhR6rrevKYdem+/7U5DVnuPUVV2gyax8BLvUQSyDYgwEiekmwAvAXUSmbbHPuC3UMBHR4oFi4heA38URBHPSuwwyOcJoe4PDpjatwi3I9A3gmR+syUUmfyxjtYc9rgUi6SZfvbIx02pqmj32KLDJOQGy97woOjC/dj92IBZSgZxrz/322bsdVNfrMsmJCRKp/ZQ4GoP2Z3E1hES+AI7r1aL0h4i8WzQGiHt8cE0qwLgrnHjIMLx9660YiBZF4c+nWki+CIxyzPRDBnk3VZ3zl4izW9XmYk4KjXSjt1BvbE91r3bsi0x7UgKTLPTGPY0tZA5ee6oMgeQNwI9yrSwk/UmtuZXdfynWT7ajEecWkGkE8YRk9fbp8IhknMtxlmgcPspT6GZm6B+HjtfZLbPNanh1T2Wxev3VG2LfXPXO3ArwArxa6FjVjUZHOKtGtElZv3SYRs9IxDLzY9oRqYurSqndDvco4TydLtXVsbkwflFBf4DdCjRDMk58AAAAAElFTkSuQmCC" />
	// 			</header>

	// 			<div className={styles.menuBar}>
	// 				<div className={styles.menu}>
	// 					<li className={styles.navLink}>
	// 						<a href='#' className={styles.icon}>
	// 							<img src="Icon.svg" />
	// 							<span className={`${styles.text} ${styles.navText}`}>Dashboard</span>

	// 						</a>

	// 					</li>


	// 					<li className={styles.navLink}>
	// 						<a href='#' className={styles.icon}>
	// 							<img src="exchange.svg" />
	// 							<span className={`${styles.text} ${styles.navText}`}>Trading</span>

	// 						</a>

	// 					</li>
	// 					<li className={styles.navLink}>
	// 						<a href='#' className={styles.icon}>
	// 							<img src="gear.svg" />
	// 							<span className={`${styles.text} ${styles.navText}`}>Dashboard</span>

	// 						</a>

	// 					</li>


	// 				</div>

	// 			</div>

	// 			<div style={{height:"2rem", width:"2rem"}}>

	// 			</div>

	// 		</nav>
	// 	</>
	// )

};

export default SideNavBar;
