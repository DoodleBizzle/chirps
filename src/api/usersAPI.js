
const loginUser = async (email, password) => {
  try {
    const response = await fetch('/api/users/login', {
      method: 'POST',
      headers: {
        'Content-type': 'Application/json'
      },
      body: JSON.stringify({
        email,
        password
      })
    })
    const result = await response.json()
    return result
  } catch (error) {
    console.error(error)
  }
}

export {
  loginUser
}