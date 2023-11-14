//import qs from "qs";

export default async function handler(req, res) {
  
    let val = req.query;
    let mainUrl;
    
    if(val.networkID == 137) {
      mainUrl = "polygon.api.0x.org"
    } else {
      mainUrl = "api.0x.org"
    }
    //console.log( "sa, ", `https://${mainUrl}/swap/v1/price?buyToken=${val.buyToken}&sellToken=${val.sellToken}&sellAmount=${val.sellAmount}&feeRecipient=0xa22557dd15d137b6A9Bc485a715e37AC30d38100&buyTokenPercentageFee=0.1&enableSlippageProtection=true&priceImpactProtectionPercentage=0.15&intentOnFilling=true&skipValidation=true`);
    const response = await fetch(
      `https://${mainUrl}/swap/v1/price?buyToken=${val.buyToken}&sellToken=${val.sellToken}&sellAmount=${val.sellAmount}&feeRecipient=0xa22557dd15d137b6A9Bc485a715e37AC30d38100&buyTokenPercentageFee=0.05&enableSlippageProtection=true&priceImpactProtectionPercentage=0.15&intentOnFilling=true&skipValidation=true`,
      {
        headers: {
          "0x-api-key": "f9774248-25f3-4792-b401-ed59b63d8323", // process.env.NEXT_PUBLIC_0X_API_KEY,
        },
      }
    );
  
    const data = await response.json();
    //console.log("responce ", data);
    res.status(200).json(data);
  }