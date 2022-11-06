import React, { useContext, useEffect } from 'react';
import NoteContext from '../context/notes/NoteContext';

const AddNote = () => {
    const context = useContext(NoteContext);
    const { handleAddNote, handleNoteChange } = context;

    return (
        <div className="my-2">
            <h1>Add a Note</h1>
            <form onSubmit={handleAddNote}>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Title</label>
                    <input onChange={handleNoteChange} type="text" name='title' className="form-control" id="title" />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <input onChange={handleNoteChange} type="text" name='description' className="form-control" id="description" />
                </div>
                <div className="form-group">
                    <label htmlFor="tag">Tag</label>
                    <input onChange={handleNoteChange} type="text" name='tag' className="form-control" id="tag" />
                </div>

                <button type="submit" className="btn btn-primary">Add Note</button>
            </form>
        </div>
    )
}

export default AddNote