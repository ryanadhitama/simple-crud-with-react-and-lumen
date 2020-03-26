import React, { useState, useEffect } from "react";
import "./styles.css";
import List from "./components/task/List";
import Form from "./components/task/Form";
import LoadingOverlay from 'react-loading-overlay';

import {
  getList,
  addItem,
  updateItem,
  deleteItem
} from "./function/ListFunctions";

function AppHook() {
  const [editMode, setEditMode] = useState(false);
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ id: "", title: "", description: "" });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getAll();
  }, []);

  // Get all data
  const getAll = () => {
    getList().then(data => {
      setItems([...data]);
    });
  };

  // clear all input form
  const clearForm = () => {
    setForm({ id: "", title: "", description: "" });
    setEditMode(false);
  };

  // Handle on change input
  const onChange = (name, value) => {
    setForm({ ...form, [name]: value });
  };

  // Save data
  const onCreate = () => {

    setIsLoading(true);

    addItem(form).then(() => {
      getAll();
      setIsLoading(false);
    }).catch(error => {
      setIsLoading(false);
    });

    clearForm();
  };

  // Show data into edit form
  const onEdit = itemid => {
    var item = items[itemid];
    setForm(item);
    setEditMode(true);
  };

  // Save edit data
  const onUpdate = () => {
    setIsLoading(true);

    updateItem(form).then(() => {
      getAll();
      setIsLoading(false);
    }).catch(error => {
      setIsLoading(false);
    });

    clearForm();
  };

  // Delete data
  const onDelete = val => {
    setIsLoading(true);

    deleteItem(val).then(() => {
      getAll();
      setIsLoading(false);
    }).catch(error => {
      setIsLoading(false);
    });

  };

  return (
    <LoadingOverlay
        active={isLoading}
        spinner
        text='Loading your content...'
        >
      <div className="container">
        <div className="row">
          <div className="col-md-6 mx-auto">
            <br />
            <h1 className="text-center">Todo List</h1>
            <Form
              editMode={editMode}
              item={form}
              onCreate={onCreate}
              onChange={onChange}
              onUpdate={onUpdate}
            />
            <List
              editMode={editMode}
              items={items}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          </div>
        </div>
      </div>
    </LoadingOverlay>
  );
}

export default AppHook;
