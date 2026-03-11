import { useState, useEffect } from 'react';
import useReveal from '../hooks/useReveal';
import useCounter from '../hooks/useCounter';
import { Link } from 'react-router-dom';
import Lightbox from '../components/ui/Lightbox';
import SmartVideo from '../components/ui/SmartVideo';
import OptimizedImage from '../components/ui/OptimizedImage';
import { Skiper30 } from '../components/ui/Skiper30';
import { AnimatePresence, motion } from 'framer-motion';

const servicesList = [
    { title: 'Venue Suggestion', badge: 'V', img: '/SnapInsta.to_368252794_18295230007186235_579421688051440182_n_750.jpg', desc: 'Finding the perfect backdrop for your love story, from royal palaces to serene beaches.' },
    { title: 'Dream Decor next to Heaven', badge: 'D', img: '/SnapInsta.to_378181396_18298849789186235_4370895842433673534_n_750.jpg', desc: 'Transforming spaces into ethereal landscapes with celestial decor and floral artistry.' },
    { title: 'Creative Wedding Stationary', badge: 'S', img: '/SnapInsta.to_469014936_18381580087097874_4466348175444016484_n.jpg', desc: 'Bespoke invitations and event stationery that tell your unique story beautifully.' },
    { title: 'Luxe and Hospitality', badge: 'L', img: '/a3de815c7a261b7cedab7faa9daad714.jpg', desc: 'Premium guest management and luxury hospitality experiences for a seamless event.' },
    { title: 'Bar Management', badge: 'B', img: '/28aa63b5324a872840a1b8f1065e21fe.jpg', desc: 'Curated cocktail menus and professional bar services for a spirited celebration.' },
    { title: 'Make-up Artist', badge: 'M', img: '/b3ccf773fd05d61998269785d2404380.jpg', desc: 'Professional bridal makeup and styling to make you shine on your special day.' },
    { title: 'A-Listing Choreography', badge: 'C', img: '/Bd.webp', desc: 'Grand Sangeet performances with professional choreography and stage management.' },
    { title: 'Celebrity Engagement & Artist Management', badge: 'A', img: '/ba2e2214fee77f3228b4c0405e87e42a.jpg', desc: 'Booking top-tier artists and managing celebrity appearances for a star-studded event.' },
    { title: 'Catering to Perfection', badge: 'F', img: '/8d1ae6c2e50b7eaa8adbb061d6420192.jpg', desc: 'Gourmet dining experiences and world-class catering solutions for your guests.' },
    { title: 'Artists for your Mehendi Needs', badge: 'H', img: '/747e3166a39f28fdcd00fe2b7fe29b7a.jpg', desc: 'Intricate Mehendi designs by expert artists for a beautiful traditional touch.' },
    { title: 'Experiential Elements', badge: 'X', img: '/79c2b2bf4b2822b47057a1f8abdb9c72.jpg', desc: 'Unique interactive elements and experiential setups that create a "wow" factor.' },
    { title: 'Photography & Films', badge: 'P', img: '/SnapInsta.to_469184825_18381580297097874_8533222688974240097_n_750.jpg', desc: 'Capturing timeless moments with world-class photography and cinematic films.' },
];

const heroSlides = [
    '/nano-banana-bg.png', // New premium landscape image
    '/homebg.webp',
    '/homebg2.webp',
    '/SnapInsta.to_625047285_18111301408629000_689735211486510512_n_750.jpg'
];

// galleryImages removed - now handled in Skiper30 component

const testimonials = [
    { name: 'Priya & Rahul Sharma', role: 'Wedding — Mumbai', rating: 5, text: 'LRWC made our wedding absolutely magical. Every detail was perfect, from the floral arrangements to the fireworks finale. Our guests are still talking about it!' },
    { name: 'Ananya & Vikrant Patel', role: 'Engagement — Delhi', rating: 5, text: 'The most romantic engagement ceremony we could have imagined. The team captured our story beautifully and created an atmosphere that was pure magic.' },
    { name: 'Vikram Enterprises', role: 'Corporate Gala — Bangalore', rating: 5, text: 'Professional, creative, and absolutely flawless execution. Our annual gala was transformed into a world-class event that elevated our brand image.' },
];

