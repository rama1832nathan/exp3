import { useState } from 'react';

function App() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch('http://localhost:5000/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });

    const result = await response.json();
    alert(result.message);
  } catch (error) {
    console.error('Error submitting form:', error);
    alert('Error submitting form');
  }
};


  return (
    <div style={{ padding: '2rem' }}>
      <h1>Submit Form to JSON</h1>
      <form onSubmit={handleSubmit} style={{ maxWidth: '400px' }}>
        <label>Name:<br />
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </label><br /><br />

        <label>Email:<br />
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </label><br /><br />

        <label>Message:<br />
          <textarea name="message" value={formData.message} onChange={handleChange} required />
        </label><br /><br />

        <button type="submit">Download JSON</button>
      </form>
    </div>
  );
}

export default App;
