import React, { useState } from 'react';

// Main Contact Form Component
export default function ContactForm() {
  // State to hold form data
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  // State to manage submission status
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Handles input changes and updates the state
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handles form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setError('Please fill out all fields.');
      return;
    }
    
    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address.');
      return;
    }

    setIsLoading(true);
    setError('');

    // --- In a real application, you would send the data to a server here ---
    console.log('Form data submitted:', formData);

    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
      // Reset form fields
      setFormData({
        name: '',
        email: '',
        message: '',
      });
      // Hide success message after a few seconds
      setTimeout(() => setIsSubmitted(false), 4000);
    }, 1500);
  };

  const cssStyles = `
    .contact-form-container {
      font-family: sans-serif;
      background-color: #f3f4f6;
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      padding: 1rem;
    }
    .form-card {
      width: 100%;
      max-width: 32rem;
      padding: 2rem;
      background-color: #ffffff;
      border-radius: 1.5rem;
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    }
    .form-card > * + * {
      margin-top: 1.5rem;
    }
    .form-header h1 {
      font-size: 1.875rem;
      font-weight: 700;
      text-align: center;
      color: #1f2937;
    }
    .form-header p {
      margin-top: 0.5rem;
      text-align: center;
      color: #6b7280;
    }
    .contact-form {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }
    .form-group {
      display: flex;
      flex-direction: column;
    }
    .form-group label {
      font-size: 0.875rem;
      font-weight: 500;
      color: #374151;
      margin-bottom: 0.25rem;
    }
    .form-input, .form-textarea {
      width: 100%;
      padding: 0.75rem 1rem;
      background-color: #f9fafb;
      border: 1px solid #d1d5db;
      border-radius: 0.375rem;
      box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
      color: #1f2937;
      transition: border-color 0.2s, box-shadow 0.2s;
    }
    .form-input::placeholder, .form-textarea::placeholder {
      color: #9ca3af;
    }
    .form-input:focus, .form-textarea:focus {
      outline: none;
      border-color: #4f46e5;
      box-shadow: 0 0 0 2px rgba(79, 70, 229, 0.5);
    }
    .submit-button {
      width: 100%;
      display: flex;
      justify-content: center;
      padding: 0.75rem 1rem;
      border: none;
      border-radius: 0.375rem;
      box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
      font-size: 0.875rem;
      font-weight: 500;
      color: #ffffff;
      background-color: #4f46e5;
      cursor: pointer;
      transition: background-color 0.3s;
    }
    .submit-button:hover {
      background-color: #4338ca;
    }
    .submit-button:disabled {
      background-color: #818cf8;
      cursor: not-allowed;
    }
    .error-message {
      padding: 0.75rem;
      font-size: 0.875rem;
      color: #991b1b;
      background-color: #fee2e2;
      border-radius: 0.5rem;
      text-align: center;
    }
    .success-message {
      text-align: center;
      padding: 1.5rem;
      background-color: #f0fdf4;
      border-radius: 0.5rem;
    }
    .success-message h2 {
      font-size: 1.5rem;
      font-weight: 700;
      color: #15803d;
    }
    .success-message p {
      margin-top: 0.5rem;
      color: #16a34a;
    }
    @media (prefers-color-scheme: dark) {
      .contact-form-container { background-color: #111827; }
      .form-card { background-color: #1f2937; }
      .form-header h1 { color: #ffffff; }
      .form-header p { color: #9ca3af; }
      .form-group label { color: #d1d5db; }
      .form-input, .form-textarea {
        background-color: #374151;
        border-color: #4b5563;
        color: #ffffff;
      }
      .error-message {
        color: #fca5a5;
        background-color: rgba(153, 27, 27, 0.3);
      }
      .success-message { background-color: rgba(22, 101, 52, 0.5); }
      .success-message h2 { color: #6ee7b7; }
      .success-message p { color: #86efac; }
    }
  `;

  return (
    <>
      <style>{cssStyles}</style>
      <div className="contact-form-container">
        <div className="form-card">
          {isSubmitted ? (
            <div className="success-message">
              <h2>Thank You!</h2>
              <p>Your message has been sent successfully.</p>
            </div>
          ) : (
            <>
              <div className="form-header">
                <h1>Contact Us</h1>
                <p>Have a question or feedback? Fill out the form below.</p>
              </div>
              
              {error && (
                <div className="error-message">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="contact-form" noValidate>
                <div className="form-group">
                  <label htmlFor="name">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="form-input"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className="form-input"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Your message here..."
                    className="form-textarea"
                    required
                  ></textarea>
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="submit-button"
                  >
                    {isLoading ? 'Sending...' : 'Send Message'}
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </>
  );
}

