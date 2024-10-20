import { useState } from 'react'
import './App.css'

function App() {
  const [qrcode, setQrCode] = useState(null)
  const [url, setURL] = useState("")
  const [size, setSize] = useState("")
  const [loading, setLoading] = useState(false)
  
  const generate_code = ()=> {
    setLoading(true)
    const code = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(url)}`
    setQrCode(code)
    setLoading(false)
  }

  const download = async()=>{
    const image = await fetch(qrcode)
    const imageBlog = await image.blob()
    const imageURL = URL.createObjectURL(imageBlog)
    const link = document.createElement('a')
    link.href = imageURL
    link.download = 'qr_code.png'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }
  return (
    <>
    <div className="container">
      <h2>QR Code Generator
      </h2>
    {loading && <p>Please Wait...</p>}
      {qrcode &&
      <p><img src={qrcode} alt="" /></p>
}
      <div className="input-container">
        <label htmlFor="url">Website Link</label>
        <input type="text" id="url" required 
        onChange={e=>setURL(e.target.value)}/>
      </div>
      <div className="input-container">
        <label htmlFor="img_size">Image size</label>
        <input type="number" id="img_size" required 
        onChange={e=>setSize(e.target.value)}/>
      </div>
      <button className='generate' onClick={generate_code}
      disabled = {loading}>Generate QR Code</button>
      <button className='download' onClick={download}>Download QR Code</button>
    </div>
    </>
  )
}

export default App
