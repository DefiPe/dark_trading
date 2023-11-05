export async function getdata() {
    try {
        let tokenAPI = await fetch(`https://api.defipe.io/pagination/1?page=1&limit=10`);
        let tokenJSON = await tokenAPI?.json();
        return (tokenJSON == "undefined")? null:tokenJSON;
    } catch (e) {
        console.log(e);
    }

}