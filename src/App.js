import React, { Component }  from 'react';
import './App.css';
import List from './components/task/List';
import Form from './components/task/Form';
import { getList, addItem, updateItem, deleteItem } from './function/ListFunctions';

class App extends Component {

  constructor() {
    super();
    this.state = {
        id: '',
        title: '',
        description: '',
        editDisabled: false,
        items: [],
        editMode : false
    }

    this.onCreate = this.onCreate.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onEdit = this.onEdit.bind(this);
    this.onDelete = this.onDelete.bind(this);
  }

  componentDidMount() {
      this.getAll();
  }

  getAll = () => {
      getList().then(data => {
          this.setState({
              title: '',
              items: [...data]
          })
      })
  }

  clearForm = () => {
    this.setState({
        title: '',
        description: '',
        editMode: false
    })
  }

  onChange = (name, value) => {
    this.setState({
        [name]: value
    })
  }

  onCreate = () => {
      addItem(this.state.title, this.state.description).then(() => {
          this.getAll()
      })
      this.clearForm();
  }

  onEdit = (itemid) => {
    var data = [...this.state.items];

    data.forEach((item, index) => {
        if (item.id === itemid) {
            this.setState({
                id: item.id,
                title: item.title,
                description: item.description,
                editMode: true
            })
        }
    })
  }

  onUpdate = () => {
      updateItem(this.state.title, this.state.description, this.state.id).then(() => {
          this.getAll()
      })

      this.clearForm();
  }

  onDelete = (val) => {
      deleteItem(val).then(() => {
        this.getAll()
    });

  }

  render() {
    return (      
      <div className="container">
        <div className="row">
          <div className="col-md-6 mx-auto">
            <br />
            <h1 className="text-center">Todo List</h1>
            <Form 
              item = {this.state} 
              onCreate = {this.onCreate}
              onChange = {this.onChange}
              onUpdate = {this.onUpdate}
            />
            <List 
              items = {this.state}
              onEdit= {this.onEdit}
              onDelete = {this.onDelete}
            />
          </div>
        </div>
      </div>
    )
  }

}

export default App;
