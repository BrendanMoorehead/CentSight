import { useDispatch } from 'react-redux';
import { registerUserWithPassword } from '../store/auth-actions';
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

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    console.log(username);
  };
  const handlePasswordChange = (e) => setPassword(e.target.value);

  return (
    <div>
      <form onSubmit={handleSignup}>
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
