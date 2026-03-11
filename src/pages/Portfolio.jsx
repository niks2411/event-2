import { useState } from 'react';
import useReveal from '../hooks/useReveal';
import SmartVideo from '../components/ui/SmartVideo';
import OptimizedImage from '../components/ui/OptimizedImage';

const categories = ['All', 'Weddings', 'Engagement', 'Haldi', 'Cinematic Reels', 'Fireworks'];

const portfolioItems = [
    { src: '/SnapInsta.to_368252794_18295230007186235_579421688051440182_n_750.jpg', cat: 'Weddings', title: 'Regal Wedding Decor', h: 'h-80' },
    { src: '/SnapInsta.to_AQM6VnEsQ6clqRYP_qzysG-ENkXB_krSW9Ejn0b5WedrVjORk3BJqA0ukD1n0txwzGaFRIExEZxIyratigGhmu60rdnoZW8RmMKyNww.mp4', cat: 'Cinematic Reels', title: 'Grand Celebration Highlight', h: 'h-[400px]', isVideo: true, poster: '/SnapInsta.to_368252794_18295230007186235_579421688051440182_n_750.jpg' },
    { src: '/SnapInsta.to_378181396_18298849789186235_4370895842433673534_n_750.jpg', cat: 'Engagement', title: 'Romantic Setup', h: 'h-64' },
    { src: '/SnapInsta.to_AQNbH72OQNrL2bbZOfLaEjoMa53v05GZtYoFxEnfUKLUWWXiNlrSnIAgjoXAgQjAcUDM32gWvq5m9umKLOuwYKhRbht2GsGySijNceM.mp4', cat: 'Cinematic Reels', title: 'Wedding Magic', h: 'h-[400px]', isVideo: true, poster: '/SnapInsta.to_378181396_18298849789186235_4370895842433673534_n_750.jpg' },
    { src: '/SnapInsta.to_469014936_18381580087097874_4466348175444016484_n.jpg', cat: 'Weddings', title: 'Luxury Mantle', h: 'h-72' },
    { src: '/SnapInsta.to_AQOOgJma500Ss5aPYz-Pk-VShloEXDErUz9M0BCyjE2dQq28ltaa03EZeV1gPRim812DM8Z72X42gSqGYi2cnW4W.mp4', cat: 'Cinematic Reels', title: 'Reception Highlights', h: 'h-[400px]', isVideo: true, poster: '/SnapInsta.to_469014936_18381580087097874_4466348175444016484_n.jpg' },
    { src: '/SnapInsta.to_469184825_18381580297097874_8533222688974240097_n_750.jpg', cat: 'Weddings', title: 'Evening Vibe', h: 'h-64' },
    { src: '/SnapInsta.to_471711385_18475536073002324_6102271118363019889_n_750.jpg', cat: 'Haldi', title: 'Vibrant Haldi Decor', h: 'h-80' },
    { src: '/SnapInsta.to_471969805_18475535794002324_320309082959194364_n_750.jpg', cat: 'Weddings', title: 'Grand Entry', h: 'h-72' },
    { src: '/SnapInsta.to_514565952_18564927139058263_1903189261584178576_n_750.jpg', cat: 'Weddings', title: 'Elegant Frame', h: 'h-64' },
    { src: '/SnapInsta.to_582015082_18541259023021250_1273442079057468699_n_750.jpg', cat: 'Haldi', title: 'Bloom Ceremony', h: 'h-72' },
    { src: '/SnapInsta.to_625047285_18111301408629000_689735211486510512_n_750.jpg', cat: 'Weddings', title: 'Traditional Detail', h: 'h-80' },
];

