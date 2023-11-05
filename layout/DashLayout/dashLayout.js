import DexLayout from "@/layout/DexLayout/dexLayout";
import MainLayout from "../MainLayout/mainLayout";
import TopNavbar from "@/layout/TopLayout/topNavbar";
import TokenCard from "@/components/tokenCard";
import Graph from "@/components/graph";
import styles from '@/styles/dashLayout.module.css'


const DashLayout = () => {
	return (
		<>
		<MainLayout />
        <TopNavbar />
		<TokenCard />
		{/* <div className={styles.graphContainer}><Graph /></div> */}
		
			
			
			
		</>
	);
};

export default DashLayout;