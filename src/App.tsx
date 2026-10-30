import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { MessageCircle } from 'lucide-react'
import Nav from './components/Nav'
import Footer from './components/Footer'
import Home from './pages/Home'
import Properties from './pages/Properties'
import PropertyDetail from './pages/PropertyDetail'
import Services from './pages/Services'
import About from './pages/About'
import Contact from './pages/Contact'
import Saved from './pages/Saved'
import { WHATSAPP } from './lib/data'
import { FavoritesProvider } from './lib/favorites'
import { ContentProvider } from './lib/content-context'

export default function App() {
  return (
    <FavoritesProvider>
      <ContentProvider>
        <BrowserRouter>
        <div className="min-h-screen">
          <Nav />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/properties" element={<Properties />} />
              <Route path="/property/:slug" element={<PropertyDetail />} />
              <Route path="/services" element={<Services />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/saved" element={<Saved />} />
              <Route path="*" element={<Home />} />
            </Routes>
          </main>
          <Footer />

          <a
            href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent('Assalam o Alaikum! Pak Property Point se rabta kar raha hoon.')}`}
            target="_blank"
            rel="noreferrer"
            aria-label="Chat on WhatsApp"
            className="fixed bottom-6 right-6 z-40 grid h-14 w-14 place-items-center rounded-full bg-accent text-[#04130e] shadow-[0_18px_40px_-14px_rgba(58,214,164,0.8)] transition-transform duration-300 hover:scale-110"
          >
            <MessageCircle size={24} />
          </a>
        </div>
        </BrowserRouter>
      </ContentProvider>
    </FavoritesProvider>
  )
}
