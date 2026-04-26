import { Routes, Route, Navigate } from 'react-router-dom'
import { useState } from 'react'
import HomePage from './pages/HomePage'
import CatalogPage from './pages/CatalogPage'
import AdminPage from './pages/AdminPage'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ItemModal from './components/ItemModal'
import { isAdminLoggedIn } from './lib/supabase'

export default function App() {
  const [selectedItem, setSelectedItem] = useState(null)

  return (
    <div className="min-h-screen flex flex-col bg-cream-50" dir="rtl">
      <Navbar />
      
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage onItemClick={setSelectedItem} />} />
          <Route path="/catalog" element={<CatalogPage onItemClick={setSelectedItem} />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <Footer />

      {selectedItem && (
        <ItemModal item={selectedItem} onClose={() => setSelectedItem(null)} />
      )}
    </div>
  )
}
