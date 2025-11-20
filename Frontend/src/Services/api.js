import axios from "axios";

const API_URL = "http://localhost:5000";

export const getReviews = async () => {
  const response = await axios.get(`${API_URL}/api/reviews`);
  return response.data;
};
