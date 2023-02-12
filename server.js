import express from "express";
import { callbackHandleAddresses } from "./modules/callbackAddressProcessor.js";
import {stepHandleAddresses} from "./modules/stepAddressProcessor.js";
import {promiseAddressProcessor} from "./modules/promiseAddressProcessor.js";


const app = express();

//get route for the /I/want/title endpoint
app.get("/callback/I/want/title", (req, res) => {
  //get the address parameter from the request
  const addresses = req.query;
  //if the address parameter is not present in the request
  if (!addresses) {
    //send a 400 response
    res.status(400).send("Bad Request");
  }
  //if the address parameter is present in the request
  else {
    let addressList = req.query.address;
    if (!Array.isArray(addressList)) {
      addressList = [addressList];
    }

    let responseHtml =
      "<html><head></head><body><h1>Following are the titles of given websites:</h1><ul>";

    callbackHandleAddresses(addressList, res, responseHtml);
  }
});

app.get("/stepjs/I/want/title", (req, res) => {
  const addresses = req.query.address;
  if (!addresses) {
    res.status(400).send("Bad Request");
  } else {
    stepHandleAddresses(addresses, res);
  }
});


app.get("/promise/I/want/title", (req, res) => {
    const addresses = req.query.address;
    if (!addresses) {
    res.status(400).send("Bad Request");
    } else {
    promiseAddressProcessor(addresses, res);
    }
});
        





export default app;
