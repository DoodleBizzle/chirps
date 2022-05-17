
import { useState, useContext } from 'react';
import { useHistory } from 'react-router';
import { loginUser } from '../api/usersAPI';
import { authContext } from './AuthProvider';
import ErrorMessage from './sub-components/ErrorMessage';


const Login = () => {
  const history = useHistory();
  const { setToken, setUser } = useContext(authContext)
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [errorMessage, setErrorMessage] = useState({})

  const handleSubmit = async (event) => {
    event.preventDefault();
    const login = await loginUser(emailInput, passwordInput);
    console.log(login)
    if (login.user) {
      setUser(login.user)
      setToken(login.token)
      localStorage.setItem("token", login.token)
      history.push('/');
    } else setErrorMessage(login)
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
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
        <button >Login</button>
      </form>
      { errorMessage.name ?
        <ErrorMessage name={errorMessage.name} message={errorMessage.message}/>
      :
        null
      }
    </div>
  )
}

export default Login;