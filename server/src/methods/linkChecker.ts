import axios from "axios";

const filterValidUrls = async (urls: string[], targetSize) => {
  let validUrls = [];

  for (let url of urls) {
    try {
      await axios.get(url);
      validUrls.push(url);
    } catch (error) {
      console.log(`URL failed: ${url}`);
    }

    if (validUrls.length >= targetSize) {
      break;
    }
  }

  return validUrls;
};

export default filterValidUrls;
