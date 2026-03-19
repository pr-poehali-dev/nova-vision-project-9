import { useEffect, useState } from 'react';
import SlideCard from '@/components/SlideCard';

const slides = [
  {
    number: 1,
    title: 'Введение',
    code: 'import this',
    description: 'Дзен Python и философия лаконичного кода',
  },
  {
    number: 2,
    title: 'List Comprehension',
    code: '[x**2 for x in range(10)]',
    description: 'Генераторы списков — мощь в одну строку',
  },
  {
    number: 3,
    title: 'Lambda-функции',
    code: 'f = lambda x: x * 2',
    description: 'Анонимные функции и функциональный стиль',
  },
  {
    number: 4,
    title: 'map и filter',
    code: 'list(map(str, range(5)))',
    description: 'Преобразование и фильтрация данных',
  },
  {
    number: 5,
    title: 'Тернарный оператор',
    code: 'x = "да" if n > 0 else "нет"',
    description: 'Условия в одну строку без if/else блоков',
  },
  {
    number: 6,
    title: 'Срезы строк',
    code: 's[::-1]',
    description: 'Реверс и манипуляции строками через слайсы',
  },
  {
    number: 7,
    title: 'zip и enumerate',
    code: 'list(zip(a, b))',
    description: 'Параллельный обход коллекций',
  },
  {
    number: 8,
    title: 'Dict Comprehension',
    code: '{k: v for k,v in d.items()}',
    description: 'Генераторы словарей и работа с данными',
  },
  {
    number: 9,
    title: 'Walrus-оператор',
    code: 'if n := len(a): print(n)',
    description: 'Присваивание внутри выражений (Python 3.8+)',
  },
  {
    number: 10,
    title: 'Распаковка',
    code: 'a, *b, c = [1,2,3,4,5]',
    description: 'Элегантная распаковка коллекций',
  },
  {
    number: 11,
    title: 'Заключение',
    code: 'print("Код — это поэзия")',
    description: 'Практика однострочников в реальных проектах',
  },
];

type Dimensions = { radius: number; cardSize: number };

const Index = () => {
  const [dimensions, setDimensions] = useState<Dimensions>({ radius: 480, cardSize: 130 });
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    const handle = () => {
      const w = window.innerWidth;
      if (w < 640) setDimensions({ radius: 220, cardSize: 80 });
      else if (w < 1024) setDimensions({ radius: 340, cardSize: 105 });
      else setDimensions({ radius: 480, cardSize: 130 });
    };
    handle();
    window.addEventListener('resize', handle);
    return () => window.removeEventListener('resize', handle);
  }, []);

  const count = slides.length;
  const startAngle = 20;
  const endAngle = 160;
  const step = (endAngle - startAngle) / (count - 1);

  return (
    <main className="relative min-h-screen bg-background overflow-hidden flex flex-col">

      {/* Decorative background glows */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-secondary/10 blur-3xl" />
        <div className="absolute top-10 left-10 w-48 h-48 rounded-full bg-primary/10 blur-2xl" />
        <div className="absolute top-10 right-10 w-48 h-48 rounded-full bg-primary/10 blur-2xl" />
      </div>

      {/* Arc of slides */}
      <div
        className="relative mx-auto w-full flex-shrink-0"
        style={{ height: dimensions.radius * 1.15 }}
      >
        <div className="absolute left-1/2 bottom-0 -translate-x-1/2">
          {slides.map((slide, i) => {
            const angle = startAngle + step * i;
            const angleRad = (angle * Math.PI) / 180;
            const x = Math.cos(angleRad) * dimensions.radius;
            const y = Math.sin(angleRad) * dimensions.radius;
            const isActive = active === i;

            return (
              <div
                key={i}
                className="absolute opacity-0 animate-fade-in-up cursor-pointer"
                style={{
                  width: dimensions.cardSize,
                  height: dimensions.cardSize,
                  left: `calc(50% + ${x}px)`,
                  bottom: `${y}px`,
                  transform: `translate(-50%, 50%)`,
                  animationDelay: `${i * 80}ms`,
                  animationFillMode: 'forwards',
                  zIndex: isActive ? 50 : count - i,
                  transition: 'z-index 0s',
                }}
                onMouseEnter={() => setActive(i)}
                onMouseLeave={() => setActive(null)}
              >
                <div
                  className="rounded-2xl shadow-xl overflow-hidden w-full h-full transition-all duration-300"
                  style={{
                    transform: `rotate(${angle / 4}deg) scale(${isActive ? 1.18 : 1})`,
                    boxShadow: isActive
                      ? '0 0 24px 4px rgba(251,191,36,0.45), 0 8px 32px rgba(0,0,0,0.5)'
                      : '0 4px 24px rgba(0,0,0,0.4)',
                    border: isActive ? '1.5px solid #FBBF24' : '1px solid rgba(255,255,255,0.08)',
                  }}
                >
                  <SlideCard {...slide} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Hero text */}
      <div
        className="relative z-10 flex-1 flex items-start justify-center px-6 opacity-0 animate-fade-in"
        style={{ animationDelay: '1000ms', animationFillMode: 'forwards', marginTop: '-6rem' }}
      >
        <div className="text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/40 bg-primary/10 mb-4">
            <span className="mono text-primary text-xs font-semibold tracking-widest">PYTHON · УЧЕБНИК</span>
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-tight">
            Однострочники <span className="text-primary">Python</span>
          </h1>
          <p className="mt-4 text-base sm:text-lg text-muted-foreground max-w-xl mx-auto">
            Учебник знакомит студентов с искусством лаконичного кода —<br className="hidden sm:block" />
            от генераторов списков до продвинутых техник Python.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
            <div className="px-5 py-2.5 rounded-full bg-primary text-primary-foreground font-semibold text-sm shadow-lg shadow-primary/30">
              11 тем · Практика · Реальный код
            </div>
            <div className="px-5 py-2.5 rounded-full border border-border text-muted-foreground text-sm mono">
              Кристиан Майер
            </div>
          </div>
          <p className="mt-6 text-xs text-muted-foreground/60 mono">
            Наведите курсор на карточку, чтобы рассмотреть тему
          </p>
        </div>
      </div>
    </main>
  );
};

export default Index;
