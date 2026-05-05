import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Conclusiones from './pages/Conclusiones'
import SubtemaDetalle from './pages/SubtemaDetalle'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="conclusiones" element={<Conclusiones />} />
          <Route path="reflexion" element={<Navigate to="/conclusiones" replace />} />
          <Route path="subtema/:id" element={<SubtemaDetalle />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
