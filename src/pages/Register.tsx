import { Alert, Button, Snackbar, TextField } from "@mui/material"
import api from "../api/axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"


const Register = () => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleRegister = async () => {
    if (!username || !password) {
      setError('Please fill in all fields')
      return
    }
    try {
      const response = await api.post('/auth/register', { name: username, password })
      console.log(response)
      navigate('/login')
    } catch (error) {
      setError('Username already exists')
      console.log(error)
    }
  }
  return (
    <section style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', gap: '30px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '30px' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold' }}>Register</h1>
        <TextField required style={{ width: '300px' }} label="Username" onChange={(e) => setUsername(e.target.value)} />
        <TextField required style={{ width: '300px' }} label="Password" onChange={(e) => setPassword(e.target.value)} />
        <Button variant="contained" style={{ width: '150px' }} onClick={() => handleRegister()}>Register</Button>
        
      </div>
        <Snackbar open={error !== ''} autoHideDuration={6000} anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }} onClose={() => setError('')} >
          <Alert severity="error">{error}</Alert>
        </Snackbar>
    </section>
  )
}

export default Register