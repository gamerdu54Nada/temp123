import { useState, useEffect } from 'react'

function Dashboard() {
  const [apiKey, setApiKey] = useState('')
  const [data, setData] = useState({})
  const [key, setKey] = useState('')
  const [value, setValue] = useState('')

  useEffect(() => {
    const storedKey = localStorage.getItem('apiKey')
    if (storedKey) {
      setApiKey(storedKey)
      const storedData = localStorage.getItem(`data_${storedKey}`)
      if (storedData) {
        setData(JSON.parse(storedData))
      }
    }
  }, [])

  const generateApiKey = () => {
    const newKey = 'xodeon_' + Math.random().toString(36).substr(2, 9)
    setApiKey(newKey)
    localStorage.setItem('apiKey', newKey)
    setData({})
    localStorage.removeItem(`data_${newKey}`)
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
    const newData = { ...data, [key]: value }
    setData(newData)
    localStorage.setItem(`data_${apiKey}`, JSON.stringify(newData))
    setKey('')
    setValue('')
  }

  const deleteData = (k) => {
    const newData = { ...data }
    delete newData[k]
    setData(newData)
    localStorage.setItem(`data_${apiKey}`, JSON.stringify(newData))
  }

  return (
    <div className="app">
      <header>
        <h1>Xodeon Cloud Dashboard</h1>
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

export default Dashboard
