import React from 'react'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import CreatePage from './pages/CreatePage';
import ListPage from './pages/ListPage';
import EditPage from './pages/EditPage';

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/create" element={<CreatePage />} />
          <Route path="/list" element={<ListPage />} />
          <Route path="/editar/:id" element={<EditPage />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App