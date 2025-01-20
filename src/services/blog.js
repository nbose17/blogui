import axios from "axios";

let headers = {
  Authorization: `Bearer ${localStorage.getItem("token")}`,
  "Content-Type": "application/json",
};

export const blogList = async () => {
  console.log(headers);
  return await axios.get(`${process.env.REACT_APP_API_BASE_URL}blog/list`, {
    headers: headers,
  });
};

export const blogView = async (id) => {
  return await axios.get(
    `${process.env.REACT_APP_API_BASE_URL}blog/view/${id}`,
    { headers: headers }
  );
};

export const blogCreate = async (data) => {
  return await axios.post(
    `${process.env.REACT_APP_API_BASE_URL}blog/create`,
    data,
    { headers: headers }
  );
};

export const blogEdit = async (id, data) => {
  return await axios.put(
    `${process.env.REACT_APP_API_BASE_URL}blog/edit/${id}`,
    data,
    { headers: headers }
  );
};

export const blogDelete = async (id) => {
  return await axios.delete(
    `${process.env.REACT_APP_API_BASE_URL}blog/delete/${id}`,
    { headers: headers }
  );
};
