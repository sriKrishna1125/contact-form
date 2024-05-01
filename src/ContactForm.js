import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const formStyle = {
  maxWidth: '400px',
  margin: '0 auto',
  padding: '20px',
  border: '1px solid #ccc',
  borderRadius: '5px',
};

const labelStyle = {
  marginBottom: '5px',
  display: 'block',
};

const inputStyle = {
  width: '100%',
  padding: '10px',
  marginBottom: '10px',
  borderRadius: '5px',
  border: '1px solid #ccc',
  boxSizing: 'border-box',
};

const buttonStyle = {
  width: '100%',
  backgroundColor: '#4CAF50',
  color: 'white',
  padding: '14px 20px',
  margin: '8px 0',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
};

function ContactForm() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [cv, setCV] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (cv && !['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'].includes(cv.type)) {
        setError('Invalid file format. Please upload a PDF, DOC, or DOCX file.');
        navigate('/wrong-file');
        return;
      }

      // Perform form submission here
      console.log({ username, email, message, cv });
      // Reset form fields after submission
      setUsername('');
      setEmail('');
      setMessage('');
      setCV(null);
      setError(null);
      // Redirect to success page
      navigate('/success');
    } catch (error) {
      // Handle error
      setError(error.message);
      // Redirect to error page
      navigate('/error');
    }
  };

  return (
    <div>
      <h2>Contact Form</h2>
      {error && <div>Error: {error}</div>}
      <form style={formStyle} onSubmit={handleSubmit}>
        <div>
          <label style={labelStyle} htmlFor="username">Username:</label>
          <input
            style={inputStyle}
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label style={labelStyle} htmlFor="email">Email:</label>
          <input
            style={inputStyle}
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label style={labelStyle} htmlFor="message">Message:</label>
          <textarea
            style={{...inputStyle, height: '100px'}}
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          ></textarea>
        </div>
        <div>
          <label style={labelStyle} htmlFor="cv">Upload CV:</label>
          <input
            style={inputStyle}
            type="file"
            id="cv"
            onChange={(e) => setCV(e.target.files[0])}
            accept=".pdf,.doc,.docx"
            required
          />
          <label style={labelStyle} htmlFor="cv">Choose File</label>
        </div>
        <button style={buttonStyle} type="submit">Submit</button>
      </form>
    </div>
  );
}

export default ContactForm;





