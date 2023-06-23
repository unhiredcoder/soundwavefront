import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';


const Register = () => {
  const [username, setUsername] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedAudio, setSelectedAudio] = useState(null);
  const navigate = useNavigate();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
  };

  const handleAudioChange = (event) => {
    const file = event.target.files[0];
    setSelectedAudio(file);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    savedata.innerText = "Submitting..."
    savedata.disabled = true

    try {
      const formData = new FormData();
      formData.append('username', username);
      formData.append('image', selectedImage);
      formData.append('audio', selectedAudio);

      const options = {
        method: 'POST',
        body: formData,
      };

      let response = await fetch('http://localhost:4000/upload', options);
      if (!response.ok) {
        savedata.innerText = "Submit"
        alert("Please fill all the fields!")
        throw new Error('Error uploading image and audio.');
      }

      response = await response.json();
      savedata.innerText = "Submit"

      console.log('Image and audio uploaded successfully.');
      console.log('Response:', response);
      navigate('/');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
      <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', minHeight: '70vh' }}>
        <h1 className='text-xl text-red-500 font-bold text-center '>Upload Your Image and Audio Here*</h1>
        <form onSubmit={handleSubmit} className='container mt-12 max-w-md mx-auto bg-white p-4 rounded shadow'>
          <div className='mb-4'>
            <label htmlFor='username' className='block text-gray-700 font-bold mb-2'>
              Song Name:
            </label>
            <input
              type='text'
              id='username'
              value={username}
              onChange={handleUsernameChange}
              className='w-full border border-gray-300 rounded px-3 py-2'
            />
          </div>
          <div className='mb-4'>
            <label htmlFor='image' className='block text-gray-700 font-bold mb-2'>
              Image:
            </label>
            <input
              type='file'
              id='image'
              accept='image/*'
              onChange={handleImageChange}
              className='border border-gray-300 rounded px-3 py-2'
            />
          </div>
          <div className='mb-4'>
            <label htmlFor='audio' className='block text-gray-700 font-bold mb-2'>
              Audio:
            </label>
            <input
              type='file'
              id='audio'
              accept='audio/*'
              onChange={handleAudioChange}
              className='border border-gray-300 rounded px-3 py-2'
            />
          </div>
          <button type='submit' id='savedata' className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
            Submit
          </button>
        </form>
      </motion.div>
      <center>
        <Link style={{ position: "absolute", bottom: 0, left: 0 }} className="text-bold text-2xl bg-red-400 w-full font-bold py-2" to="/">Go Back</Link>
      </center>
    </>
  );
};

export default Register;
