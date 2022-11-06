import React, { useContext } from 'react';
import NoteContext from '../context/notes/NoteContext';

const NotesItem = (props) => {

    const context = useContext(NoteContext)
    const { handleDelete, updateNote } = context
    const { title, description, tag, _id } = props.element

    return (
        <div className="card my-3">
            <div style={{ position: "absolute", display: "flex" }}>
                <span className="badge badge-danger">{tag}</span>
            </div>
            <div className="card-body">
                <div style={{ alignItems: "baseline" }} className='d-flex justify-content-between'>
                    <h5 className="card-title">{title}</h5>
                    <div>
                        <i style={{ cursor: "pointer" }} onClick={() => updateNote(props.element)} className="far fa-edit mx-1"></i>
                        <i style={{ cursor: "pointer" }} onClick={() => handleDelete(_id)} className="far fa-trash-alt mx-1"></i>
                    </div>
                </div>
                <p className="card-text">{description}</p>
            </div>
        </div>
    )
}

export default NotesItem