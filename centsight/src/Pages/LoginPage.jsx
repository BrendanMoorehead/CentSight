import { useDispatch } from 'react-redux';
import {
  registerUserWithPassword,
  loginUserWithPassword,
} from '../store/auth-actions';
import { useState } from 'react';
const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const handleSignup = (e) => {
    console.log('signup');
    e.preventDefault();
    dispatch(registerUserWithPassword(username, password));
  };

  const handleLogin = (e) => {
    console.log('login');
    e.preventDefault();
    dispatch(loginUserWithPassword(username, password));
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    console.log(username);
  };
  const handlePasswordChange = (e) => setPassword(e.target.value);

  return (
    <div>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          onChange={handleUsernameChange}
        ></input>
        <input
          type="text"
          placeholder="Password"
          onChange={handlePasswordChange}
        ></input>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default LoginPage;
