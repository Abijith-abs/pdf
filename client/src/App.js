// client/src/App.js
import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [input, setInput] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleGetPdf = async () => {
    try {
      // Clear previous error message
      setErrorMessage('');

      const response = await axios.post('http://localhost:5000/getPdf', { input }, { responseType: 'arraybuffer' });

      if (response.data.byteLength === 0) {
        // PDF not found, display error message
        setErrorMessage(`PDF file '${input}' not found.`);
      } else {
        // PDF found, open in a new browser tab
        const blob = new Blob([response.data], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        window.open(url, '_blank');
      }
    } catch (error) {
      console.error('Error retrieving PDF:', error);
      setErrorMessage('An error occurred while retrieving the PDF.');
    }
  };

  return (
    <div>
      <h1>PDF Retrieval App</h1>
      <label htmlFor="input">Enter PDF file name:</label>
      <input
        type="text"
        id="input"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        required
      />
      <button onClick={handleGetPdf}>Get PDF</button>

      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </div>
  );
}

export default App;
