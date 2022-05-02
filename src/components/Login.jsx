
import {useState} from 'react';
const Login = () => {
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');

  return (
    <form>
      <input
        type="text"
        placeholder="Email"
        value={emailInput}
        onChange={e => setEmailInput(e.target.value)}
      />
      <input
      type="password"
      placeholder='Password'
      value={passwordInput}
      onChange={e => setPasswordInput(e.target.value)}
      />
      <button>Login</button>
    </form>
  )
}

export default Login;