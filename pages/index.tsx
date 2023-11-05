import DexLayout from "@/layout/DexLayout/dexLayout";
import { getdata } from "@/server/initialData";
//import { getServerSideProps } from "next/dist/build/templates/pages";

const Dex = (props) => {
	//console.log(props?.tokenJSON?.data);
	return (
		<DexLayout tokenData={props?.tokenJSON?.data}/>
	);
};

export async function getServerSideProps(context) {
	//let tokenAPI = await fetch(`https://api.defipe.io/pagination/1?page=1&limit=10`);
	let tokenJSON = await getdata();
	return {
		props: {tokenJSON}
	}
}

export default Dex;