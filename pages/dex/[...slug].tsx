import DexLayout from "@/layout/DexLayout/dexLayout";
import { getdata } from "@/server/initialData";
import Head from "next/head";
//import { getServerSideProps } from "next/dist/build/templates/pages";

const Dex = (props: any) => {
	return (
		<>
			<Head>
				<title>DefiPe- Easy-to-use Crypto Trading Platform</title>
				<meta
					name="description"
					content="Easy-to-use Crypto Trading Platform"
				/>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main className="gray-dark text-foreground bg-background">
				<DexLayout tokenData={props?.tokenJSON[0]} />
			</main>
		</>


	);
};

export async function getServerSideProps(context:any) {
	let tokenJSON;
	let slugUrl = context?.query?.slug;
	//console.log("hullaa ", slugUrl[1]?.length);
	if(slugUrl?.length == 2 && slugUrl[1]?.length == 42) {
		
	    tokenJSON = await getdata(slugUrl[0], slugUrl[1]);
		//console.log("hullaa ", tokenJSON);
	}
	
	return {
		props: { tokenJSON }
	}
}

export default Dex;