import axios from "axios";
export const fetchData = async () => {
  var res = await axios.get("https://api-hook-101.herokuapp.com/api/lists");
  if (res.status !== 200) {
    return "failed";
  }
  return res.data;
};

export const fetchOne = async (id) => {
  var res = await axios.get(
    `https://api-hook-101.herokuapp.com/api/list/${id}`
  );
  if (res.status !== 200) {
    return "failed";
  }
  return res.data;
};

export const editData = async (id, text) => {
  let myObj = {
    name: text,
    address: Date(),
  };
  var res = await axios.patch(
    `https://api-hook-101.herokuapp.com/api/edit/${id}`,
    myObj
  );
  if (res.status !== 200) {
    return "failed";
  }
  return myObj;
};
// `https://api-hook-101.herokuapp.com/api/delete/${id}`

export const deleteData = async (id) => {
  var res = await axios.delete(
    `https://api-hook-101.herokuapp.com/api/delete/${id}`
  );
  if (res.status === 200) {
    return id;
  } else {
    return "failed";
  }
};
export const addData = async (text) => {
  let myObj = {
    name: text,
    address: Date(),
  };
  var res = await axios.post(
    `https://api-hook-101.herokuapp.com/api/add`,
    myObj
  );
  if (res.status !== 200) {
    return "failed";
  }
  return res.data;
};
