import axios from "axios";

export const loginUser = async (data) => {
  return await axios.post(
    `${process.env.REACT_APP_API_BASE_URL}auth/login`,
    data
  );
};
