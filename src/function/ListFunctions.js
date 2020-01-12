import axios from 'axios';

const URL = 'http://localhost:8000';

export const getList = () => {
    return axios
        .get(URL + '/task',
            {
                headers: { 'Content-Type': 'application/json' }
            }
        )
        .then(res => {
            return res.data
        })
}

export const addItem = (title, description) => {
    return axios
        .post(URL + '/task',
            {
                title: title,
                description: description
            },
            {
                headers: { 'Content-Type': 'application/json' }
            }
        )
        .then(res => {
            console.log(res);
        })
}

export const updateItem = (title, description, id) => {
    return axios
        .put(URL + `/task/${id}`,
            {
                title: title,
                description: description
            },
            {
                headers: { 'Content-Type': 'application/json' }
            }
        )
        .then(res => {
            console.log(res);
        })
}

export const deleteItem = id => {
    return axios
        .delete(URL + `/task/${id}`,
            {
                headers: { 'Content-Type': 'application/json' }
            }
        )
        .then(res => {
            console.log(res);
        })
        .catch(err => {
            console.log(err);
        })
}