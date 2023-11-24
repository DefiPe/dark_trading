
export async function getdata(network, token) {
    try {
        let networkID=1;
        if(network == "polygon") {
            networkID=137;
        } 
        let tokenAPI = await fetch(`https://api.defipe.io/searchbychainId/${networkID}/${token}`);
        let tokenJSON = await tokenAPI?.json();
        return (tokenJSON)? tokenJSON:null;
    } catch (e) {
        console.log(e);
    }

}