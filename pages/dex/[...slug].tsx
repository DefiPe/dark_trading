import DexLayout from "@/layout/DexLayout/dexLayout";
import { getdata } from "@/server/initialData";
import Head from "next/head";
import data from "@/server/token.json";

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

export async function getServerSideProps(context: any) {
	let tokenJSON;
	let slugUrl: any = context?.query?.slug;
	let staticUrl: any = data[0];


	if (staticUrl?.[slugUrl[1]]?.[slugUrl[0]]) {
		tokenJSON = [staticUrl?.[slugUrl[1]]?.[slugUrl[0]]];
	} else if (slugUrl?.length == 2 && slugUrl[1]?.length == 42) {

		tokenJSON = await getdata(slugUrl[0], slugUrl[1]);
	} else {
		return {
			notFound: true,
		}
	}

	return {
		props: { tokenJSON }
	}
}

export default Dex;