export default function Portfolio() {
    const revealRef = useReveal();
    const [active, setActive] = useState('All');
    const [lightbox, setLightbox] = useState(null);

    const filtered = active === 'All' ? portfolioItems : portfolioItems.filter((item) => item.cat === active);

    return (
        <div ref={revealRef}>
            {/* Hero */}
            <section className="hero-page relative h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0"
                    style={{
                        backgroundImage: `url('https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1920&h=800&fit=crop')`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-charcoal/80 via-charcoal/50 to-charcoal/70" />
                <div className="gradient-orb gradient-orb-gold w-80 h-80 bottom-10 left-10 animate-orb-float" />
                <div className="relative z-10 text-center px-4">
                    <div className="ornament-line mb-4 animate-fade-in">
                        <span className="ornament" />
                    </div>
                    <p className="text-gold text-sm tracking-[0.4em] uppercase mb-3 animate-fade-in" style={{ fontFamily: 'var(--font-accent)' }}>Our Work</p>
                    <h1 className="text-4xl md:text-6xl font-bold text-white animate-slide-up" style={{ fontFamily: 'var(--font-heading)' }}>
                        Portfolio <span className="gold-text italic">Showcase</span>
                    </h1>
                </div>
            </section>

            {/* Gallery Section */}
            <section className="py-20 bg-cream">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Categories */}
                    <div className="flex flex-wrap justify-center gap-4 mb-16 reveal">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActive(cat)}
                                className={`px-8 py-2.5 rounded-full text-xs font-bold tracking-widest uppercase transition-all duration-300
                                    ${active === cat
                                        ? 'bg-gold text-white shadow-lg shadow-gold/20 scale-105'
                                        : 'bg-white text-charcoal border border-gold/10 hover:border-gold/30 hover:bg-gold/5'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {/* Masonry Gallery */}
                    <div className="masonry-grid">
                        {filtered.map((item, i) => (
                            <div
                                key={(item.id || item.src) + i}
                                className={`img-zoom rounded-2xl overflow-hidden shadow-md hover:shadow-2xl group cursor-pointer relative ${item.h}
                                    transition-all duration-500 bg-charcoal/5`}
                                onClick={() => setLightbox(item)}
                            >
                                {item.isVideo ? (
                                    <SmartVideo
                                        id={item.id}
                                        src={item.src}
                                        poster={item.poster}
                                        label={item.title}
                                    />
                                ) : (
                                    <OptimizedImage
                                        src={item.src}
                                        alt={item.title}
                                        className="w-full h-full"
                                        containerClassName="h-full"
                                    />
                                )}
                                <div className="img-overlay">
                                    <span className="text-gold text-xs tracking-wider uppercase mb-1">{item.cat}</span>
                                    <span className="text-white font-bold text-lg" style={{ fontFamily: 'var(--font-heading)' }}>{item.title}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Lightbox */}
            {lightbox && (
                <div className="lightbox-overlay" onClick={() => setLightbox(null)}>
                    <button
                        className="absolute top-6 right-6 text-white/60 hover:text-white text-2xl z-10 w-10 h-10 rounded-full
                            border border-white/20 flex items-center justify-center hover:bg-white/10 transition-all duration-300"
                        onClick={() => setLightbox(null)}
                    >
                        ✕
                    </button>
                    <div className="max-w-4xl w-full p-4 flex flex-col items-center" onClick={(e) => e.stopPropagation()}>
                        {lightbox.isVideo ? (
                            <div className="w-full aspect-[9/16] max-h-[85vh] rounded-xl overflow-hidden shadow-2xl border-4 border-white/5 bg-black">
                                {lightbox.id ? (
                                    <iframe
                                        src={`https://www.youtube.com/embed/${lightbox.id}?autoplay=1&controls=1&rel=0`}
                                        className="w-full h-full"
                                        title={lightbox.title}
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    />
                                ) : (
                                    <video
                                        src={lightbox.src}
                                        className="w-full h-full object-cover"
                                        autoPlay
                                        controls
                                        playsInline
                                    />
                                )}
                            </div>
                        ) : (
                            <OptimizedImage src={lightbox.src} alt={lightbox.title} className="max-h-[75vh] w-auto rounded-xl shadow-2xl" priority />
                        )}
                        <div className="text-center mt-6">
                            <h4 className="text-white text-2xl font-bold" style={{ fontFamily: 'var(--font-heading)' }}>{lightbox.title}</h4>
                            <p className="text-gold text-sm tracking-widest uppercase mt-2 font-bold">{lightbox.cat}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
