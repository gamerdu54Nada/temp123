import { useState, useEffect } from 'react'
import { doc, setDoc, getDoc } from 'firebase/firestore'
import { db, auth } from '../firebase'
import { signOut } from 'firebase/auth'
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
      loadData(storedKey)
    }
  }, [])

  const generateApiKey = () => {
    const newKey = 'xodeon_' + Math.random().toString(36).substr(2, 9)
    setApiKey(newKey)
    localStorage.setItem('apiKey', newKey)
    setData({})
  }

  const loadData = async (key) => {
    try {
      const docRef = doc(db, 'users', key)
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        setData(docSnap.data())
      } else {
        setData({})
      }
    } catch (error) {
      console.error('Error loading data:', error)
    }
  }

  const saveData = async () => {
    if (!apiKey) {
      alert('Generate an API key first')
      return
    }
    if (!key || !value) {
      alert('Enter key and value')
      return
    }
    const newData = { ...data, [key]: value }
    setData(newData)
    try {
      await setDoc(doc(db, 'users', apiKey), newData)
    } catch (error) {
      console.error('Error saving data:', error)
    }
    setKey('')
    setValue('')
  }

  const deleteData = async (k) => {
    const newData = { ...data }
    delete newData[k]
    setData(newData)
    try {
      await setDoc(doc(db, 'users', apiKey), newData)
    } catch (error) {
      console.error('Error deleting data:', error)
    }
  }

  const handleLogout = async () => {
    try {
      await signOut(auth)
      navigate('/login')
    } catch (error) {
      console.error('Error logging out:', error)
    }
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