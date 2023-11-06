import DexLayout from "@/layout/DexLayout/dexLayout";
import { getdata } from "@/server/initialData";
//import { getServerSideProps } from "next/dist/build/templates/pages";

const Dex = (props:any) => {
	//console.log(props?.tokenJSON?.data);
	return (
		<main className="gray-dark text-foreground bg-background">
			<DexLayout tokenData={props?.tokenJSON?.data}/>
		</main>
		
	);
};

export async function getServerSideProps() {
	//let tokenAPI = await fetch(`https://api.defipe.io/pagination/1?page=1&limit=10`);
	let tokenJSON = await getdata();
	return {
		props: {tokenJSON}
	}
}

export default Dex;