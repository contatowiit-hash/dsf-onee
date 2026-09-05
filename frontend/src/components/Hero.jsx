import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Zap, ArrowDown } from "lucide-react";
import { EASE } from "@/components/Reveal";

function EnergyCanvas() {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");
    let w = 0;
    let h = 0;
    let raf;
    let nodes = [];
    const mouse = { x: 0.5, y: 0.5 };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.offsetWidth;
      h = canvas.offsetHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const count = window.innerWidth < 640 ? 32 : 58;
    nodes = Array.from({ length: count }, () => ({
      x: Math.random(),
      y: Math.random(),
      vx: (Math.random() - 0.5) * 0.0007,
      vy: (Math.random() - 0.5) * 0.0007,
      r: 1.2 + Math.random() * 2.2,
      c: Math.random() < 0.72 ? "163,190,0" : "0,180,205",
    }));

    const onMove = (e) => {
      mouse.x = e.clientX / window.innerWidth;
      mouse.y = e.clientY / window.innerHeight;
    };
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMove);

    const tick = () => {
      ctx.clearRect(0, 0, w, h);
      const px = (mouse.x - 0.5) * 26;
      const py = (mouse.y - 0.5) * 26;

      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > 1) n.vx *= -1;
        if (n.y < 0 || n.y > 1) n.vy *= -1;
      }

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const d = Math.hypot((a.x - b.x) * w, (a.y - b.y) * h);
          if (d < 140) {
            ctx.strokeStyle = `rgba(11,15,23,${0.1 * (1 - d / 140)})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x * w + px * (a.y - 0.5), a.y * h + py * (a.x - 0.5));
            ctx.lineTo(b.x * w + px * (b.y - 0.5), b.y * h + py * (b.x - 0.5));
            ctx.stroke();
          }
        }
      }

      for (const n of nodes) {
        const x = n.x * w + px * (n.y - 0.5);
        const y = n.y * h + py * (n.x - 0.5);
        ctx.beginPath();
        ctx.fillStyle = `rgba(${n.c},0.85)`;
        ctx.shadowColor = `rgba(${n.c},0.7)`;
        ctx.shadowBlur = 12;
        ctx.arc(x, y, n.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className="absolute inset-0 h-full w-full"
      style={{
        maskImage: "radial-gradient(ellipse 90% 80% at 60% 40%, black 30%, transparent 100%)",
        WebkitMaskImage: "radial-gradient(ellipse 90% 80% at 60% 40%, black 30%, transparent 100%)",
      }}
    />
  );
}

const MaskedLine = ({ children, delay }) => (
  <span className="block overflow-hidden pb-1">
    <motion.span
      initial={{ y: "110%" }}
      animate={{ y: 0 }}
      transition={{ duration: 0.9, delay, ease: EASE }}
      className="block"
    >
      {children}
    </motion.span>
  </span>
);

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 130]);
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  return (
    <section id="topo" ref={ref} className="relative flex min-h-[100svh] items-center overflow-hidden pt-[68px]">
      <EnergyCanvas />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 top-1/4 h-[420px] w-[420px] rounded-full bg-volt/25 blur-[130px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 bottom-0 h-[360px] w-[360px] rounded-full bg-cyber/15 blur-[120px]"
      />

      <motion.div
        style={{ y, opacity }}
        className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-24 pt-16 sm:px-6 lg:px-8"
      >
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-ink/10 bg-white/70 py-2 pl-2.5 pr-5 backdrop-blur"
          data-testid="hero-badge"
        >
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-volt">
            <Zap className="h-3.5 w-3.5 text-ink" fill="currentColor" />
          </span>
          <span className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-ink">
            Preparação independente • 8º e 9º ano
          </span>
        </motion.div>

        <h1 className="max-w-4xl font-display text-4xl font-extrabold leading-[1.06] tracking-tight sm:text-6xl lg:text-7xl">
          <MaskedLine delay={0.1}>Prepare-se para</MaskedLine>
          <MaskedLine delay={0.22}>a ONEE sem estudar</MaskedLine>
          <MaskedLine delay={0.34}>
            <span className="inline-flex items-baseline gap-3">
              <span className="relative inline-block">
                <span className="relative z-10">no escuro.</span>
                <motion.span
                  aria-hidden="true"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.7, delay: 1.05, ease: EASE }}
                  className="absolute -inset-x-2 bottom-1 top-1 z-0 origin-left -rotate-1 rounded-md bg-volt"
                  style={{ zIndex: -1 }}
                />
              </span>
              <motion.span
                initial={{ opacity: 0, scale: 0, rotate: -30 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 0.6, delay: 1.2, ease: EASE }}
                className="inline-flex"
              >
                <Zap className="h-9 w-9 text-ink sm:h-12 sm:w-12" fill="#CCFF00" />
              </motion.span>
            </span>
          </MaskedLine>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.75, ease: EASE }}
          className="mt-7 max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg"
          data-testid="hero-subtitle"
        >
          Um método de preparação independente com aulas objetivas, questões e simulados para você
          chegar muito mais preparado para a Olimpíada Nacional de Eficiência Energética.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.9, ease: EASE }}
          className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center"
        >
          <a
            href="#oferta"
            data-testid="hero-primary-cta"
            className="pulse-glow group flex items-center justify-center gap-2.5 rounded-full bg-ink px-8 py-4 font-display text-base font-extrabold text-white transition-all duration-200 hover:-translate-y-1 hover:bg-volt hover:text-ink active:translate-y-0 active:scale-[0.97] sm:text-lg"
          >
            QUERO ME PREPARAR
            <Zap
              className="h-5 w-5 text-volt transition-all duration-200 group-hover:rotate-12 group-hover:text-ink"
              fill="currentColor"
            />
          </a>
          <a
            href="#como-funciona"
            data-testid="hero-secondary-cta"
            className="group flex items-center justify-center gap-2.5 rounded-full border-2 border-ink/15 bg-white/60 px-8 py-4 font-display text-base font-extrabold text-ink backdrop-blur transition-all duration-200 hover:-translate-y-1 hover:border-ink active:translate-y-0 active:scale-[0.97] sm:text-lg"
          >
            VER COMO FUNCIONA
            <ArrowDown className="h-5 w-5 transition-transform duration-200 group-hover:translate-y-0.5" />
          </a>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.15 }}
          className="mt-7 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-slate-500 sm:text-xs"
          data-testid="hero-proof-line"
        >
          Conteúdo direto ao ponto • Questões • Simulados • Revisões
        </motion.p>
      </motion.div>
    </section>
  );
}
