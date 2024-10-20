import { useState } from 'react'
import './App.css'

function App() {
  const [qrcode, setQrCode] = useState(null)
  const [url, setURL] = useState("")
  const [size, setSize] = useState("")
  const [loading, setLoading] = useState(false)
  
  const generate_code = ()=> {
    setLoading(true)
    // encodeURIComponent => Encodes a text string as a valid component of a Uniform Resource Identifier (URI)
    const code = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(url)}`
    setQrCode(code)
    setLoading(false)
  }

  const download = async()=>{
    const image = await fetch(qrcode)
    console.log("image", image);

    // resp to as binary data
    const imageBlog = await image.blob()
    console.log("blob",imageBlog);

    // creates a string containing a URL representing the object given in the parameter. 
    const imageURL = URL.createObjectURL(imageBlog)
    console.log("url",imageURL);

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
