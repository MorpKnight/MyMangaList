import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddMediaPage = () => {
  const [formData, setFormData] = useState({
    title: '',
    type: '',
    author: '',
    artist: '',
    genre: [],
    description: '',
    release_date: '',
    status: '',
    score: 0,
    reviewed_by: 0,
    image_cover: ''
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'genre') {
      setFormData(prevState => ({
        ...prevState,
        [name]: [...prevState.genre, value]
      }));
    } else {
      setFormData(prevState => ({
        ...prevState,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/home/add', formData);
      navigate('/home');
    } catch (error) {
      console.error('Failed to add media', error);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100">
      <main className="w-4/5 max-w-5xl mt-20">
        <h1 className="text-3xl font-bold mb-4">Add New Media</h1>
        <form onSubmit={handleSubmit} className="mb-6">
          <div className="mb-3">
            <label htmlFor="title" className="block mb-2 text-sm font-medium">Title:</label>
            <input type="text" id="title" name="title" value={formData.title} onChange={handleInputChange} required className="border p-2 w-full"/>
          </div>
          <div className="mb-3">
            <label htmlFor="author" className="block mb-2 text-sm font-medium">Author:</label>
            <input type="text" id="author" name="author" value={formData.author} onChange={handleInputChange} required className="border p-2 w-full"/>
          </div>
          <div className="mb-3">
            <label htmlFor="artist" className="block mb-2 text-sm font-medium">Artist:</label>
            <input type="text" id="artist" name="artist" value={formData.artist} onChange={handleInputChange} className="border p-2 w-full"/>
          </div>
          <div className="mb-3">
            <label htmlFor="type" className="block mb-2 text-sm font-medium">Type:</label>
            <select id="type" name="type" value={formData.type} onChange={handleInputChange} required className="border p-2 w-full">
              <option value="">Select Type</option>
              <option value="Manga">Manga</option>
              <option value="Manhwa">Manhwa</option>
              <option value="Novel">Novel</option>
              <option value="Light Novel">Light Novel</option>
              <option value="Visual Novel">Visual Novel</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="block mb-2 text-sm font-medium">Description:</label>
            <input type="text" id="description" name="description" value={formData.description} onChange={handleInputChange} required className="border p-2 w-full"/>
          </div>
          <div className="mb-3">
            <label htmlFor="genre" className="block mb-2 text-sm font-medium">Genre:</label>
            <select id="genre" name="genre" value={formData.genre} onChange={handleInputChange} required className="border p-2 w-full">
            <option value="">Select Genre</option>
              <option value="Action">Action</option>
              <option value="Adventure">Adventure</option>
              <option value="Comedy">Comedy</option>
              <option value="Drama">Drama</option>
              <option value="Fantasy">Fantasy</option>
              <option value="Horror">Horror</option>
              <option value="Mystery">Mystery</option>
              <option value="Psycological">Psycological</option>
              <option value="Romance">Romance</option>
              <option value="Sci-Fi">Sci-Fi</option>
              <option value="Slice of Life">Slice of Life</option>
              <option value="Supernatural">Supernatural</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="release_date" className="block mb-2 text-sm font-medium">Release Date:</label>
              <input type="date" id="release_date" name="release_date" value={formData.release_date} onChange={handleInputChange} className="border p-2 w-full"/>
          </div>
          <div className="mb-3">
            <label htmlFor="status" className="block mb-2 text-sm font-medium">Status:</label>
            <select id="status" name="status" value={formData.status} onChange={handleInputChange} required className="border p-2 w-full">
              <option value="">Select Status</option>
              <option value="Manga">Ongoing</option>
              <option value="Manhwa">Completed</option>
              <option value="Novel">Hiatus</option>
              <option value="Light Novel">Cancelled</option>
              <option value="Visual Novel">Upcoming</option>
            </select>
          </div>
          <button type="submit" className="bg-red-600 hover:bg-[#7e2d24] text-white font-bold py-2 px-4 rounded">Submit</button>
        </form>
      </main>
    </div>
  );
};

export default AddMediaPage;

