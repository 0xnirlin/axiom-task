const parseAddress = (address) => {
    let completeAddress = address;
    if (completeAddress.includes("http://")) {
      completeAddress = completeAddress.replace("http://", "https://");
    }
    if (!completeAddress.includes("https://")) {
      completeAddress = "https://" + completeAddress;
    }
    return completeAddress;
    };

    export { parseAddress}