import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import HomePage from './pages/HomePage'
import CatalogPage from './pages/CatalogPage'
import AdminPage from './pages/AdminPage'
import LandingPage from './pages/LandingPage'
import FAQPage from './pages/FAQPage'
import AccessibilityPage from './pages/AccessibilityPage'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ItemModal from './components/ItemModal'
import FloatingWhatsApp from './components/FloatingWhatsApp'
import AccessibilityMenu from './components/AccessibilityMenu'
import Analytics from './components/Analytics'

export default function App() {
  const [selectedItem, setSelectedItem] = useState(null)
  const { pathname } = useLocation()
  const isFirstRender = useRef(true)

  // On client-side navigation, reset scroll and move focus to the page content (WCAG 2.4.3).
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }
    window.scrollTo(0, 0)
    document.getElementById('main-content')?.focus({ preventScroll: true })
  }, [pathname])

  const skipToContent = (e) => {
    e.preventDefault()
    const main = document.getElementById('main-content')
    main?.focus()
    main?.scrollIntoView()
  }

  return (
    <div className="min-h-screen flex flex-col bg-cream-50" dir="rtl">
      <a href="#main-content" onClick={skipToContent} className="skip-link">
        דלג לתוכן הראשי
      </a>
      <Analytics />
      <Navbar />

      <main id="main-content" tabIndex={-1} className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage onItemClick={setSelectedItem} />} />
          <Route path="/catalog" element={<CatalogPage onItemClick={setSelectedItem} />} />
          <Route path="/dress-rental-harish" element={<LandingPage type="/dress-rental-harish" />} />
          <Route path="/women-evening-dresses-harish" element={<LandingPage type="/women-evening-dresses-harish" />} />
          <Route path="/girls-dresses-harish" element={<LandingPage type="/girls-dresses-harish" />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/accessibility" element={<AccessibilityPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <Footer />
      <FloatingWhatsApp />
      <AccessibilityMenu />

      {selectedItem && (
        <ItemModal item={selectedItem} onClose={() => setSelectedItem(null)} />
      )}
    </div>
  )
}
