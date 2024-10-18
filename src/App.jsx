import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div className="container">
      <h2>QR Code Generator
      </h2>
      <p><img src="QR_code.png" alt="QR Code" /></p>

      <div className="input-container">
        <label htmlFor="url">Website Link</label>
        <input type="text" id="url" required />
      </div>
      <div className="input-container">
        <label htmlFor="img_size">Image size</label>
        <input type="number" id="img_size" required />
      </div>
      <button className='generate'>Generate QR Code</button>
      <button className='download'>Download QR Code</button>
    </div>
    </>
  )
}

export default App
