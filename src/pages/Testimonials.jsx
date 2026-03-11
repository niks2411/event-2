import { useState } from 'react';
import useReveal from '../hooks/useReveal';

const testimonials = [
    { name: 'Priya & Rahul Sharma', role: 'Wedding — Mumbai', rating: 5, text: 'LRWC made our wedding absolutely magical. Every detail was perfect, from the floral arrangements to the fireworks finale. Our guests are still talking about it!', initials: 'PR', hasVideo: false },
    { name: 'Ananya & Vikrant Patel', role: 'Engagement — Delhi', rating: 5, text: 'The most romantic engagement ceremony we could have imagined. The team captured our story beautifully and created an atmosphere that was pure magic.', initials: 'AP', hasVideo: false },
    { name: 'Vikram Enterprises', role: 'Corporate Gala — Bangalore', rating: 5, text: 'Professional, creative, and absolutely flawless execution. Our annual gala was transformed into a world-class event that elevated our brand image significantly.', initials: 'VE', hasVideo: false },
    { name: 'Sneha & Arjun Gupta', role: 'Haldi Ceremony — Jaipur', rating: 5, text: 'The haldi ceremony setup was absolutely stunning! The vibrant yellow and gold theme with marigold decorations exceeded all our expectations. Truly unforgettable!', initials: 'SG', hasVideo: false },
    { name: 'Rashi Mehta', role: 'Birthday Celebration — Pune', rating: 5, text: 'They turned my 30th birthday into the most magical evening. The surprise elements, custom décor, and the entire flow of the evening was perfect!', initials: 'RM', hasVideo: false },
    { name: 'Neha & Karan Singh', role: 'Destination Wedding — Udaipur', rating: 5, text: 'A fairy-tale destination wedding at a palace in Udaipur. LRWC handled everything with grace and precision. Every moment was picture-perfect.', initials: 'NK', hasVideo: false },
    { name: 'Ishita & Rohan Malhotra', role: 'Sangeet Night — Delhi', rating: 5, text: 'The energy at our Sangeet was unmatched! The stage design and lighting were truly world-class. Thank you for making our night legendary!', initials: 'IM', hasVideo: false },
    { name: 'Aditya Birla Group', role: 'Annual Retreat — Rishikesh', rating: 5, text: 'Flawless coordination in a difficult terrain. LRWC team managed the entire retreat with such professionalism and grace.', initials: 'AB', hasVideo: false },
    { name: 'Megha & Sameer Jain', role: 'Cocktail Party — Gurgaon', rating: 5, text: 'A night of pure glamour! The bar management and hospitality were the highlights. Our friends are still raving about the experience.', initials: 'MJ', hasVideo: false },
    { name: 'Dr. Kavita Reddy', role: 'Medical Conference — Hyderabad', rating: 5, text: 'Precision planning at its best. LRWC team handled our 500+ delegates with zero glitches. Highly recommended for corporate excellence.', initials: 'KR', hasVideo: false },
    { name: 'Siddharth & Tanya Verma', role: 'Anniversary Celebration — Goa', rating: 5, text: 'An intimate beach celebration that felt like a dream. Every small detail reflected our journey. Simply beautiful.', initials: 'ST', hasVideo: false },
    { name: 'Oberoi Family', role: 'Private Residence Function — Delhi NCR', rating: 5, text: 'They transformed our home into a royal palace for our daughter’s function. The decor was breathtaking and the service was warm and professional.', initials: 'OF', hasVideo: false },
];

