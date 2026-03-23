import { useState, useEffect } from 'react'
import { supabase } from '@/integrations/supabase/client'
import { useNavigate } from 'react-router-dom'

function Dashboard() {
  const [apiKey, setApiKey] = useState('')
  const [data, setData] = useState({})
  const [key, setKey] = useState('')
  const [value, setValue] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const storedKey = localStorage.getItem('apiKey')
    if (storedKey) {
      setApiKey(storedKey)
    }
  }, [])

  const generateApiKey = () => {
    const newKey = 'xodeon_' + Math.random().toString(36).substr(2, 9)
    setApiKey(newKey)
    localStorage.setItem('apiKey', newKey)
    setData({})
  }

  const saveData = () => {
    if (!apiKey) {
      alert('Generate an API key first')
      return
    }
    if (!key || !value) {
      alert('Enter key and value')
      return
    }
    setData(prev => ({ ...prev, [key]: value }))
    setKey('')
    setValue('')
  }

  const deleteData = (k) => {
    const newData = { ...data }
    delete newData[k]
    setData(newData)
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate('/login')
  }

  return (
    <div className="app">
      <header>
        <h1>Xodeon Cloud Dashboard</h1>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </header>
      <main>
        <section>
          <h2>API Key</h2>
          <p>Your API Key: {apiKey || 'None'}</p>
          <button onClick={generateApiKey}>Generate New API Key</button>
        </section>
        <section>
          <h2>Save Data</h2>
          <input
            type="text"
            placeholder="Key"
            value={key}
            onChange={(e) => setKey(e.target.value)}
          />
          <input
            type="text"
            placeholder="Value"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <button onClick={saveData}>Save</button>
        </section>
        <section>
          <h2>Your Data</h2>
          <ul>
            {Object.entries(data).map(([k, v]) => (
              <li key={k}>
                {k}: {v} <button onClick={() => deleteData(k)}>Delete</button>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  )
}

export default Dashboard
