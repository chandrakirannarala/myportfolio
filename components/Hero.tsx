'use client';

import { useEffect, useRef } from 'react';

export function Hero() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    // Trigger reveal on mount
    const els = ref.current?.querySelectorAll('.reveal');
    els?.forEach((el, i) => {
      setTimeout(() => el.classList.add('visible'), i * 100);
    });
  }, []);

  return (
    <section
      ref={ref}
      id="hero"
      className="mx-auto w-[min(900px,92%)] pt-40 pb-28"
    >
      <p className="reveal text-zinc-400 text-base mb-4 tracking-wide">
        Chandra Kiran Narala
      </p>

      <h1 className="reveal text-[2.5rem] md:text-[3.5rem] font-semibold leading-[1.15] tracking-tight max-w-3xl">
        FPGA Engineer &amp; Hardware-Aware Systems Engineer
      </h1>

      <p className="reveal mt-6 text-lg text-zinc-400 leading-relaxed max-w-2xl">
        I design and optimize high-performance digital systems across FPGA, ASIC, RTL, embedded platforms, and low-latency software.
      </p>

      <div className="reveal mt-10 flex flex-wrap gap-3">
        {[
          { label: 'Resume',   href: '/myresume.pdf' },
          { label: 'GitHub',   href: 'https://github.com/chandrakirannarala' },
          { label: 'LinkedIn', href: 'https://linkedin.com/in/chandrakirannarala' },
          { label: 'Contact',  href: '#contact' },
        ].map((item) => (
          <a
            key={item.label}
            href={item.href}
            className="rounded-full border border-white/10 bg-white/[0.04] px-5 py-2.5 text-sm text-zinc-300 hover:border-white/25 hover:text-white hover:bg-white/[0.08] transition-all duration-200"
          >
            {item.label}
          </a>
        ))}
      </div>
    </section>
  );
}
