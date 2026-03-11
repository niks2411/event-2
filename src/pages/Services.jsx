import { useState, useEffect } from 'react';
import useReveal from '../hooks/useReveal';
import { Link } from 'react-router-dom';
import Lightbox from '../components/ui/Lightbox';
import { AnimatePresence } from 'framer-motion';
import OptimizedImage from '../components/ui/OptimizedImage';

const services = [
    { 
        title: 'Venue Suggestion', 
        badge: 'V', 
        img: '/SnapInsta.to_368252794_18295230007186235_579421688051440182_n_750.jpg', 
        desc: 'Finding the perfect backdrop for your love story, from royal palaces to serene beaches.',
        includes: ['Palace Weddings', 'Beach Resorts', 'Boutique Venues', 'Destination Planning']
    },
    { 
        title: 'Dream Decor next to Heaven', 
        badge: 'D', 
        img: '/SnapInsta.to_378181396_18298849789186235_4370895842433673534_n_750.jpg', 
        desc: 'Transforming spaces into ethereal landscapes with celestial decor and floral artistry.',
        includes: ['Theme Styling', 'Floral Artistry', 'Lighting Design', 'Mandap Decor'],
        gallery: [
            '/wedding/2I0A3871.JPG', '/wedding/2I0A3887.JPG', '/wedding/2I0A3892.JPG', '/wedding/2I0A3894.JPG',
            '/wedding/IMG_0543.jpg', '/wedding/IMG_0546.jpg', '/wedding/IMG_0549.jpg', '/wedding/IMG_0554.jpg',
            '/wedding/IMG_0592.jpg', '/wedding/IMG_4443.jpg', '/wedding/IMG_4448.jpg', '/wedding/IMG_4450.jpg',
            '/wedding/IMG_4453.jpg', '/wedding/IMG_4461.jpg', '/wedding/IMG_4465.jpg', '/wedding/IMG_4477.jpg'
        ]
    },
    { 
        title: 'Creative Wedding Stationary', 
        badge: 'S', 
        img: '/SnapInsta.to_469014936_18381580087097874_4466348175444016484_n.jpg', 
        desc: 'Bespoke invitations and event stationery that tell your unique story beautifully.',
        includes: ['Custom Invites', 'Digital E-vites', 'Itinerary Cards', 'Thank You Notes']
    },
    { 
        title: 'Luxe and Hospitality', 
        badge: 'L', 
        img: '/a3de815c7a261b7cedab7faa9daad714.jpg', 
        desc: 'Premium guest management and luxury hospitality experiences for a seamless event.',
        includes: ['RSVP Handling', 'Guest Check-in', 'Luggage Management', 'Family Handling']
    },
    { 
        title: 'Bar Management', 
        badge: 'B', 
        img: '/28aa63b5324a872840a1b8f1065e21fe.jpg', 
        desc: 'Curated cocktail menus and professional bar services for a spirited celebration.',
        includes: ['Molecular Mixology', 'Professional Flair Bartending', 'Themed Bar Setup', 'Premium Ingredients']
    },
    { 
        title: 'Make-up Artist', 
        badge: 'M', 
        img: '/b3ccf773fd05d61998269785d2404380.jpg', 
        desc: 'Professional bridal makeup and styling to make you shine on your special day.',
        includes: ['Bridal Makeup', 'Guest Makeup', 'Hair Design', 'Sari Draping']
    },
    { 
        title: 'A-Listing Choreography', 
        badge: 'C', 
        img: '/Bd.webp', 
        desc: 'Grand Sangeet performances with professional choreography and stage management.',
        includes: ['Sangeet Choreography', 'Backup Dancers', 'Concept Shoots', 'Stage Presence Coaching']
    },
    { 
        title: 'Celebrity Engagement & Artist Management', 
        badge: 'A', 
        img: '/ba2e2214fee77f3228b4c0405e87e42a.jpg', 
        desc: 'Booking top-tier artists and managing celebrity appearances for a star-studded event.',
        includes: ['Singer Booking', 'Celebrity Appearance', 'Live Bands', 'Stage Performers']
    },
    { 
        title: 'Catering to Perfection', 
        badge: 'F', 
        img: '/8d1ae6c2e50b7eaa8adbb061d6420192.jpg', 
        desc: 'Gourmet dining experiences and world-class catering solutions for your guests.',
        includes: ['Multi-cuisine Menu', 'Live Counters', 'Gourmet Plating', 'Premium Service']
    },
    { 
        title: 'Artists for your Mehendi Needs', 
        badge: 'H', 
        img: '/747e3166a39f28fdcd00fe2b7fe29b7a.jpg', 
        desc: 'Intricate Mehendi designs by expert artists for a beautiful traditional touch.',
        includes: ['Bridal Mehendi', 'Group Mehendi', 'Organic Henna', 'Modern & Traditional Designs'],
        gallery: [
            '/haldi/IMG_0500.jpg', '/haldi/IMG_0502.jpg', '/haldi/IMG_0512.jpg', '/haldi/IMG_4421.jpg',
            '/haldi/IMG_4422.jpg', '/haldi/IMG_4423.jpg', '/haldi/IMG_4429.jpg', '/haldi/IMG_6756.jpg',
            '/haldi/IMG_6766.jpg', '/haldi/IMG_6770.jpg', '/haldi/IMG_8477.jpg', '/haldi/IMG_8480.jpg',
            '/haldi/IMG_8484 (1).jpg', '/haldi/IMG_8488.jpg', '/haldi/IMG_8490.jpg', '/haldi/IMG_8495.jpg',
            '/haldi/IMG_8500.jpg', '/haldi/IMG_8759.jpg', '/haldi/IMG_8764.jpg', '/haldi/IMG_8791.jpg',
            '/haldi/IMG_8796.jpg', '/haldi/IMG_8803.jpg', '/haldi/IMG_8808.jpg', '/haldi/IMG_9246.jpg',
            '/haldi/IMG_9251.jpg', '/haldi/IMG_9257.jpg', '/haldi/IMG_9259.jpg', '/haldi/IMG_9339.jpg',
            '/haldi/IMG_9346.jpg', '/mehndi/IMG_0430.jpg', '/mehndi/IMG_0438.jpg', '/mehndi/IMG_6723.jpg'
        ]
    },
    { 
        title: 'Experiential Elements', 
        badge: 'X', 
        img: '/79c2b2bf4b2822b47057a1f8abdb9c72.jpg', 
        desc: 'Unique interactive elements and experiential setups that create a "wow" factor.',
        includes: ['Photo Booths', 'Interactive Games', 'Surprise Elements', 'Curated Experiences']
    },
    { 
        title: 'Photography & Films', 
        badge: 'P', 
        img: '/SnapInsta.to_469184825_18381580297097874_8533222688974240097_n_750.jpg', 
        desc: 'Capturing timeless moments with world-class photography and cinematic films.',
        includes: ['Pre-wedding Shoots', 'Cinematic Films', 'Candid Photography', 'Designer Albums']
    },
];

