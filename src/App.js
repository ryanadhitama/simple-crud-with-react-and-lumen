import React, { Component } from "react";
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

class App extends Component {
  constructor() {
    super();
    this.state = {
      form: {
        id: "",
        title: "",
        description: ""
      },
      items: [],
      editMode: false,
      isLoading : false
    };

    this.onCreate = this.onCreate.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onEdit = this.onEdit.bind(this);
    this.onDelete = this.onDelete.bind(this);
  }

  componentDidMount() {
    this.getAll();
  }

  // Get all data
  getAll = () => {
    getList().then(data => {
      this.setState({
        items: [...data]
      });
    });
  };

  // Get all data
  setLoading = (bool) => {
    this.setState({'isLoading' : bool});
  };

  // clear all input form
  clearForm = () => {
    this.setState({
      form: {
        id: "",
        title: "",
        description: ""
      },
      editMode: false
    });
  };

  // Handle on change input
  onChange = (name, value) => {
    const { form } = this.state;
    const newForm = { ...form, [name]: value };

    this.setState({ form: newForm });
  };

  // Save data
  onCreate = () => {

    this.setLoading(true);

    addItem(this.state.form).then(() => {
      this.getAll();
      this.setLoading(false);
      
    }).catch(error => {
      this.setLoading(false);
      alert(error);
    });
    
    this.clearForm();
  };

  // Show data into edit form
  onEdit = index => {
    var formItem = [...this.state.items][index];
    this.setState({
      form: formItem,
      editMode: true
    });
  };

  // Save edit data
  onUpdate = () => {
    this.setLoading(true);

    updateItem(this.state.form).then(() => {
      this.getAll();
      this.setLoading(false);
    }).catch(error => {
      this.setLoading(false);
      alert(error);
    });

    this.clearForm();
  };

  // Delete data
  onDelete = val => {
    this.setLoading(true);

    deleteItem(val).then(() => {
      this.getAll();
      this.setLoading(false);
    }).catch(error => {
      this.setLoading(false);
      alert(error);
    });
  };

  render() {
    return (
      <LoadingOverlay
        active={this.state.isLoading}
        spinner
        text='Loading your content...'
        >
        <div className="container">
          <div className="row">
            <div className="col-md-6 mx-auto">
              <br />
              <h1 className="text-center">Todo List</h1>
              <Form
                editMode={this.state.editMode}
                item={this.state.form}
                onCreate={this.onCreate}
                onChange={this.onChange}
                onUpdate={this.onUpdate}
              />
              <List
                editMode={this.state.editMode}
                items={this.state.items}
                onEdit={this.onEdit}
                onDelete={this.onDelete}
              />
            </div>
          </div>
        </div>
      </LoadingOverlay>
      
    );
  }
}

export default App;
