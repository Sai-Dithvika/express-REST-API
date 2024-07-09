'use client'
import axios from 'axios';
import React, { useState } from 'react';

interface Contact {
  name: string;
  number?: string;
}

const ContactForm: React.FC = () => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [display, setDisplay] = useState<Contact | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    try {
      await axios.post("/api/dummy", { name, number });
      console.log('Form submitted:', { name, number });
      // Clear input fields after submission
      setName('');
      setNumber('');
    } catch (error) {
      console.error('Form submission error:', error);
    }
  };

  const handleDisplay = async () => {
    try {
      const response = await axios.get("/api/last");
      console.log('Data fetched:', response.data);
      setDisplay(response.data); // Update display state with the fetched contact details
    } catch (error) {
      console.error('Data fetching error:', error);
    }
  };

  return (
    <div className="bg-black flex flex-col border shadow-xl items-center justify-center min-h-screen">
      <form onSubmit={handleSubmit} className="p-4">
        <div className="mb-4">
          <label className="block text-white">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border border-gray-300 p-2 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-white">Number</label>
          <input
            type="text"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            className="border border-gray-300 p-2 rounded"
            required
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Submit
        </button>
      </form>
      
      <div className='text-white mt-4'>
        <button onClick={handleDisplay} className="bg-blue-500 text-white p-2 rounded">Display</button>
        {display && (
          <div>
            <h2 className="text-xl mt-4">Display Data:</h2>
            <div className="mt-2">
              <p><strong>Name:</strong> {display.name}</p>
              <p><strong>Number:</strong> {display.number}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactForm;