export default function Testimonials() {
    const revealRef = useReveal();
    const [activeSlide, setActiveSlide] = useState(0);

    return (
        <div ref={revealRef}>
            {/* Hero */}
            <section className="hero-page relative h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden">
                    <img src="/photography-new.png" alt="Testimonials" className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-b from-charcoal/80 via-charcoal/50 to-charcoal/70" />
                <div className="gradient-orb gradient-orb-gold w-80 h-80 top-10 left-10 animate-orb-float" />
                <div className="relative z-10 text-center px-4">
                    <div className="ornament-line mb-4 animate-fade-in">
                        <span className="ornament" />
                    </div>
                    <p className="text-gold text-sm tracking-[0.4em] uppercase mb-3 animate-fade-in" style={{ fontFamily: 'var(--font-accent)' }}>Client Love</p>
                    <h1 className="text-4xl md:text-6xl font-bold text-white animate-slide-up" style={{ fontFamily: 'var(--font-heading)' }}>
                        <span className="gold-text italic">Testimonials</span>
                    </h1>
                </div>
            </section>

            {/* Featured Slider */}
            <section className="py-28 bg-cream relative overflow-hidden">
                <div className="gradient-orb gradient-orb-blush w-96 h-96 -top-20 right-0 animate-orb-float" />
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center mb-16 reveal">
                        <p className="text-gold text-xs tracking-[0.4em] uppercase mb-3" style={{ fontFamily: 'var(--font-accent)' }}>Happy Clients</p>
                        <h2 className="text-3xl md:text-5xl font-bold text-charcoal mb-5" style={{ fontFamily: 'var(--font-heading)' }}>
                            What Our Clients <span className="gold-text italic">Say</span>
                        </h2>
                        <div className="section-divider" />
                    </div>

                    {/* Slider */}
                    <div className="reveal relative bg-[#F1E0CF] rounded-3xl shadow-xl overflow-hidden gold-border animate-border-glow">
                        <div className="p-10 md:p-14 text-center relative">
                            <span className="quote-mark text-6xl">‟</span>
                            <div className="relative z-10">
                                <div className="stars text-2xl mb-6">
                                    {'★'.repeat(testimonials[activeSlide].rating)}
                                </div>
                                <p className="text-charcoal-light/65 text-lg md:text-xl leading-relaxed mb-8 italic" style={{ fontFamily: 'var(--font-accent)', fontSize: '1.35rem' }}>
                                    "{testimonials[activeSlide].text}"
                                </p>
                                <div className="flex items-center justify-center gap-4">
                                    <div className="w-14 h-14 rounded-full bg-gold/10 flex items-center justify-center text-gold font-bold text-xl ring-3 ring-gold/20">
                                        {testimonials[activeSlide].initials}
                                    </div>
                                    <div className="text-left">
                                        <p className="font-bold text-charcoal">{testimonials[activeSlide].name}</p>
                                        <p className="text-gold text-xs tracking-wider uppercase">{testimonials[activeSlide].role}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Slider dots */}
                        <div className="flex justify-center gap-2 pb-8">
                            {testimonials.map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setActiveSlide(i)}
                                    className={`h-2 rounded-full transition-all duration-400 ${i === activeSlide ? 'bg-gold w-8' : 'bg-gold/20 w-2 hover:bg-gold/40'
                                        }`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* All Reviews Grid */}
            <section className="py-28 bg-[#F1E0CF] relative overflow-hidden">
                <div className="gradient-orb gradient-orb-gold w-80 h-80 bottom-0 left-0 animate-orb-float" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center mb-20 reveal">
                        <p className="text-gold text-xs tracking-[0.4em] uppercase mb-3" style={{ fontFamily: 'var(--font-accent)' }}>All Feedback</p>
                        <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-5" style={{ fontFamily: 'var(--font-heading)' }}>
                            All <span className="gold-text italic">Reviews</span>
                        </h2>
                        <div className="section-divider" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {testimonials.map((t, i) => (
                            <div
                                key={t.name}
                                className="reveal relative p-8 bg-cream rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500
                                    hover:-translate-y-3 gold-border group card-3d"
                                style={{ transitionDelay: `${i * 0.1}s` }}
                            >
                                <span className="quote-mark text-5xl">‟</span>
                                {t.hasVideo && (
                                    <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gold/10 border border-gold/20
                                        flex items-center justify-center group-hover:bg-gold/20 transition-colors">
                                        <span className="text-gold text-xs">▶</span>
                                    </div>
                                )}
                                <div className="relative z-10">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center text-gold font-bold text-sm ring-2 ring-gold/15">
                                            {t.initials}
                                        </div>
                                        <div>
                                            <p className="font-bold text-charcoal text-sm">{t.name}</p>
                                            <p className="text-gold text-xs tracking-wider uppercase">{t.role}</p>
                                        </div>
                                    </div>
                                    <div className="stars text-sm mb-3">{'★'.repeat(t.rating)}</div>
                                    <p className="text-charcoal-light/55 text-sm leading-relaxed italic">"{t.text}"</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