export default function Services() {
    const revealRef = useReveal();
    const [activeGallery, setActiveGallery] = useState(null);
    const [photoIndex, setPhotoIndex] = useState(0);

    // Close lightbox on escape key
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
            {/* Hero */}
            <section className="hero-page relative h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0">
                    <OptimizedImage
                        src="https://images.unsplash.com/photo-1519741497674-611481863552?w=1920&h=800&fit=crop"
                        alt="Services Hero"
                        className="w-full h-full"
                        priority
                    />
                </div>
                <div className="absolute inset-0 bg-gradient-to-b from-charcoal/80 via-charcoal/50 to-charcoal/70" />
                <div className="relative z-10 text-center px-4">
                    <div className="ornament-line mb-4 animate-fade-in">
                        <span className="ornament" />
                    </div>
                    <p className="text-gold text-sm tracking-[0.4em] uppercase mb-3 animate-fade-in" style={{ fontFamily: 'var(--font-accent)' }}>What We Offer — Serving all over India</p>
                    <h1 className="text-4xl md:text-6xl font-bold text-white animate-slide-up" style={{ fontFamily: 'var(--font-heading)' }}>
                        Our <span className="gold-text italic">Services</span>
                    </h1>
                </div>
            </section>

            {/* Services List */}
            <section className="py-28 bg-cream relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center mb-20 reveal">
                        <p className="text-gold text-xs tracking-[0.4em] uppercase mb-3" style={{ fontFamily: 'var(--font-accent)' }}>Premium Solutions</p>
                        <h2 className="text-3xl md:text-5xl font-bold text-charcoal mb-5" style={{ fontFamily: 'var(--font-heading)' }}>
                            Curated Event <span className="gold-text italic">Experiences</span>
                        </h2>
                        <div className="section-divider mb-5" />
                        <p className="text-charcoal-light/55 max-w-xl mx-auto text-sm leading-relaxed">
                            Each service is tailored to perfection, ensuring your celebration is as unique as your story. Click on any service to view our work.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        {services.map((s, i) => (
                            <div
                                key={s.title}
                                className={`reveal bg-white rounded-3xl overflow-hidden shadow-lg border border-gold/10 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 flex flex-col ${s.gallery ? 'cursor-pointer' : ''}`}
                                style={{ transitionDelay: `${i * 0.05}s` }}
                                onClick={() => s.gallery && openGallery(s)}
                            >
                                <div className="h-[420px] relative overflow-hidden group">
                                    <OptimizedImage src={s.img} alt={s.title} className="w-full h-full group-hover:scale-110 transition-transform duration-700" />
                                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-500 flex items-center justify-center opacity-0 group-hover:opacity-100 z-10">
                                        {s.gallery && (
                                            <span className="px-6 py-2 bg-white/10 backdrop-blur-md border border-white/20 text-white text-[10px] font-bold tracking-widest uppercase rounded-full">
                                                View Gallery
                                            </span>
                                        )}
                                    </div>
                                    <span className="absolute top-6 left-6 w-12 h-12 rounded-full bg-gold text-white flex items-center justify-center font-bold shadow-lg">
                                        {s.badge}
                                    </span>
                                </div>
                                <div className="p-6 flex-1 flex flex-col">
                                    <h3 className="text-xl font-bold text-charcoal mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
                                        {s.title}
                                    </h3>
                                    <p className="text-charcoal-light/60 text-xs leading-relaxed mb-5">
                                        {s.desc}
                                    </p>
                                    <div className="space-y-4 flex-1">
                                        <div>
                                            <p className="text-xs font-bold text-gold uppercase tracking-wider mb-2">Service Includes:</p>
                                            <ul className="grid grid-cols-1 gap-2">
                                                {s.includes.map((item, idx) => (
                                                    <li key={idx} className="flex items-start gap-2 text-xs text-charcoal/70">
                                                        <span className="text-gold mt-0.5">✦</span>
                                                        {item}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="mt-6 flex gap-3">
                                        {s.gallery ? (
                                            <button
                                                onClick={(e) => { e.stopPropagation(); openGallery(s); }}
                                                className="flex-1 px-6 py-2.5 bg-charcoal text-white text-[9px] font-bold tracking-widest uppercase rounded-full hover:bg-black transition-all duration-300"
                                            >
                                                View Gallery
                                            </button>
                                        ) : null}
                                        <Link
                                            to="/contact"
                                            onClick={(e) => e.stopPropagation()}
                                            className="flex-1 px-6 py-2.5 bg-gold text-white text-[9px] font-bold tracking-widest uppercase rounded-full hover:bg-gold-dark transition-all duration-300 text-center"
                                        >
                                            Enquire Now
                                        </Link>
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

            {/* CTA */}
            <section className="py-28 bg-charcoal relative overflow-hidden">
                <div className="relative z-10 max-w-3xl mx-auto px-4 text-center">
                    <div className="reveal">
                        <div className="ornament-line mb-6">
                            <span className="ornament" />
                        </div>
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
                            Ready to <span className="gold-text italic">Create</span> Something Special? Let's Talk
                        </h2>
                        <p className="text-white/45 text-sm leading-relaxed mb-10 max-w-lg mx-auto">
                            Every event is unique. Tell us about your vision, and we'll create a customized plan
                            that brings it to life perfectly.
                        </p>
                        <Link
                            to="/contact"
                            className="inline-block px-10 py-4 bg-gold text-white font-semibold text-sm tracking-widest uppercase
                                rounded-full hover:bg-gold-dark transition-all duration-300 btn-glow"
                        >
                            Get in Touch
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
