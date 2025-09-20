import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import RateLimitWarning from '../components/RateLimitWarning';
import axios from 'axios'; // Import axios
import toast from 'react-hot-toast'; // Import toast

const Homepage = () => {
  const [isLimitReached, setIsLimitReached] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this note?')) {
      return;
    }
    try {
      await axios.delete(`/api/notes/${id}`);
      setNotes(notes.filter(note => note._id !== id));
      toast.success('Note deleted successfully!');
    } catch (err) {
      console.error('Error deleting note:', err);
      toast.error('Failed to delete note.');
    }
  };

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await axios.get('/api/notes');
        setNotes(response.data);
        setIsLimitReached(false); // Reset if successful
      } catch (err) {
        if (err.response && err.response.status === 429) {
          setIsLimitReached(true);
        } else {
          setError('Failed to fetch notes.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 font-sans">
      <nav className="bg-white shadow-lg p-4 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0 sticky top-0 z-10">
        <Link to="/" className="text-3xl font-extrabold text-blue-700 hover:text-blue-900 transition duration-300">
          MERN Thinkboard
        </Link>
        <Link to="/create" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-5 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 w-full md:w-auto text-center">
          Create New Note
        </Link>
      </nav>

      <RateLimitWarning isLimitReached={isLimitReached} />

      <div className="container mx-auto p-6 lg:p-10">
        <h1 className='text-4xl font-extrabold text-gray-900 mb-8 text-center'>Your Thoughtboard</h1>
        {
          loading ? (
            <p className="text-center text-gray-600 text-lg">Loading notes...</p>
          ) : error ? (
            <p className="text-center text-red-600 text-lg">Error: {error}</p>
          ) : (
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b-2 border-blue-300 pb-2">All Notes</h2>
              {
                notes.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {notes.map(note => (
                      <div key={note._id} className="bg-white p-6 rounded-xl shadow-xl hover:shadow-2xl transition duration-300 ease-in-out flex flex-col justify-between border border-gray-100 transform hover:-translate-y-1">
                        <Link to={`/note/${note._id}`} className="flex-grow block cursor-pointer group">
                          <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-700 transition duration-300 break-words">{note.title}</h3>
                          <p className="text-gray-700 text-base mb-4 flex-grow line-clamp-4 break-words">{note.content}</p>
                        </Link>
                        <button
                          onClick={() => handleDelete(note._id)}
                          className="mt-4 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 ease-in-out shadow-md hover:shadow-lg"
                        >
                          Delete Note
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-gray-600 text-lg">No notes available. Click 'Create New Note' to add one!</p>
                )
              }
            </div>
          )
        }
      </div>
    </div>
  );
};

export default Homepage;
