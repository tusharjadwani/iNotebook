import React, { useContext } from 'react';
import NoteContext from '../context/notes/NoteContext';

const Update = () => {

    const context = useContext(NoteContext);
    const { handleEdit, note, handleNoteChange, ref, refClose } = context


    return (
        <div>
            {/* <!-- Button trigger modal --> */}
            <button style={{ display: "none" }} ref={ref} type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
                Launch
            </button>

            {/* <!-- Modal --> */}
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Update Note</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="form-group">
                                    <label htmlFor="exampleInputEmail1">Title</label>
                                    <input onChange={handleNoteChange} type="text" name='title' className="form-control" id="title" value={note.title || ''} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="description">Description</label>
                                    <input onChange={handleNoteChange} type="text" name='description' className="form-control" id="description" value={note.description || ''} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="tag">Tag</label>
                                    <input onChange={handleNoteChange} type="text" name='tag' className="form-control" id="tag" value={note.tag || ''} />
                                </div>

                            </form>
                        </div>
                        <div className="modal-footer">
                            <button style={{display:"none"}} ref={refClose} type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button onClick={() => handleEdit(note)} type="button" className="btn btn-primary">Update</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Update