import axios from "axios";

const URL = "https://api.ryanadhitama.com";

export const getList = () => {
  return axios
    .get(URL + "/task", {
      headers: { "Content-Type": "application/json" }
    })
    .then(res => {
      return res.data;
    });
};

export const addItem = form => {
  return axios
    .post(
      URL + "/task",
      {
        title: form.title,
        description: form.description
      },
      {
        headers: { "Content-Type": "application/json" }
      }
    )
    .then(res => {
      console.log(res);
    });
};

export const updateItem = form => {
  // console.log(`/task/${form.id}`);
  return axios
    .put(
      URL + `/task/${form.id}`,
      {
        title: form.title,
        description: form.description
      },
      {
        headers: { "Content-Type": "application/json" }
      }
    )
    .then(res => {
      console.log(res);
    });
};

export const deleteItem = id => {
  return axios
    .delete(URL + `/task/${id}`, {
      headers: { "Content-Type": "application/json" }
    })
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      console.log(err);
    });
};
