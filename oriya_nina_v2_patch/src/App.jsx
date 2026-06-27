import { Routes, Route, Navigate } from 'react-router-dom'
import { useState } from 'react'
import HomePage from './pages/HomePage'
import CatalogPage from './pages/CatalogPage'
import AdminPage from './pages/AdminPage'
import LandingPage from './pages/LandingPage'
import FAQPage from './pages/FAQPage'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ItemModal from './components/ItemModal'
import FloatingWhatsApp from './components/FloatingWhatsApp'

export default function App() {
  const [selectedItem, setSelectedItem] = useState(null)

  return (
    <div className="min-h-screen flex flex-col bg-cream-50" dir="rtl">
      <Navbar />
      
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage onItemClick={setSelectedItem} />} />
          <Route path="/catalog" element={<CatalogPage onItemClick={setSelectedItem} />} />
          <Route path="/dress-rental-harish" element={<LandingPage type="/dress-rental-harish" />} />
          <Route path="/women-evening-dresses-harish" element={<LandingPage type="/women-evening-dresses-harish" />} />
          <Route path="/girls-dresses-harish" element={<LandingPage type="/girls-dresses-harish" />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <Footer />
      <FloatingWhatsApp />

      {selectedItem && (
        <ItemModal item={selectedItem} onClose={() => setSelectedItem(null)} />
      )}
    </div>
  )
}
