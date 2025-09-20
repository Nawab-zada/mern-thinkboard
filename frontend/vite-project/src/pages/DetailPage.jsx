import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const DetailPage = () => {
  const { id } = useParams();
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const response = await axios.get(`http://localhost:5010/api/notes/${id}`);
        setNote(response.data);
      } catch (err) {
        console.error('Error fetching note:', err);
        setError('Failed to fetch note details.');
        toast.error('Failed to load note.');
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [id]);

  if (loading) {
    return <div className="min-h-screen bg-gray-100 flex items-center justify-center"><p>Loading note...</p></div>;
  }

  if (error) {
    return <div className="min-h-screen bg-gray-100 flex items-center justify-center"><p className="text-red-500">Error: {error}</p></div>;
  }

  if (!note) {
    return <div className="min-h-screen bg-gray-100 flex items-center justify-center"><p>Note not found.</p></div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4 font-sans">
      <div className="bg-white p-8 md:p-10 rounded-xl shadow-2xl w-full max-w-3xl transform hover:scale-105 transition duration-300">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 text-center break-words leading-tight">{note.title}</h1>
        <p className="text-gray-700 text-lg md:text-xl leading-relaxed mb-8 border-t border-b border-gray-200 py-6 break-words whitespace-pre-wrap">{note.content}</p>
        <Link to="/" className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105">
          ← Back to Homepage
        </Link>
      </div>
    </div>
  );
};

export default DetailPage;
