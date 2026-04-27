import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import ItemCard from '../components/ItemCard'
import { fetchItems } from '../lib/supabase'
import { Sparkles, Crown, Gem } from 'lucide-react'

export default function HomePage({ onItemClick }) {
  const [featured, setFeatured] = useState([])
  const [loading, setLoading] = useState(true)

  const videos = ['/hero1.mp4', '/hero2.mp4', '/hero3.mp4']
  const [currentVideo, setCurrentVideo] = useState(0)

  useEffect(() => {
    fetchItems()
      .then(data => setFeatured((data || []).slice(0, 8)))
      .catch(() => setFeatured([]))
      .finally(() => setLoading(false))
  }, [])

  const handleVideoEnd = () => {
    setCurrentVideo((prev) => (prev + 1) % videos.length)
  }

  return (
    <div className="bg-[#fffaf5] text-stone-900">

      {/* HERO */}
      <section className="relative h-screen overflow-hidden">

        {/* ?? ????? */}
        <video
          key={currentVideo}
          autoPlay
          muted
          playsInline
          onEnded={handleVideoEnd}
          className="absolute w-full h-full object-cover"
        >
          <source src={videos[currentVideo]} type="video/mp4" />
        </video>

        {/* ???? ???? */}
        <div className="absolute inset-0 bg-black/60" />

        {/* HEADER */}
        <div className="absolute top-12 w-full text-center z-10 animate-fade-in">

          <h1 className="text-5xl md:text-6xl font-display tracking-[0.35em] text-white drop-shadow-lg">
            ORIYA NINA
          </h1>

          <p className="text-gold-300 text-xs md:text-sm tracking-[0.6em] mt-4 uppercase">
            LUXURY EVENING DRESSES
          </p>

        </div>

        {/* CONTENT */}
        <div className="relative z-10 h-full flex flex-col justify-end pb-32 items-center text-center px-6 text-white">

          <p className="text-lg md:text-xl text-stone-200 max-w-xl mb-10 leading-relaxed animate-slide-up">
            ?????? ?????? ????? ??? ?????? ????????? ?????? ????? ??? ?????
          </p>

          <div className="flex gap-4 flex-wrap justify-center">

            <Link
              to="/catalog"
              className="bg-gold-500 hover:bg-gold-600 text-white px-8 py-3 rounded-full font-semibold transition transform hover:scale-105 shadow-xl"
            >
              ?????? ??????
            </Link>

            <a
              href="https://wa.me/972506386895"
              className="border border-white px-8 py-3 rounded-full hover:bg-white hover:text-black transition transform hover:scale-105"
            >
              ????? ?????
            </a>

          </div>

        </div>

      </section>

      {/* ?? ????? ?????? */}
      <section className="py-24 px-6 text-center bg-[#FFF5F2]">

        <h2 className="text-3xl md:text-4xl font-display text-gold-500 mb-14 tracking-wide">
          ????? ??????
        </h2>

        <div className="max-w-4xl mx-auto bg-white rounded-[30px] shadow-2xl p-10 border border-[#f3e5dc] animate-scale-in">

          <div className="flex justify-center gap-6 mb-8 text-gold-500">
            <Crown size={32} />
            <Gem size={32} />
            <Sparkles size={32} />
          </div>

          <h3 className="text-2xl md:text-3xl font-display mb-6">
            ?????? ????? ???????
          </h3>

          <p className="text-gray-600 mb-6 text-lg leading-relaxed">
            ?????? ?????? ????? ??? ?????? ????????? ?????? ????? ??? ?????
          </p>

          <div className="space-y-3 text-gray-800 text-base">

            <p>
              <span className="text-gold-500 font-semibold">???? ?????:</span> 300? ???? (???? ????? ???)
            </p>

            <p>????? ??? ????? | ????? ???</p>

            <p className="text-gold-500 font-semibold">
              ???! ????? ?? ????? ¨C 200? ????
            </p>

          </div>

          <p className="text-sm text-gray-400 mt-6">
            *????? ???? ???? ???????
          </p>

          <div className="mt-10">
            <a
              href="https://wa.me/972506386895"
              className="bg-gradient-to-r from-[#C9A55A] to-[#E8CFA0] text-white px-10 py-4 rounded-full text-lg font-semibold shadow-lg hover:scale-105 transition"
            >
              ????? ????? ?????
            </a>
          </div>

        </div>
      </section>

      {/* ????? */}
      <section className="py-24 px-6 max-w-7xl mx-auto">

        <div className="text-center mb-14">
          <p className="text-gold-500 mb-2 tracking-widest">BEST PICKS</p>
          <h2 className="text-4xl font-display">????? ??????</h2>
        </div>

        {loading ? (
          <div className="text-center py-16">????...</div>
        ) : featured.length === 0 ? (
          <div className="text-center text-stone-400 py-16">??? ?????? ?????</div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {featured.map(item => (
              <ItemCard key={item.id} item={item} onClick={onItemClick} />
            ))}
          </div>
        )}

        <div className="text-center mt-12">
          <Link
            to="/catalog"
            className="border border-gold-500 text-gold-500 px-8 py-3 rounded-full hover:bg-gold-500 hover:text-white transition"
          >
            ??? ??????
          </Link>
        </div>

      </section>

    </div>
  )
}