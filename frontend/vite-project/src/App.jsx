
import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast';
import Homepage from './pages/Homepage'
import CreatePage from './pages/CreatePage'
import DetailPage from './pages/DetailPage'

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/note/:id" element={<DetailPage />} />
      </Routes>
      <Toaster />
    </>
  )
}

export default App;
