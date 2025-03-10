import { useState } from "react"
import { TextField, Button, Link, Snackbar, Alert} from "@mui/material"
import api from "../api/axios"
import { useAuth } from "../context/AuthContext"
import { useNavigate } from "react-router-dom"
const Login = () => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()
  const handleLogin = async () => {

    if (!username || !password) {
      setError('Please fill in all fields')
      return
    }
    try {
      const response = await api.post('/auth/login', new URLSearchParams({ username, password }), { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
      login(response.data.access_token)
      navigate('/pokedex')
    } catch (error) {
      setError('Invalid username or password')
      console.log(error)
    }
  }

  return (
    <div style={{width: '100vw', height: '100vh' }}>
      <section style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', gap: '30px' }}>
        <h1 style={{ fontSize: '3rem', fontWeight: 'bold' }}>Login</h1>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '30px' }}>
          <TextField variant="outlined" required label="Username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} sx={{ width: '300px' }} />
          <TextField variant="outlined" required label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} sx={{ width: '300px' }} />
        </div>
        <Button variant="contained" style={{ width: '150px' }} onClick={() => handleLogin()}>Login</Button>
        <Link href="/register">Don't have an account? Register!</Link>
      </section>
      <Snackbar open={error !== ''} autoHideDuration={6000} anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }} onClose={() => setError('')} >
        <Alert severity="error">{error}</Alert>
      </Snackbar>
    </div>
    
  )
}

export default Login