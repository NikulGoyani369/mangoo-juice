import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';

/** Brand story page — scroll-reveal sections, timeline, values grid, CTA. */
export function StoryPage() {
    useEffect(() => {
        const observer = new IntersectionObserver(
            entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); } }),
            { threshold: 0.12 },
        );
        document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
        return () => observer.disconnect();
    }, []);

    const stats = [
        { num: '8', label: 'Years of Craft' },
        { num: '0', label: 'Additives, Ever' },
        { num: '4°C', label: 'Cold-Pressed Temp' },
        { num: 'GI', label: 'Certified Ratnagiri' },
    ];

    const process = [
        { num: '01', title: 'Hand-Picked at Peak Ripeness', desc: 'Every Alphonso is harvested by hand during the 6-week Ratnagiri season — not before, not after. No compromises on timing, ever.' },
        { num: '02', title: 'Cold-Pressed at 4°C', desc: 'Our hydraulic presses extract every drop of juice at ultra-low temperatures, preserving natural enzymes, vitamins, and the full aromatic signature of the fruit.' },
        { num: '03', title: 'Zero Additives. Bottled Pure.', desc: 'No sugar. No preservatives. No concentrate. No water. Just mango — sealed within 90 minutes of pressing.' },
    ];

    const timeline = [
        { year: '2018', icon: '🌱', title: 'The Orchard Moment', desc: 'A single Alphonso in Ratnagiri convinces Nikul that mass-market mango juice is broken. Raw Pressery is founded.', side: 'left' },
        { year: '2019', icon: '🔬', title: 'Cold-Press R&D', desc: 'After 11 months of trials, we perfect a process preserving 97% of natural polyphenols vs. pasteurised alternatives.', side: 'right' },
        { year: '2020', icon: '🚀', title: 'First Bottle Shipped', desc: '500 bottles. Hand-delivered across Mumbai. Every customer rated it "the best mango juice I\'ve ever tasted."', side: 'left' },
        { year: '2022', icon: '🏅', title: 'GI Certification', desc: 'Officially GI-certified sourcing from Ratnagiri. Named India\'s Best New Beverage Brand at the Food Innovation Summit.', side: 'right' },
        { year: '2024', icon: '🌍', title: 'Going Global', desc: 'First international shipments to the UK, UAE, and Singapore. Geo-aware pricing launched for fair local rates.', side: 'left' },
        { year: '2026', icon: '🥭', title: 'You Found Us', desc: 'The journey continues. Every bottle you hold represents 8 years of refusing to compromise. Welcome to the family.', side: 'right' },
    ];

    const values = [
        { icon: '🌱', title: 'Radical Purity', desc: "If nature didn't put it in the mango, we don't put it in the bottle. No exceptions." },
        { icon: '🤝', title: 'Farmer First', desc: 'We pay Ratnagiri farmers 40% above market rate and commit to 5-year agreements.' },
        { icon: '🔬', title: 'Science of Freshness', desc: 'Cold-pressing at 4°C preserves enzymes that pasteurisation destroys.' },
        { icon: '♻️', title: 'Zero Waste Orchards', desc: 'Mango skins and pulp are composted back into the orchards. 80% recycled packaging.' },
        { icon: '🌍', title: 'Fair Global Pricing', desc: 'Geo-aware pricing ensures customers in Mumbai and London both pay a fair local equivalent.' },
        { icon: '❤️', title: 'Relentless Honesty', desc: 'Every ingredient is disclosed. If we ever compromise our standards, you\'ll hear it from us first.' },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-sans bg-[#fdfcf9] dark:bg-[#0d0905] text-[#1a0f05] dark:text-[#f5ede0] min-h-screen pt-24"
        >
            <Helmet>
                <title>Our Story | Raw Pressery Alphonso Mango</title>
                <meta name="description" content="Discover the origins of our 100% pure cold-pressed Alphonso Mango juice. Sourced straight from Ratnagiri, India." />
                <link rel="canonical" href="https://nikulgoyani369.github.io/mangoo-juice/#/story" />
            </Helmet>

            {/* ── Hero ── */}
            <section className="min-h-screen flex flex-col justify-end pb-20 relative overflow-hidden
                          bg-gradient-to-br from-[#fdf5e8] to-[#fdfcf9] dark:from-[#120b03] dark:to-[#0d0905] px-8 md:px-16">
                <div className="absolute top-[-20%] right-[-10%] w-[70vw] max-w-[800px] h-[70vw] max-h-[800px]
                        bg-[radial-gradient(circle,rgba(255,165,0,0.15)_0%,transparent_70%)] rounded-full pointer-events-none" />
                <p className="reveal text-[0.68rem] font-bold tracking-[0.5em] uppercase text-orange-500 mb-6">
                    The Story Behind The Bottle</p>
                <h1 className="reveal font-serif text-[clamp(3.5rem,9vw,9rem)] font-black leading-[0.9] tracking-tight mb-8">
                    <span className="grad-text">Born</span><br />from a<br /><em>single</em><br />mango.
                </h1>
                <p className="reveal text-[clamp(1rem,2.5vw,1.35rem)] font-light max-w-[580px] leading-[1.65] opacity-65 mb-12">
                    It starts in the red soil of Ratnagiri. It ends in your hands.
                    Everything in between is a relentless obsession with purity.
                </p>
                <div className="reveal flex items-center gap-3 text-[0.68rem] tracking-[0.3em] uppercase opacity-35">
                    <span className="w-10 h-px bg-current" />Scroll to explore
                </div>
            </section>

            {/* ── Stats ── */}
            <div className="grid grid-cols-2 md:grid-cols-4 border-t border-b border-[#1a0f05]/8 dark:border-white/8">
                {stats.map((s, i) => (
                    <div key={s.label}
                        className={`reveal p-10 text-center bg-[#f7f3ec] dark:bg-[#1a100a]
            ${i < stats.length - 1 ? 'border-r border-[#1a0f05]/8 dark:border-white/8' : ''}`}
                        style={{ transitionDelay: `${i * 0.1}s` }}>
                        <p className="font-serif text-[clamp(2.5rem,5vw,4rem)] font-black leading-none mb-2 grad-text">{s.num}</p>
                        <p className="text-[0.68rem] font-bold tracking-[0.25em] uppercase opacity-40">{s.label}</p>
                    </div>
                ))}
            </div>

            {/* ── Origin ── */}
            <section className="py-28 px-8 md:px-16">
                <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-20 items-center">
                    <div>
                        <p className="reveal text-[0.68rem] font-bold tracking-[0.4em] uppercase text-orange-500 mb-5">Where it all began</p>
                        <h2 className="reveal font-serif text-[clamp(2rem,4vw,3.5rem)] font-black leading-[1.05] tracking-tight mb-7">
                            A single bite<br />changed <em className="grad-text">everything.</em>
                        </h2>
                        <p className="reveal text-[1.05rem] leading-[1.78] opacity-70 mb-5">
                            It was the summer of 2018. Nikul Goyani bit into a freshly picked Alphonso mango
                            in a Ratnagiri orchard and realised something — no store-bought juice had ever come close to this.
                        </p>
                        <p className="reveal text-[1.05rem] leading-[1.78] opacity-70">
                            Thick, aromatic, impossibly golden. That afternoon, Raw Pressery was born —
                            with one obsessive goal: <strong>bottle this, unchanged.</strong>
                        </p>
                    </div>
                    <div className="reveal aspect-[4/5] rounded-[28px] overflow-hidden
                          bg-gradient-to-br from-orange-400 to-red-600
                          flex items-center justify-center relative">
                        <span className="text-[8rem]" style={{ animation: 'float 6s ease-in-out infinite' }}>🥭</span>
                        <div className="absolute bottom-6 left-6 bg-white/95 text-[#1a0f05] px-4 py-3.5
                            rounded-2xl text-[0.78rem] font-extrabold">
                            🌿 GI-Certified Ratnagiri, Maharashtra
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Pull Quote ── */}
            <div className="py-28 px-8 text-center bg-gradient-to-br from-[#fff8ee] to-[#fdf5e4]
                      dark:from-[#140d05] dark:to-[#0d0905]
                      border-t border-b border-[#1a0f05]/8 dark:border-white/8">
                <blockquote className="reveal font-serif font-black italic text-[clamp(1.8rem,4vw,3.5rem)]
                                leading-[1.2] max-w-3xl mx-auto tracking-tight mb-7">
                    "The best ingredients need<br />the <span className="grad-text">least interference.</span>"
                </blockquote>
                <cite className="reveal text-[0.78rem] font-bold tracking-[0.3em] uppercase opacity-40 not-italic">
                    — Nikul Goyani, Founder · Raw Pressery
                </cite>
            </div>

            {/* ── Process ── */}
            <section className="py-28 px-8 md:px-16 max-w-6xl mx-auto">
                <p className="reveal text-[0.68rem] font-bold tracking-[0.4em] uppercase text-orange-500 mb-4">How we do it</p>
                <h2 className="reveal font-serif text-[clamp(2rem,4vw,3rem)] font-black tracking-tight mb-4">
                    The Cold-Press <em>Difference</em></h2>
                <p className="reveal text-base opacity-55 max-w-md leading-[1.7] mb-16">
                    Heat kills enzymes and flattens flavour. We press at 4°C so the mango
                    arrives in your bottle the way it left the tree.
                </p>
                <div className="grid md:grid-cols-3 gap-5">
                    {process.map((p, i) => (
                        <div key={p.num}
                            className="reveal p-10 rounded-3xl bg-[#f7f3ec] dark:bg-[#1a100a]
                         border border-[#1a0f05]/8 dark:border-white/8
                         hover:-translate-y-2 hover:shadow-[0_24px_60px_rgba(255,100,0,0.1)] transition-all"
                            style={{ transitionDelay: `${i * 0.12}s` }}>
                            <p className="font-serif text-5xl font-black mb-5 grad-text">{p.num}</p>
                            <h3 className="text-[1.05rem] font-extrabold mb-3">{p.title}</h3>
                            <p className="text-[0.88rem] leading-[1.75] opacity-60">{p.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── Timeline ── */}
            <section className="py-28 px-8 bg-[#f7f3ec] dark:bg-[#1a100a]
                          border-t border-b border-[#1a0f05]/8 dark:border-white/8">
                <h2 className="reveal font-serif text-[clamp(2rem,4vw,3rem)] font-black tracking-tight text-center mb-18">
                    Our <em className="grad-text">Journey</em></h2>
                <div className="relative max-w-2xl mx-auto mt-16">
                    <div className="absolute left-1/2 top-0 bottom-0 w-px bg-[#1a0f05]/8 dark:bg-white/8 -translate-x-1/2 hidden md:block" />
                    <div className="space-y-16">
                        {timeline.map((t, i) => (
                            <div key={t.year} className={`reveal flex gap-6 md:gap-0 items-start ${t.side === 'right' ? 'md:flex-row-reverse' : ''}`}
                                style={{ transitionDelay: `${i * 0.1}s` }}>
                                <div className={`hidden md:block flex-1 ${t.side === 'left' ? 'text-right pr-10' : 'pl-10'}`}>
                                    <p className="font-serif text-2xl font-black mb-1 grad-text">{t.year}</p>
                                    <p className="text-[0.95rem] font-extrabold mb-2">{t.title}</p>
                                    <p className="text-[0.82rem] leading-[1.7] opacity-55">{t.desc}</p>
                                </div>
                                <div className="relative z-10 w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-red-500
                                flex items-center justify-center text-base flex-shrink-0
                                ring-4 ring-[#f7f3ec] dark:ring-[#1a100a]">{t.icon}</div>
                                <div className="md:hidden flex-1">
                                    <p className="font-serif text-xl font-black mb-1 grad-text">{t.year}</p>
                                    <p className="font-extrabold mb-1">{t.title}</p>
                                    <p className="text-sm leading-[1.7] opacity-55">{t.desc}</p>
                                </div>
                                <div className="hidden md:block flex-1" />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Values ── */}
            <section className="py-28 px-8 md:px-16 max-w-6xl mx-auto">
                <h2 className="reveal font-serif text-[clamp(2rem,4vw,3rem)] font-black tracking-tight text-center mb-16">
                    What We <em className="grad-text">Stand For</em></h2>
                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {values.map((v, i) => (
                        <div key={v.title}
                            className="reveal p-9 rounded-2xl bg-[#f7f3ec] dark:bg-[#1a100a]
                         border border-[#1a0f05]/8 dark:border-white/8"
                            style={{ transitionDelay: `${i * 0.1}s` }}>
                            <p className="text-[2.2rem] mb-4">{v.icon}</p>
                            <h3 className="font-extrabold text-base mb-2.5">{v.title}</h3>
                            <p className="text-[0.85rem] leading-[1.72] opacity-55">{v.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── CTA ── */}
            <section className="py-32 px-8 text-center relative overflow-hidden bg-[#1a0f05]">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px]
                        bg-[radial-gradient(circle,rgba(255,140,0,0.15)_0%,transparent_70%)] rounded-full pointer-events-none" />
                <h2 className="reveal font-serif text-[clamp(2rem,5vw,4rem)] font-black italic text-white mb-5 relative">
                    Ready to taste<br />the <em>real</em> thing?</h2>
                <p className="reveal text-base text-white/50 max-w-md mx-auto leading-[1.7] mb-11 relative">
                    One bottle. No additives. No excuses. The King of Mangoes, cold-pressed and waiting.</p>
                <Link to="/" className="reveal inline-flex items-center gap-3 px-11 py-[18px] rounded-full
                                font-extrabold text-sm tracking-[0.15em] uppercase text-white relative
                                bg-gradient-to-r from-[#ffa100] via-orange-500 to-red-600
                                shadow-[0_12px_40px_rgba(255,100,0,0.4)]
                                hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(255,100,0,0.5)] transition-all">
                    🥭 Get Your Bottle
                </Link>
            </section>

            {/* Footer */}
            <footer className="bg-[#fdfcf9] dark:bg-[#0d0905] border-t border-[#1a0f05]/8 dark:border-white/8
                         py-10 px-8 flex flex-wrap justify-between items-center gap-5
                         text-[0.68rem] font-bold tracking-[0.2em] uppercase opacity-35">
                <p>© 2026 Raw Pressery. All rights reserved.</p>
                <p>Made with <span className="text-red-500">♥</span> by Nikul Goyani</p>
            </footer>

            <style>{`
        .reveal { opacity: 0; transform: translateY(48px);
          transition: opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1); }
        .reveal.visible { opacity: 1; transform: translateY(0); }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-18px)} }
      `}</style>
        </motion.div>
    );
}
