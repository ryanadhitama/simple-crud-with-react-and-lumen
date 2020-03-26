import React from 'react';

function List ({items = {}, onEdit, onDelete}) {

    let list = items.items;

    return (
        <div className="container">
            {
                list.length < 1 ? (
                    <p>Data belum ada</p>
                ) : (
                    list.map((item, index) => (
                        <div className="card mb-2" key={index}>
                            <div className="card-body">
                                <h4>{item.title}</h4>
                                <p>{item.description}</p>
                                <button 
                                    className="btn btn-info btn-sm mr-1"
                                    disabled={items.editMode}
                                    onClick={() => onEdit(item.id)}>
                                    Edit
                                </button>
                                <button 
                                    className="btn btn-danger mr-1 btn-sm"
                                    disabled={items.editMode}
                                    onClick={() => onDelete(item.id)}>
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))
                )
            }
        </div>
    )
}

export default List;