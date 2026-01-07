import axios from 'axios';
import React, { useEffect, useState } from 'react';

const API_URL = "https://jsonplaceholder.typicode.com/comments";

function Comments() {
  const [comments, setComments] = useState([]);
  const [id, setID] = useState("");
  const [name, setName] = useState("");      
  const [mail, setMail] = useState("");
  const [body, setBody] = useState("");

  useEffect(() => {
    axios.get(API_URL)
      .then(res => {
        setComments(res.data.slice(0, 5));
      });
  }, []);

  const addComment = () => {
    if (!name || !mail || !body) {
      alert("Fields should not be empty!!");
      return;
    }
    axios.post(API_URL, {
      name,      
      mail,
      body,
      postId: 1
    }).then(res => {
      setComments([...comments, res.data]);
      setID("");
      setName("");       
      setMail("");
      setBody("");
      alert("Comment Added Successfully!!");
    });
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
          </tr>
        </thead>
        <tbody>
          {comments.map(comment => (
            <tr key={comment.id}>
              <td>{comment.id}</td>
              <td>{comment.name}</td>  
              <td>{comment.email}</td>
              <td>{comment.body}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td>
              <input
                className="form-control"
                placeholder="Enter ID"
                value={id}
                onChange={(e) => setID(e.target.value)}
              />
            </td>
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
              <button className="btn btn-primary" onClick={addComment}>Add</button>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

export default Comments;
