import { parseAddress } from "../helper/parseAddress.js";
import request from "request";
import { DOMParser } from "xmldom";


const promiseAddressProcessor = (addresses,res) => {
    let addressList = Array.isArray(addresses) ? addresses : [addresses];
const responseHtml =
"<html><head></head><body><h1>Following are the titles of given websites:</h1><ul>";

Promise.all(
    addressList.map((address) => {
    let completeAddress = parseAddress(address);
    return new Promise((resolve, reject) => {
      request(completeAddress, (error, response, body) => {
       
          resolve(response);
        
      });
    });
  })
)
  .then((responses) => {
    let responseHtml =
      "<html><head></head><body><h1>Following are the titles of given websites:</h1><ul>";
    responses.forEach((response) => {
      if (!response) {
        responseHtml += "<li>NO RESPONSE</li>";
      } else {
        const doc = new DOMParser().parseFromString(
          response.body,
          "text/html"
        );
        const title = doc.getElementsByTagName("title")[0].textContent;
        responseHtml += "<li>" + title + "</li>";
      }
    });
    responseHtml += "</ul></body></html>";
    res.send(responseHtml);
  })
  .catch((error) => {
    console.error(error);
    res.status(500).send("Error Occurred");
  });
}


export { promiseAddressProcessor};