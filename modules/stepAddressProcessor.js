import request from "request";
import { DOMParser } from "xmldom";
import step from "step";
import { parseAddress } from "../helper/parseAddress.js";


function stepHandleAddresses(addresses, res) {
  let addressList = Array.isArray(addresses) ? addresses : [addresses];
  step(
    function processAddresses() {
      let count = 0;
      let group = this.group();
      addressList.forEach((address) => {
        let completeAddress = parseAddress(address);
        request(completeAddress, group());
      });
    },
    function parseResponses(err, responses) {
      if (err) throw err;
      let responseHtml =
        "<html><head></head><body><h1>Following are the titles of given websites:</h1><ul>";
      responses.forEach((response) => {
        if (response.error) {
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
    }
  );
}

export {stepHandleAddresses };
