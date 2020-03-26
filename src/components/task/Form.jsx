import React from "react";

function Form({ item = {}, editMode, onCreate, onChange, onUpdate }) {
  const onSubmit = e => {
    e.preventDefault();
    editMode ? onUpdate() : onCreate();
  };

  return (
    <div className="col-md-12">
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            className="form-control mb-3"
            value={item.title}
            onChange={e => onChange("title", e.target.value)}
          />

          <label>Description</label>
          <textarea
            className="form-control  mb-3"
            value={item.description}
            onChange={e => onChange("description", e.target.value)}
          />

          <button
            type="submit"
            className="btn btn-block btn-success btn-sm mb-3"
          >
            {editMode ? "Update" : "Create"}
          </button>
        </div>
      </form>
      <br />
    </div>
  );
}

export default Form;
