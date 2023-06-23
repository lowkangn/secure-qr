import axios from "axios";
import { BASE_URL, ML_MODEL_ENDPOINT } from "./constants";

/* Posts the given url string to the ML model API endpoint and returns a 1 or 0 depending if the url is malicious or not. */
export const verifyURLWithModel = async (urlScanned) => {
  try {
    const res = await axios.post(BASE_URL + ML_MODEL_ENDPOINT, {
      url: urlScanned,
    });
    return res.data;
  } catch (error) {
    console.error("Something went wrong trying to access the ML model API.");
  }
};
