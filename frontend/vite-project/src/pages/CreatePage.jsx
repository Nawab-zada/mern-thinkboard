import React, { useState } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios'; // Import axios
import { useNavigate } from 'react-router-dom';

const CreatePage = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !content) {
      toast.error('Please fill in both title and content.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5010/api/notes', {
        title,
        content,
      });
      toast.success('Note created successfully!');
      setTitle('');
      setContent('');
      console.log('Note created:', response.data);
      navigate('/'); // Redirect to homepage
    } catch (error) {
      console.error('Error creating note:', error);
      toast.error('Failed to create note.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4 font-sans">
      <div className="bg-white p-8 md:p-10 rounded-xl shadow-2xl w-full max-w-lg transform hover:scale-105 transition duration-300">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-8 text-center">Create Your Note</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-2">Note Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base transition duration-200"
              placeholder="e.g., Meeting Summary"
            />
          </div>
          <div>
            <label htmlFor="content" className="block text-sm font-semibold text-gray-700 mb-2">Note Content</label>
            <textarea
              id="content"
              name="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows="7"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base transition duration-200"
              placeholder="Write your note content here..."
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Create Note
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePage;
