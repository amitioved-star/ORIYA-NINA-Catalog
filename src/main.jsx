import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'

/* 🔥 פונקציית מעקב גלובלית */
window.trackEvent = (name, params = {}) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', name, params)
  } else {
    console.warn('Analytics not loaded yet')
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)