import axios from "axios";

axios.defaults.baseURL = "https://api.unsplash.com/";

export const fetchImagesByQuery = async (page = 1, query = "nature") => {
  const { data } = await axios.get("/search/photos", {
    params: {
      client_id: "T__HBkVxwrx-QRJ8kuyv-pWE0M9vc4BUe8ygy5wvTmQ",
      query,
      per_page: 12,
      page,
    },
  });
  return data;
};
