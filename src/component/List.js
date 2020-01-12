import React, { Component } from 'react';
import { getList, addItem, updateItem, deleteItem } from '../function/ListFunctions';

class List extends Component {
    constructor() {
        super();
        this.state = {
            id: '',
            title: '',
            description: '',
            editDisabled: false,
            items: []
        }

        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        this.getAll();
    }

    onChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    getAll = () => {
        getList().then(data => {
            this.setState({
                title: '',
                items: [...data]
            },
                () => {
                    console.log(this.state.items)
                })
        })
    }

    onSubmit = e => {
        e.preventDefault();
        addItem(this.state.title, this.state.description).then(() => {
            this.getAll()
        })

        this.setState({
            title: '',
            description: ''
        })
    }

    onUpdate = e => {
        e.preventDefault();
        updateItem(this.state.title, this.state.description, this.state.id).then(() => {
            this.getAll()
        })

        this.setState({
            title: '',
            description: '',
            editDisabled: ''
        })
    }

    onEdit = (itemid, e) => {
        e.preventDefault();
        var data = [...this.state.items];

        data.forEach((item, index) => {
            if (item.id === itemid) {
                this.setState({
                    id: item.id,
                    title: item.title,
                    description: item.description,
                    editDisabled: true
                })
            }
        })
    }

    onDelete = (val, e) => {
        e.preventDefault();
        deleteItem(val);
        this.getAll();
    }

    render() {

        return (
            <div className="col-md-12">
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Judul</label>
                        <div className="row">
                            <div className="col-md-12">
                                <input type="text" className="form-control" name="title" id="title" value={this.state.title || ''}
                                    onChange={this.onChange.bind(this)}>
                                </input>

                            </div>
                        </div>
                        <br />
                        <label>Deskripsi</label>
                        <div className="row">
                            <div className="col-md-12">

                                <textarea className="form-control" name="description" id="description" value={this.state.description || ''}
                                    onChange={this.onChange.bind(this)}></textarea>
                            </div>
                        </div>
                    </div>
                    {
                        !this.state.editDisabled ? (
                            <button type="submit" className="btn btn-block btn-success btn-sm " onClick={this.onSubmit.bind(this)}>Submit</button>
                        ) : (
                                ''
                            )
                    }

                    {
                        this.state.editDisabled ? (
                            <button type="submit" className="btn btn-block btn-primary btn-sm " onClick={this.onUpdate.bind(this)}>Update</button>
                        ) : (
                                ''
                            )
                    }
                </form>

                <br />

                <table className="table">
                    <tbody>
                        {this.state.items.map((item, index) => {
                            return <tr key={index}>
                                <td>{item.title}</td>
                                <td className="text-right">
                                    <button className="btn btn-info mr-1 btn-sm"
                                        disabled={this.state.editDisabled}
                                        onClick={
                                            this.onEdit.bind(
                                                this,
                                                item.id
                                            )
                                        }
                                    >Edit</button>
                                    <button className="btn btn-danger mr-1 btn-sm"
                                        disabled={this.state.editDisabled}
                                        onClick={
                                            this.onDelete.bind(
                                                this,
                                                item.id
                                            )
                                        }
                                    >Delete</button>
                                </td>
                            </tr>
                        })}

                    </tbody>
                </table>
            </div>
        )
    }
}

export default List;