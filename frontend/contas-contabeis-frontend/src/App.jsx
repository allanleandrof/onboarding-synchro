import React from 'react'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import CreatePage from './pages/CreatePage';
import ListPage from './pages/ListPage';
import EditPage from './pages/EditPage';
import HistoricoPage from './pages/HistoricoPage';

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/create" element={<CreatePage />} />
          <Route path="/list" element={<ListPage />} />
          <Route path="/editar/:id" element={<EditPage />} />
          <Route path="/historico" element={<HistoricoPage />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App