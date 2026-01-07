import axios from 'axios';
import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const API_URL = "https://jsonplaceholder.typicode.com/comments";

function Comments() {
  const [comments, setComments] = useState([]);
  const [name, setName] = useState("");
  const [mail, setMail] = useState("");
  const [body, setBody] = useState("");
  const [editId, setEditId] = useState(null);

  // Fetch comments
  useEffect(() => {
    axios.get(API_URL)
      .then(res => {
        setComments(res.data.slice(0, 5));
      });
  }, []);

  // Add comment
  const addComment = () => {
    if (!name || !mail || !body) {
      alert("Fields should not be empty!!");
      return;
    }

    axios.post(API_URL, {
      name,
      email: mail,
      body,
      postId: 1
    }).then(res => {
      setComments([...comments, res.data]);
      setName("");
      setMail("");
      setBody("");
      alert("Comment Added Successfully!!");
    });
  };

  // Start edit
  const startEdit = (comment) => {
    setEditId(comment.id);
    setName(comment.name);
    setMail(comment.email);
    setBody(comment.body);
  };

  // Update comment
  const updateComment = () => {
    axios.patch(`${API_URL}/${editId}`, {
      name,
      email: mail,
      body
    }).then(() => {
      setComments(
        comments.map(c =>
          c.id === editId ? { ...c, name, email: mail, body } : c
        )
      );
      cancelEdit();
      alert("Comment Updated Successfully!!");
    });
  };

  // Cancel edit
  const cancelEdit = () => {
    setEditId(null);
    setName("");
    setMail("");
    setBody("");
  };

  return (
    <div>
      <h3>Comments List</h3>

      <table className="table table-bordered">
        <thead>
          <tr>
            <td>ID</td>
            <td>Name</td>
            <td>Email</td>
            <td>Body</td>
            <td>Action</td>
          </tr>
        </thead>

        <tbody>
          {comments.map(comment => (
            <tr key={comment.id}>
              <td>{comment.id}</td>
              <td>{comment.name}</td>
              <td>{comment.email}</td>
              <td>{comment.body}</td>
              <td>
                <button
                  className="btn btn-warning"
                  onClick={() => startEdit(comment)}
                >
                  Edit
                </button>{" "}
                <button
                  className="btn btn-danger"
                  type="button"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>

        <tfoot>
          <tr>
            <td></td>
            <td>
              <input
                className="form-control"
                placeholder="Enter Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </td>
            <td>
              <input
                className="form-control"
                placeholder="Enter Email"
                value={mail}
                onChange={(e) => setMail(e.target.value)}
              />
            </td>
            <td>
              <input
                className="form-control"
                placeholder="Enter Body"
                value={body}
                onChange={(e) => setBody(e.target.value)}
              />
            </td>
            <td>
              {editId ? (
                <>
                  <button
                    className="btn btn-success"
                    onClick={updateComment}
                  >
                    Update
                  </button>{" "}
                  <button
                    className="btn btn-secondary"
                    onClick={cancelEdit}
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  className="btn btn-primary"
                  onClick={addComment}
                >
                  Add
                </button>
              )}
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

export default Comments;
