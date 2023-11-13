import DexLayout from "@/layout/DexLayout/dexLayout";
import { getdata } from "@/server/initialData";
import Head from "next/head";
//import { getServerSideProps } from "next/dist/build/templates/pages";

const Dex = (props: any) => {
	//console.log(props?.tokenJSON?.data);
	return (
		<>
			<Head>
				<title>DefiPe- Easy-to-use Crypto Trading Platform</title>
				<meta
					name="description"
					content="Easy-to-use Crypto Trading Platform"
				/>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				{/* <link rel="icon" href="/Defipe_nav.ico" /> */}
			</Head>
			
			<main className="gray-dark text-foreground bg-background">
				<DexLayout tokenData={props?.tokenJSON?.data} />
			</main>
		</>


	);
};

export async function getServerSideProps() {
	//let tokenAPI = await fetch(`https://api.defipe.io/pagination/1?page=1&limit=10`);
	let tokenJSON = await getdata();
	//console.log("tokenJSON ", tokenJSON)
	return {
		props: { tokenJSON }
	}
}

export default Dex;