const whyUs = [
    { num: '✔', title: 'Professional Team', desc: 'Expert wedding planning team dedicated to your vision.' },
    { num: '✔', title: 'Creative Decor', desc: 'Unique theme styling and stunning decor concepts.' },
    { num: '✔', title: 'Seamless Execution', desc: 'Flawless on-ground management for a stress-free day.' },
    { num: '✔', title: 'Full Entertainment', desc: 'DJ, Anchor, and curated entertainment solutions.' },
    { num: '✔', title: 'Photography', desc: 'High-quality cinematic films and professional photography.' },
    { num: '✔', title: 'Guest Management', desc: 'Professional hospitality and seating management.' },
    { num: '✔', title: 'Special Effects', desc: 'Luxury SFX and grand entry concepts for magical moments.' },
    { num: '✔', title: 'Experiences', desc: 'We don’t just plan events — we create lifelong experiences.' },
];

const workingProcess = [
    { step: '1', title: 'Consultation', desc: 'We understand your vision, budget and expectations.' },
    { step: '2', title: 'Planning', desc: 'We design themes, timelines and execution strategy.' },
    { step: '3', title: 'Execution', desc: 'Our team manages everything on-ground smoothly.' },
    { step: '4', title: 'Celebration', desc: 'You enjoy your day — we handle the rest.' },
];

const reels = [
    { src: '/video1.mp4', label: 'Grand Celebration', poster: '/venue-suggestion.png' },
    { src: '/video2.mp4', label: 'Wedding Magic', poster: '/dream-decor.png' },
    { src: '/video3.mp4', label: 'Reception Night', poster: '/photography-new.png' },
];

