import { Github, Linkedin, BookOpen, Mail } from 'lucide-react';

export function ContactSection() {
  return (
    <section
      id="contact"
      className="border-t border-white/[0.06] py-28"
    >
      <div className="mx-auto w-[min(700px,92%)] text-center">
        {/* Title */}
        <h2 className="reveal text-[2rem] md:text-[2.6rem] font-semibold tracking-tight mb-5">
          Get In Touch
        </h2>

        {/* Subtitle */}
        <p className="reveal text-zinc-400 text-base leading-relaxed max-w-lg mx-auto mb-10">
          I&apos;m always open to discussing FPGA and hardware design roles, research
          collaborations, and engineering opportunities across RTL, ASIC, and
          low-latency systems.
        </p>

        {/* "Say Hello" pill button — matches reference exactly */}
        <a
          href="mailto:chandrakirannarala@gmail.com"
          className="reveal inline-flex items-center gap-2.5 rounded-full bg-white px-8 py-4 text-base font-semibold text-black hover:bg-zinc-100 transition-colors duration-200 shadow-lg"
        >
          <Mail size={18} />
          Say Hello
        </a>

        {/* Social icon circles */}
        <div className="reveal mt-10 flex items-center justify-center gap-4">
          <a
            href="#"
            aria-label="GitHub"
            className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 text-zinc-400 hover:border-white/25 hover:text-white transition-all duration-200"
          >
            <Github size={18} />
          </a>
          <a
            href="#"
            aria-label="LinkedIn"
            className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 text-zinc-400 hover:border-white/25 hover:text-white transition-all duration-200"
          >
            <Linkedin size={18} />
          </a>
          <a
            href="#"
            aria-label="Resume"
            className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 text-zinc-400 hover:border-white/25 hover:text-white transition-all duration-200"
          >
            <BookOpen size={18} />
          </a>
        </div>

        {/* Footer line */}
        <p className="reveal mt-16 text-zinc-600 text-sm">
          © {new Date().getFullYear()} Chandra Kiran Narala. Built with Next.js &amp; Tailwind.
        </p>
      </div>
    </section>
  );
}
