import request from "request";
import { DOMParser } from "xmldom";
import { parseAddress } from "../helper/parseAddress.js";

const callbackHandleAddresses = (addressList, res, responseHtml) => {
    let count = 0;
  
    addressList.forEach((address) => {
       address = parseAddress(address);
      //log the address
      request(address, (error, response, body) => {
        if (error) {
          responseHtml += "<li>NO RESPONSE</li>";
        } else {
          const doc = new DOMParser().parseFromString(body, "text/html");
          const title = doc.getElementsByTagName("title")[0].textContent;
          responseHtml += "<li>" + title + "</li>";
        }
        count++;
        if (count === addressList.length) {
          responseHtml += "</ul></body></html>";
          res.send(responseHtml);
        }
      });
    });
  };

//export
export { callbackHandleAddresses}