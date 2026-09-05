import { useState } from "react";
import { motion } from "framer-motion";
import { FLASHCARDS } from "@/course/data/content";
import { ArrowLeft, ArrowRight, Shuffle, RotateCw } from "lucide-react";

export default function Flashcards() {
  const [cards, setCards] = useState(FLASHCARDS);
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const go = (dir) => {
    setFlipped(false);
    setIndex((i) => (i + dir + cards.length) % cards.length);
  };

  const shuffle = () => {
    setCards((c) => [...c].sort(() => Math.random() - 0.5));
    setIndex(0);
    setFlipped(false);
  };

  const card = cards[index];

  return (
    <div className="space-y-8" data-testid="flashcards-page">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
            Flashcards
          </h1>
          <p className="mt-1 text-muted-foreground">
            Toque no card para virar. Revise até lembrar de tudo sem olhar.
          </p>
        </div>
        <button
          onClick={shuffle}
          className="flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-foreground"
          data-testid="flashcards-shuffle"
        >
          <Shuffle className="h-4 w-4" /> Embaralhar
        </button>
      </div>

      <div className="mx-auto max-w-lg">
        <button
          onClick={() => setFlipped(!flipped)}
          className="block w-full [perspective:1200px]"
          data-testid="flashcard"
        >
          <motion.div
            animate={{ rotateY: flipped ? 180 : 0 }}
            transition={{ duration: 0.5 }}
            className="relative h-72 w-full [transform-style:preserve-3d] sm:h-80"
          >
            <div className="absolute inset-0 flex flex-col items-center justify-center rounded-3xl border-2 border-foreground/10 bg-card p-8 text-center [backface-visibility:hidden]">
              <p className="font-mono text-xs font-bold uppercase tracking-widest text-muted-foreground">
                Pergunta
              </p>
              <p className="mt-4 font-display text-xl font-extrabold leading-snug text-foreground sm:text-2xl">
                {card.front}
              </p>
              <p className="mt-6 flex items-center gap-2 text-xs text-muted-foreground">
                <RotateCw className="h-3.5 w-3.5" /> tocar para ver a resposta
              </p>
            </div>
            <div className="absolute inset-0 flex flex-col items-center justify-center rounded-3xl bg-ink p-8 text-center [backface-visibility:hidden] [transform:rotateY(180deg)]">
              <p className="font-mono text-xs font-bold uppercase tracking-widest text-volt">
                Resposta
              </p>
              <p className="mt-4 text-base leading-relaxed text-white sm:text-lg">{card.back}</p>
            </div>
          </motion.div>
        </button>

        <div className="mt-6 flex items-center justify-between">
          <button
            onClick={() => go(-1)}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:border-foreground"
            aria-label="Card anterior"
            data-testid="flashcard-prev"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <p className="font-mono text-sm font-bold text-muted-foreground" data-testid="flashcard-counter">
            {index + 1} / {cards.length}
          </p>
          <button
            onClick={() => go(1)}
            className="flex h-11 w-11 items-center justify-center rounded-full bg-ink text-volt transition-transform hover:scale-105"
            aria-label="Próximo card"
            data-testid="flashcard-next"
          >
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
