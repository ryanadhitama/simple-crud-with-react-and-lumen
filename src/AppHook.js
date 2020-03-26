import React, { useState, useEffect } from "react";
import "./styles.css";
import List from "./components/task/List";
import Form from "./components/task/Form";
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
    addItem(form).then(() => {
      getAll();
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
    updateItem(form).then(() => {
      getAll();
    });
    clearForm();
  };

  // Delete data
  const onDelete = val => {
    deleteItem(val).then(() => {
      getAll();
    });
  };

  return (
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
  );
}

export default AppHook;
