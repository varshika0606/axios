import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react'

const API_URL = "https://jsonplaceholder.typicode.com/posts"
function Posts() {
    const [posts,setPosts] = useState([]);
    const [title,setTitle] = useState("");
    const [body,setBody] = useState("");
    const[editId,setEditId] = useState(null);

    useEffect(() => {
       axios.get(API_URL)
       .then(res =>{
          setPosts(res.data.slice(0,5));
       } )},[]);

       //Function to post - Add new
       const addPost =() => {
            if(!title || !body) {
              alert("Fields should not be empty!!");
              return;
            }

            axios.post(API_URL,
              {
                title,
                body,
                userId: 1
              } )
            .then(res => {
              //Add new post to existing post
              setPosts([...posts,res.data])

              //Clear the form input field
              setTitle("");
              setBody("");

              alert("Post Added Successfully!!");
        } );
       };  

       const startEdit = (post) =>{
          setEditId(post.id);
          setTitle(post.title);
          setBody(post.body);
       };

       //update Post -put operation
       const updatePost = () => {
        axios.patch(`${API_URL}/${editId}`,{
          title,
          body,
          userId : 1
        })
        .then(() => {
          setPosts(
            posts.map(p =>
              p.id === editId ? {...p,title,body} : p
             ) );
             alert("Post updated successfully!!!")
        });
       };
       const cancelEdit =() =>{
        setEditId(null);
        setTitle("");
        setBody("");
       }
  return (
    <div>
        <h3>Post List</h3>
        <table className='table table-bordered'>
            <thead>
                <td>ID</td>
                <td>TITLE</td>
                <td>BODY</td>
                <td>ACTION</td>
            </thead>
            <tbody>
                {posts.map(post => (
                    <tr key = {post.id}>
                      <td>{post.id}</td>
                      <td>{post.title}</td>
                      <td>{post.body}</td>
                      <td>
                        <button className='btn btn-warning' onClick={() => startEdit(post)}>Edit</button>{" "}
                        <button className='btn btn-danger'>Delete</button>
                      </td>
                    </tr>
               ) )}
            </tbody>
            <tfoot>
               <tr>
                <td>
                  <input className='form-control'
                  placeholder='Enter Title'
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  />
                </td>
                <td>
                  <input className='form-control'
                  placeholder='Enter Body'
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  />
                </td>
                <td>
                   {editId ? (
                    <>
                      <button className='btn btn-success' onClick={updatePost}>Update</button>{" "}
                      <button className='btn btn-warning' onClick={cancelEdit}>Cancel</button>
                    </>
                   ) : (
                    <button className='btn btn-primary' onClick={addPost}>Add</button>
                   )
                   }
                </td>
               </tr>  
            </tfoot>
        </table>
    </div>
  )
}

export default Posts