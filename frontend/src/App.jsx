import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Layout } from './components/layout/Layout'
import { HomePage } from './pages/HomePage'
import { ResultsPage } from './pages/ResultsPage'
import { ComparePage } from './pages/ComparePage'
import { AboutPage } from './pages/AboutPage'

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/resultados" element={<ResultsPage />} />
          <Route path="/comparar" element={<ComparePage />} />
          <Route path="/acerca-de" element={<AboutPage />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
