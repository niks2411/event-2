import React, { useRef, useEffect, useState } from 'react';

export default function SmartVideo({ src, id, poster, className, label }) {
    const containerRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsVisible(entry.isIntersecting);
            },
            { threshold: 0.1 }
        );

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => {
            if (containerRef.current) {
                observer.unobserve(containerRef.current);
            }
        };
    }, []);

    const [isMuted, setIsMuted] = useState(true);

    // YouTube Embed URL Builder
    const getYouTubeUrl = (videoId) => {
        return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=${isMuted ? 1 : 0}&loop=1&playlist=${videoId}&controls=0&modestbranding=1&rel=0&iv_load_policy=3&showinfo=0`;
    };

    return (
        <div ref={containerRef} className={`relative w-full h-full overflow-hidden bg-charcoal/20 ${className}`}>
            {/* Poster appears while loading or before intersection */}
            {(!isLoaded || !isVisible) && poster && (
                <img
                    src={poster}
                    alt={label}
                    className="absolute inset-0 w-full h-full object-cover z-10 transition-opacity duration-700"
                    loading="lazy"
                />
            )}

            {isVisible ? (
                id ? (
                    // YouTube Mode
                    <iframe
                        key={`${id}-${isMuted}`} // Force reload on mute change for YouTube (simple way without API)
                        className={`w-full h-full object-cover transition-opacity duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
                        src={getYouTubeUrl(id)}
                        title={label}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        onLoad={() => setIsLoaded(true)}
                        style={{ width: '100%', height: '115%', marginTop: '-7.5%' }} // Zoom to hide controls
                    />
                ) : (
                    // Local MP4 Mode
                    <video
                        src={src}
                        className={`w-full h-full object-cover transition-opacity duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
                        onPlaying={() => setIsLoaded(true)}
                        onLoadedData={() => setIsLoaded(true)}
                        autoPlay
                        muted={isMuted}
                        loop
                        playsInline
                        preload="metadata"
                    />
                )
            ) : null}

            {/* Sound Toggle Button */}
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    setIsMuted(!isMuted);
                }}
                className="absolute top-4 right-4 z-40 w-10 h-10 rounded-full bg-black/30 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all pointer-events-auto"
            >
                {isMuted ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" /></svg>
                ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" /></svg>
                )}
            </button>

            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 z-20 pointer-events-none" />

            <div className="absolute bottom-6 left-6 right-6 z-30 pointer-events-none text-left">
                <p className="text-white font-bold text-lg leading-tight mb-1" style={{ fontFamily: 'var(--font-heading)' }}>{label}</p>
            </div>
        </div>
    );
}