export default function Home() {
    const revealRef = useReveal();
    const [ref1, count1] = useCounter(100);
    const [ref2, count2] = useCounter(5);
    const [ref3, count3] = useCounter(100);

    const [activeGallery, setActiveGallery] = useState(null);
    const [photoIndex, setPhotoIndex] = useState(0);
    const [currentSlide, setCurrentSlide] = useState(0);

    // Hero Background Slideshow Loop
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
        }, 8000);
        return () => clearInterval(timer);
    }, []);

    // Keyboard controls for lightbox
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (!activeGallery) return;
            if (e.key === 'Escape') setActiveGallery(null);
            if (e.key === 'ArrowRight') handleNext();
            if (e.key === 'ArrowLeft') handlePrev();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [activeGallery, photoIndex]);

    const handleNext = () => {
        if (!activeGallery) return;
        setPhotoIndex((prev) => (prev + 1) % activeGallery.gallery.length);
    };

    const handlePrev = () => {
        if (!activeGallery) return;
        setPhotoIndex((prev) => (prev - 1 + activeGallery.gallery.length) % activeGallery.gallery.length);
    };

    const openGallery = (s) => {
        if (s.gallery && s.gallery.length > 0) {
            setActiveGallery(s);
            setPhotoIndex(0);
        }
    };

    return (
        <div ref={revealRef}>
            {/* ═══════════ HERO SECTION ═══════════ */}
            <section className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
                {/* Background Slideshow */}
                <div className="absolute inset-0 bg-charcoal">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentSlide}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ 
                                opacity: { duration: 1.5, ease: "easeInOut" }
                            }}
                            className="absolute inset-0"
                            style={{
                                backgroundImage: `url('${heroSlides[currentSlide]}')`,
                                backgroundSize: '100% 100%',
                                backgroundPosition: 'center',
                            }}
                        />
                    </AnimatePresence>
                    <div className="absolute inset-0 bg-black/40" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40" />
                </div>

                <div className="gradient-orb gradient-orb-gold w-[400px] h-[400px] top-10 left-10 animate-orb-float" />
                <div className="gradient-orb gradient-orb-blush w-[300px] h-[300px] bottom-20 right-10 animate-orb-float" style={{ animationDelay: '3s' }} />

                <div className="relative z-10 text-center px-4 max-w-5xl pt-20 md:pt-28">
                    <div className="mb-4 animate-fade-in flex items-center justify-center gap-3" style={{ animationDelay: '0.2s' }}>
                        <span className="text-gold text-xl">✦</span>
                        <p className="text-white/90 text-sm md:text-base tracking-[0.3em] uppercase font-bold" style={{ fontFamily: 'var(--font-accent)' }}>
                            LRWC
                        </p>
                        <span className="text-gold text-xl">✦</span>
                    </div>

                    <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white leading-tight mb-6 animate-slide-up drop-shadow-2xl" style={{ animationDelay: '0.4s', fontFamily: 'var(--font-heading)' }}>
                        Designing Celebrations.<br />
                        <span className="italic text-gold-light">Creating Memories.</span>
                    </h1>

                    <p className="text-white/80 text-sm md:text-lg max-w-2xl mx-auto mb-10 animate-fade-in leading-relaxed drop-shadow-md" style={{ animationDelay: '0.7s' }}>
                        Premium wedding & event planning company serving all over India.
                        From intimate ceremonies to grand weddings — we plan, design and execute everything with perfection.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-6 justify-center animate-fade-in-up" style={{ animationDelay: '0.9s' }}>
                        <Link
                            to="/contact"
                            className="px-12 py-4 bg-gold text-white font-bold text-sm tracking-widest uppercase rounded-full 
                                hover:bg-gold-dark hover:scale-105 transition-all duration-300 shadow-xl shadow-gold/20"
                        >
                            Get a Free Quote
                        </Link>
                        <Link
                            to="/book"
                            className="px-12 py-4 border-2 border-white/30 text-white font-bold text-sm tracking-widest uppercase 
                                rounded-full hover:bg-white/10 hover:border-white transition-all duration-300 backdrop-blur-sm"
                        >
                            Plan Your Event
                        </Link>
                    </div>

                    <div className="mt-12 animate-fade-in" style={{ animationDelay: '1.2s' }}>
                        <a href="tel:8826805646" className="inline-flex items-center gap-2 group">
                            <span className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white group-hover:bg-gold transition-colors duration-300">📞</span>
                            <span className="text-white font-bold tracking-widest uppercase text-sm">Call Now: 8826805646</span>
                        </a>
                    </div>
                </div>

                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
                    <div className="w-5 h-9 border border-white/20 rounded-full flex justify-center pt-2">
                        <div className="w-0.5 h-2.5 bg-gold rounded-full" />
                    </div>
                </div>
            </section>

            {/* ═══════════ SERVICES PREVIEW ═══════════ */}
            <section className="py-28 bg-cream relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center mb-20 reveal">
                        <p className="text-gold text-xs tracking-[0.4em] uppercase mb-3" style={{ fontFamily: 'var(--font-accent)' }}>What We Offer</p>
                        <h2 className="text-3xl md:text-5xl font-bold text-charcoal mb-5" style={{ fontFamily: 'var(--font-heading)' }}>
                            Our <span className="gold-text italic">Premium</span> Services
                        </h2>
                        <div className="section-divider mb-5" />
                        <p className="text-charcoal-light/60 max-w-xl mx-auto text-sm leading-relaxed">
                            From intimate gatherings to grand weddings, we plan, design and execute everything with perfection.
                            {activeGallery ? null : ' Click to view our work.'}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {servicesList.map((s, i) => (
                            <div
                                key={s.title}
                                className={`reveal group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl
                                    transition-all duration-500 hover:-translate-y-3 gold-border card-3d ${s.gallery ? 'cursor-pointer' : ''}`}
                                style={{ transitionDelay: `${i * 0.08}s` }}
                                onClick={() => s.gallery && openGallery(s)}
                            >
                                <div className="img-zoom h-72 relative text-xl">
                                    <OptimizedImage src={s.img} alt={s.title} className="w-full h-full" />
                                    <div className="img-overlay flex items-center justify-center">
                                        <span className="text-white text-[10px] font-bold tracking-widest uppercase px-4 py-2 bg-black/20 backdrop-blur-sm border border-white/20 rounded-full">
                                            {s.gallery ? 'View Gallery →' : 'Explore →'}
                                        </span>
                                    </div>
                                </div>
                                <div className="p-5">
                                    <h3 className="text-lg font-bold text-charcoal mb-1" style={{ fontFamily: 'var(--font-heading)' }}>{s.title}</h3>
                                    <p className="text-charcoal-light/55 text-[13px] leading-snug mb-3 line-clamp-2">{s.desc}</p>
                                    <div className="flex justify-between items-center">
                                        <Link to="/services" onClick={(e) => e.stopPropagation()} className="text-gold text-[10px] font-bold tracking-widest uppercase hover:text-gold-dark transition-colors">
                                            Learn More →
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>            {/* ═══════════ MASONRY GALLERY ═══════════ */}
            <section className="py-28 bg-white relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center mb-16 reveal">
                        <p className="text-gold text-xs tracking-[0.4em] uppercase mb-3" style={{ fontFamily: 'var(--font-accent)' }}>Visual Journey</p>
                        <h2 className="text-3xl md:text-5xl font-bold text-charcoal mb-5" style={{ fontFamily: 'var(--font-heading)' }}>
                            Moments of <span className="gold-text italic">Magic</span>
                        </h2>
                        <div className="section-divider" />
                    </div>
                    <div className="relative -mx-4 sm:-mx-6 lg:-mx-8">
                        <Skiper30 />
                    </div>
                    <div className="text-center mt-12 reveal">
                        <Link to="/portfolio" className="inline-block px-10 py-4 border-2 border-gold text-gold font-bold text-xs tracking-widest uppercase rounded-full hover:bg-gold hover:text-white transition-all duration-300">
                            View Full Portfolio
                        </Link>
                    </div>
                </div>
            </section>

            {/* ═══════════ CINEMATIC REELS ═══════════ */}
            <section className="py-28 bg-charcoal relative overflow-hidden">
                <div className="gradient-orb gradient-orb-gold w-[500px] h-[500px] top-0 left-0 animate-orb-float opacity-20" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center mb-16 reveal">
                        <p className="text-gold text-xs tracking-[0.4em] uppercase mb-3" style={{ fontFamily: 'var(--font-accent)' }}>Cinematic Highlights</p>
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-5" style={{ fontFamily: 'var(--font-heading)' }}>
                            Stories <span className="gold-text italic">In Motion</span>
                        </h2>
                        <div className="section-divider" />
                        <p className="text-white/40 max-w-xl mx-auto text-sm mt-6">
                            Glimpses of the magic we create. Experience the emotions, the grandeur, and the joy of LRWC.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {reels.map((reel, i) => (
                            <div
                                key={i}
                                className="reveal relative aspect-[9/16] rounded-3xl overflow-hidden shadow-2xl border border-white/10 group cursor-pointer"
                                style={{ transitionDelay: `${i * 0.15}s` }}
                            >
                                <SmartVideo
                                    src={reel.src}
                                    poster={reel.poster}
                                    label={reel.label}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            {/* ═══════════ WHY CHOOSE US ═══════════ */}
            <section className="py-28 bg-cream relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="flex flex-col lg:flex-row gap-16 items-center">
                        {/* Image Side */}
                        <div className="reveal-left lg:w-5/12">
                            <div className="relative rounded-3xl overflow-hidden shadow-2xl h-[450px] md:h-[550px]">
                                <OptimizedImage 
                                    src="/homebg2.webp" 
                                    alt="Destination Wedding" 
                                    className="w-full h-full object-cover"
                                    containerClassName="h-full"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-transparent" />
                                <div className="absolute bottom-8 left-8 right-8">
                                    <div className="p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20">
                                        <p className="text-white text-[10px] tracking-[0.3em] uppercase mb-1 opacity-70">Your Story</p>
                                        <p className="text-gold text-xl md:text-2xl font-bold italic" style={{ fontFamily: 'var(--font-heading)' }}>Experience Perfection</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Content Side */}
                        <div className="lg:w-7/12" ref={ref3}>
                            <div className="mb-12 reveal-right">
                                <p className="text-gold text-xs tracking-[0.4em] uppercase mb-3" style={{ fontFamily: 'var(--font-accent)' }}>The LRWC Advantage</p>
                                <h2 className="text-3xl md:text-5xl font-bold text-charcoal mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
                                    Why Choose <span className="gold-text italic">Us</span>
                                </h2>
                                <div className="section-divider-left mb-8" />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
                                {whyUs.map((item, i) => (
                                    <div 
                                        key={item.title} 
                                        className="reveal flex gap-4 p-4 rounded-xl hover:bg-white hover:shadow-md transition-all duration-300 border border-transparent hover:border-gold/10 group"
                                        style={{ transitionDelay: `${i * 0.1}s` }}
                                    >
                                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gold/10 flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-white transition-colors duration-300">
                                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h3 className="text-base font-bold text-charcoal mb-1" style={{ fontFamily: 'var(--font-heading)' }}>{item.title}</h3>
                                            <p className="text-charcoal-light/60 text-[13px] leading-snug">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            
                            <div className="mt-12 flex flex-wrap gap-8 pt-8 border-t border-gold/10">
                                <div ref={ref1} className="reveal">
                                    <p className="text-3xl font-bold gold-text" style={{ fontFamily: 'var(--font-heading)' }}>{count1}+</p>
                                    <p className="text-[10px] text-charcoal/40 uppercase tracking-widest">Events Delivered</p>
                                </div>
                                <div ref={ref2} className="reveal">
                                    <p className="text-3xl font-bold gold-text" style={{ fontFamily: 'var(--font-heading)' }}>{count2}+</p>
                                    <p className="text-[10px] text-charcoal/40 uppercase tracking-widest">Years of Excellence</p>
                                </div>
                                <div className="reveal bg-charcoal text-white px-5 py-2.5 rounded-xl border border-gold/20 flex items-center gap-3">
                                    <p className="text-2xl font-bold gold-text leading-none">{count3}%</p>
                                    <p className="text-[9px] uppercase tracking-[0.1em] opacity-40 leading-tight">Client<br/>Satisfaction</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════════ WORKING PROCESS ═══════════ */}
            <section className="py-28 bg-white relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center mb-20 reveal">
                        <p className="text-gold text-xs tracking-[0.4em] uppercase mb-3" style={{ fontFamily: 'var(--font-accent)' }}>How We Work</p>
                        <h2 className="text-3xl md:text-5xl font-bold text-charcoal mb-5" style={{ fontFamily: 'var(--font-heading)' }}>
                            Our Working <span className="gold-text italic">Process</span>
                        </h2>
                        <div className="section-divider" />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 relative">
                        <div className="absolute top-1/2 left-0 w-full h-px bg-gold/20 hidden lg:block -translate-y-12" />

                        {workingProcess.map((step, i) => (
                            <div key={step.title} className="reveal text-center relative z-10" style={{ transitionDelay: `${i * 0.15}s` }}>
                                <div className="w-16 h-16 rounded-full bg-gold text-white text-2xl font-bold flex items-center justify-center mx-auto mb-6 shadow-xl shadow-gold/30">
                                    {step.step}
                                </div>
                                <h3 className="text-xl font-bold text-charcoal mb-3" style={{ fontFamily: 'var(--font-heading)' }}>{step.title}</h3>
                                <p className="text-charcoal-light/60 text-sm leading-relaxed">{step.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════════ TESTIMONIALS ═══════════ */}
            <section className="py-28 bg-cream relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center mb-20 reveal">
                        <p className="text-gold text-xs tracking-[0.4em] uppercase mb-3" style={{ fontFamily: 'var(--font-accent)' }}>Testimonials</p>
                        <h2 className="text-3xl md:text-5xl font-bold text-charcoal mb-5" style={{ fontFamily: 'var(--font-heading)' }}>
                            Client <span className="gold-text italic">Stories</span>
                        </h2>
                        <div className="section-divider" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {testimonials.map((t, i) => (
                            <div
                                key={t.name}
                                className="reveal relative p-8 bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500
                                    hover:-translate-y-2 gold-border group"
                                style={{ transitionDelay: `${i * 0.15}s` }}
                            >
                                <span className="quote-mark">"</span>
                                <div className="relative z-10">
                                    <div className="stars text-base mb-4">{'★'.repeat(t.rating)}</div>
                                    <p className="text-charcoal-light/65 text-sm leading-relaxed mb-6 italic">"{t.text}"</p>
                                    <div className="flex items-center gap-3">
                                        <div className="w-11 h-11 rounded-full bg-gold/10 flex items-center justify-center text-gold font-bold text-sm ring-2 ring-gold/20">
                                            {t.name.charAt(0)}
                                        </div>
                                        <div>
                                            <p className="font-bold text-charcoal text-sm">{t.name}</p>
                                            <p className="text-gold text-xs tracking-wider uppercase">{t.role}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Lightbox Gallery */}
            <AnimatePresence>
                {activeGallery && (
                    <Lightbox
                        gallery={activeGallery.gallery}
                        index={photoIndex}
                        onClose={() => setActiveGallery(null)}
                        onNext={handleNext}
                        onPrev={handlePrev}
                        onIndexChange={(idx) => setPhotoIndex(idx)}
                    />
                )}
            </AnimatePresence>

            {/* ═══════════ CTA BANNER ═══════════ */}
            <section className="py-28 relative overflow-hidden">
                <OptimizedImage
                    src="/homebg.webp"
                    alt="Plan your event"
                    className="absolute inset-0 w-full h-full"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-charcoal/90 to-charcoal/75" />
                <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
                    <div className="reveal">
                        <div className="ornament-line mb-6">
                            <span className="ornament" />
                        </div>
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
                            Let's Plan Your{' '}
                            <span className="gold-text italic">Perfect Day</span>
                        </h2>
                        <p className="text-white/50 max-w-xl mx-auto mb-10 text-sm leading-relaxed">
                            Ready to create an unforgettable celebration? Our team is here to bring your vision to
                            life with elegance, creativity, and perfection.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                to="/contact"
                                className="px-10 py-4 bg-gold text-white font-semibold text-sm tracking-widest uppercase rounded-full
                                    hover:bg-gold-dark transition-all duration-300 btn-glow"
                            >
                                Get In Touch
                            </Link>
                            <a
                                href="tel:8826805646"
                                className="px-10 py-4 border border-white/20 text-white font-semibold text-sm tracking-widest uppercase
                                    rounded-full hover:bg-white/10 hover:border-white/40 transition-all duration-300"
                            >
                                Call: 8826805646
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
