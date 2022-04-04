import axios from 'axios';
import { Button } from 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from 'react';

const ValidateApp = () => {
  let [users, setusers] = useState([]);
  useEffect(() => {
    getusers();
  }, []);
  const getusers = () => {
    axios
      .get('/account')
      .then((res) => {
        setusers(res.data.results);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const Check = (e) => {
    e.preventDefault();
    let userObj = {
      id: e.target.id.value,
      username: e.target.username.value,
      password: e.target.password.value,
    };
    axios
      .post('/account/checklogin/' + userObj.username + '/' + userObj.password)
      .then((res) => setusers(res.data))
      .catch((e) => console.log(e));
  };

  const showUser = () => {
    setusers('Login With the respected credentials');
    axios
      .get('/account')
      .then((res) => {
        setusers(res.data.results[0]);
        console.log(res.data.results);
        alert(JSON.stringify(users));
      })
      .catch((e) => console.log(e));
  };
  const logout = () => {
    axios.get('/account/destroy').then((res) => {
      setusers(res.data.results);
    })
  }
  return (
    <div>
      <button className='btn btn-secondary' onClick={logout}>Logout</button>
      <form className='todo' onSubmit={Check}>
        <h3>
          <label>User Name:</label>
        </h3>
        <input
          required
          type='text'
          name='username'
          placeholder='Enter FirstName'
          className='form-control'
        />
        <h3>
          <label>Password :</label>
        </h3>
        <input
          required
          type='password'
          name='password'
          placeholder='Enter Password'
          className='form-control'
        />
        <br />
        <div className='text-center'>
          <button className='btn btn-primary'>Login</button>
        </div>
      </form>
      <div>
        <button onClick={showUser}>Show user Details</button>
      </div>
      <div className='displayinline'></div>
    </div>
  );
};
export default ValidateApp;
