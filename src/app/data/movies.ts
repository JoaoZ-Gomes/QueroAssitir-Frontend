export type Mood = 'leve' | 'emocional' | 'intenso' | 'divertido' | 'nostalgico' | 'tenso' | 'inspirado' | 'caotico';
export type Context = 'sozinho' | 'amigos';
export type Duration = 'curto' | 'longo' | 'qualquer';

export interface Movie {
  id: string;
  title: string;
  description: string;
  image: string;
  rating: number;
  genres: string[];
  duration: string;
  durationMinutes: number;
  year: number;
  director: string;
}

export interface RecommendationResult {
  primary: Movie;
  alternatives: Movie[];
  matchReason: string;
  mood: Mood;
  query: string;
  context: Context;
}

export interface HistoryItem {
  id: string;
  query: string;
  mood: Mood;
  context: Context;
  duration: Duration;
  timestamp: number;
  movie: { id: string; title: string; image: string };
}

const IMG = {
  fantasy:
    'https://images.unsplash.com/photo-1768063748336-2864cd51fb26?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYW50YXN5JTIwbWFnaWNhbCUyMGZvcmVzdCUyMG15c3RlcmlvdXN8ZW58MXx8fHwxNzc3NzQ1MzE4fDA&ixlib=rb-4.1.0&q=80&w=1080',
  drama:
    'https://images.unsplash.com/photo-1663090437518-ed2ac8257e14?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbW90aW9uYWwlMjBkcmFtYSUyMHJvbWFuY2UlMjBmaWxtJTIwc3RpbGx8ZW58MXx8fHwxNzc3NzQ1MzE0fDA&ixlib=rb-4.1.0&q=80&w=1080',
  noir: 'https://images.unsplash.com/photo-1774016591231-c00c42c9dba9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaW5lbWF0aWMlMjBkYXJrJTIwZmlsbSUyMG5vaXIlMjBkcmFtYXRpY3xlbnwxfHx8fDE3Nzc3NDUzMTN8MA&ixlib=rb-4.1.0&q=80&w=1080',
  thriller:
    'https://images.unsplash.com/photo-1766878778057-2caacb066ce5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0aHJpbGxlciUyMHN1c3BlbnNlJTIwZGFyayUyMG1vb2R5JTIwc2NlbmV8ZW58MXx8fHwxNzc3NzQ1MzE3fDA&ixlib=rb-4.1.0&q=80&w=1080',
  scifi:
    'https://images.unsplash.com/photo-1759327718818-0cfee2207279?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzY2ktZmklMjBzcGFjZSUyMGZ1dHVyaXN0aWMlMjBkYXJrJTIwY2luZW1hdGljfGVufDF8fHx8MTc3Nzc0NTMxN3ww&ixlib=rb-4.1.0&q=80&w=1080',
  comedy:
    'https://images.unsplash.com/photo-1604715898615-66d2cb50bd41?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21lZHklMjBmdW5ueSUyMG1vdmllJTIwc2NlbmUlMjBjb2xvcmZ1bHxlbnwxfHx8fDE3Nzc3NDUzMTd8MA&ixlib=rb-4.1.0&q=80&w=1080',
  adventure:
    'https://images.unsplash.com/photo-1632770592064-5a98f5b1e66c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZHZlbnR1cmUlMjBhY3Rpb24lMjBtb3ZpZSUyMHNjZW5lJTIwZXBpY3xlbnwxfHx8fDE3Nzc3NDUzMTN8MA&ixlib=rb-4.1.0&q=80&w=1080',
};

export const movies: Movie[] = [
  {
    id: 'guardiao',
    title: 'O Guardião dos Sonhos',
    description:
      'Em um mundo onde sonhos e realidade se mesclam, um jovem descobre ter o poder de entrar nos sonhos alheios. Uma aventura visual deslumbrante sobre esperança, identidade e o poder infinito da imaginação.',
    image: IMG.fantasy,
    rating: 8.2,
    genres: ['Fantasia', 'Aventura', 'Drama'],
    duration: '1h 52min',
    durationMinutes: 112,
    year: 2022,
    director: 'Valentina Cortes',
  },
  {
    id: 'ultima-memoria',
    title: 'A Última Memória',
    description:
      'Uma neurologista descobre que pode apagar memórias dolorosas — até que decide usar a tecnologia em si mesma e perde muito mais do que esperava. Um drama íntimo sobre amor, perda e o que realmente nos torna humanos.',
    image: IMG.drama,
    rating: 8.6,
    genres: ['Drama', 'Romance', 'Ficção Científica'],
    duration: '2h 05min',
    durationMinutes: 125,
    year: 2021,
    director: 'Ana Carvalho',
  },
  {
    id: 'sombras',
    title: 'Sombras da Verdade',
    description:
      'Um fotógrafo de guerra retorna para casa com imagens que ninguém quer ver. À medida que tenta expô-las, percebe que a linha entre documentar e participar do horror é mais tênue do que imaginava.',
    image: IMG.noir,
    rating: 8.4,
    genres: ['Drama', 'Suspense', 'Crime'],
    duration: '2h 10min',
    durationMinutes: 130,
    year: 2023,
    director: 'Marcus Oliveira',
  },
  {
    id: 'labirinto',
    title: 'O Labirinto',
    description:
      'Uma detetive obcecada persegue um criminoso genial que parece sempre um passo à frente. Cada pista leva a um novo mistério. Uma jornada visceral que questiona os limites entre justiça e obsessão.',
    image: IMG.thriller,
    rating: 8.7,
    genres: ['Thriller', 'Mistério', 'Crime'],
    duration: '2h 18min',
    durationMinutes: 138,
    year: 2022,
    director: 'Roberto Farias',
  },
  {
    id: 'horizonte',
    title: 'Além do Horizonte',
    description:
      'Em 2187, uma equipe de astronautas recebe uma transmissão de um planeta que não deveria existir. O que começa como uma missão de exploração se torna uma batalha pela sobrevivência da espécie humana.',
    image: IMG.scifi,
    rating: 8.9,
    genres: ['Ficção Científica', 'Ação', 'Aventura'],
    duration: '2h 35min',
    durationMinutes: 155,
    year: 2023,
    director: 'Felipe Santos',
  },
  {
    id: 'caos',
    title: 'Caos Perfeito',
    description:
      'Quando cinco amigos planejam uma viagem "relaxante", tudo que pode dar errado, dá. Uma comédia caótica e cheia de coração sobre amizade, imprevistos e as melhores histórias para contar depois.',
    image: IMG.comedy,
    rating: 7.8,
    genres: ['Comédia', 'Aventura', 'Romance'],
    duration: '1h 42min',
    durationMinutes: 102,
    year: 2022,
    director: 'Camila Rocha',
  },
  {
    id: 'escapada',
    title: 'A Grande Escapada',
    description:
      'Um ex-agente secreto é forçado a sair da aposentadoria para salvar sua filha. O problema? Ela não quer ser salva. Uma aventura explosiva com humor afiado e muito coração.',
    image: IMG.adventure,
    rating: 7.9,
    genres: ['Ação', 'Comédia', 'Aventura'],
    duration: '1h 55min',
    durationMinutes: 115,
    year: 2023,
    director: 'Diego Mendes',
  },
];

const matchReasons: Record<string, Record<Mood, string>> = {
  guardiao: {
    leve: 'Para quando você quer escapar da realidade sem peso emocional — este filme é uma janela para um mundo cheio de beleza e esperança. Perfeito para relaxar a mente.',
    emocional: 'Existe uma profundidade emocional aqui que vai tocar seu coração sem te deixar exausto. Uma jornada que conecta.',
    intenso: 'Visualmente deslumbrante, com uma narrativa que crescerá em você depois que os créditos rolarem. Uma intensidade silenciosa.',
    divertido: 'Uma aventura encantadora que diverte sem abrir mão de uma história com alma. Você vai sorrir muito.',
    nostalgico: 'A estética mágica evoca uma sensação de maravilha que lembra os contos de fadas da infância. Uma nostalgia doce.',
    tenso: 'A incerteza entre o sonho e a realidade cria uma tensão constante sobre o que é real. Hipnotizante.',
    inspirado: 'Um lembrete poderoso de que nossa imaginação não tem limites. Ideal para reacender sua faísca criativa.',
    caotico: 'A mistura de mundos oníricos cria uma experiência visual vibrante e imprevisível.',
  },
  'ultima-memoria': {
    leve: 'Uma história que vai te fazer pensar, mas também sorrir — especialmente nas cenas de romance e conexão humana.',
    emocional: 'Poucos filmes capturam tão bem a dor de perder alguém que ainda está presente. Tenha lenços por perto — você vai precisar.',
    intenso: 'A tensão narrativa aumenta gradualmente até um terceiro ato devastadoramente belo. Emocionalmente arrebatador.',
    divertido: 'Tem momentos de leveza genuína que equilibram perfeitamente o peso emocional. Um equilíbrio raro e precioso.',
    nostalgico: 'Uma reflexão sobre como nossas memórias moldam quem somos. Perfeito para um momento contemplativo.',
    tenso: 'O medo de perder a própria identidade cria um suspense psicológico que prende do início ao fim.',
    inspirado: 'Uma obra que nos faz valorizar cada pequena lembrança e conexão que temos na vida.',
    caotico: 'A fragmentação das memórias da protagonista cria um ritmo narrativo único e desafiador.',
  },
  sombras: {
    leve: 'Mesmo com seu tema sério, há uma serenidade contemplativa que transforma este filme em uma experiência meditativa.',
    emocional: 'Uma reflexão profunda sobre culpa, responsabilidade e redenção. Te fará sentir tudo ao mesmo tempo — intensamente.',
    intenso: 'A tensão moral é constante e perturbadora — exatamente o tipo de filme que fica em sua cabeça por dias. Impactante.',
    divertido: 'Apesar do tema, tem momentos de ironia e humanidade genuína que aliviam sem diminuir a potência da história.',
    nostalgico: 'Retrata um tempo e um lugar com uma crueza que parece um registro histórico necessário e marcante.',
    tenso: 'Um suspense ético onde cada escolha do fotógrafo pode ter consequências fatais. Altamente tenso.',
    inspirado: 'A busca pela verdade, custe o que custar, é um chamado à coragem e integridade.',
    caotico: 'O caos da guerra é retratado de forma visceral, desconstruindo qualquer senso de ordem.',
  },
  labirinto: {
    leve: 'Mesmo sendo um thriller, tem um ritmo hipnótico que te envolve sem sobrecarregar. Uma experiência elegante.',
    emocional: 'A protagonista tem uma jornada emocional devastadora que vai muito além do gênero policial. Tocante e sombrio.',
    intenso: 'Prepare-se para ficar na beira do sofá do começo ao fim. Um thriller construído com maestria absoluta. Imperdível.',
    divertido: 'A química entre os personagens tem momentos genuinamente divertidos em meio ao suspense mais tenso.',
    nostalgico: 'Bebe na fonte dos grandes clássicos do cinema noir, trazendo uma atmosfera clássica e envolvente.',
    tenso: 'Um jogo de gato e rato onde você nunca sabe quem é o predador. Tensão em estado puro.',
    inspirado: 'A dedicação incansável à resolução do mistério é um exemplo de foco e determinação.',
    caotico: 'A trama se desenrola em um labirinto de pistas falsas e reviravoltas que desafiam a lógica.',
  },
  horizonte: {
    leve: 'A escala do universo neste filme é tão majestosa que transforma qualquer problema cotidiano em pó. Libertador.',
    emocional: 'No fundo de toda a ficção científica épica, é uma história profundamente humana sobre fé, sacrifício e amor.',
    intenso: 'Uma obra-prima técnica e narrativa que vai demandar toda sua atenção — e vai recompensar cada segundo. Extraordinário.',
    divertido: 'Explosivo, espetacular e com um ritmo que não te deixa respirar. Cinema puro na sua forma mais poderosa.',
    nostalgico: 'Uma homenagem às grandes epopeias espaciais do passado, com um olhar moderno e grandioso.',
    tenso: 'O isolamento no espaço profundo cria uma atmosfera de claustrofobia e perigo iminente.',
    inspirado: 'Nos faz olhar para as estrelas e acreditar no potencial infinito da exploração humana.',
    caotico: 'Batalhas espaciais e anomalias cósmicas criam um espetáculo de ação e caos visual.',
  },
  caos: {
    leve: 'Exatamente o que o médico receitou: humor leve, coração quente e histórias que te fazem rir de verdade. Perfeito.',
    emocional: 'Escondida atrás das gargalhadas, tem uma história sobre amizade que vai te emocionar genuinamente no final.',
    intenso: 'Para quando você precisa de uma válvula de escape — ri, chora e se diverte sem parar. Uma montanha-russa deliciosa.',
    divertido: 'A escolha perfeita para rir até doer a barriga com quem você gosta. Impossível não se identificar com o grupo.',
    nostalgico: 'Lembra aquelas viagens inesquecíveis com amigos que guardamos com carinho na memória.',
    tenso: 'A sucessão de erros e mal-entendidos cria uma ansiedade cômica que é impossível de ignorar.',
    inspirado: 'Celebra a ideia de que, mesmo no meio do caos, o que importa são as pessoas ao nosso redor.',
    caotico: 'O título diz tudo: uma sucessão de eventos absurdos que transformam tudo em uma grande confusão divertida.',
  },
  escapada: {
    leve: 'Adrenalina pura embalada num pacote leve e divertido. Ação sem o peso usual do gênero. Fácil de amar.',
    emocional: 'Por baixo de toda a ação explosiva, é uma história comovente sobre uma relação pai-filha cheia de nuances.',
    intenso: 'Sequências de ação construídas com maestria e um nível de tensão que mantém você completamente grudado.',
    divertido: 'Impossível não sorrir — a dinâmica cômica funciona perfeitamente e te mantém entretido do início ao fim. Incrível.',
    nostalgico: 'Traz de volta o espírito dos filmes de ação dos anos 90, com heróis carismáticos e vilões marcantes.',
    tenso: 'Cada fuga é um exercício de sobrevivência que mantém o coração acelerado.',
    inspirado: 'A jornada de redenção do protagonista mostra que nunca é tarde para consertar erros do passado.',
    caotico: 'Perseguições alucinantes e explosões fazem deste filme uma descarga de energia pura e caótica.',
  },
};

type RecommendationMap = Record<Mood, { solo: string; group: string; altIds: string[] }>;

const recommendationMap: RecommendationMap = {
  leve: { solo: 'guardiao', group: 'caos', altIds: ['ultima-memoria', 'horizonte', 'escapada'] },
  emocional: { solo: 'ultima-memoria', group: 'sombras', altIds: ['guardiao', 'labirinto', 'sombras'] },
  intenso: { solo: 'labirinto', group: 'horizonte', altIds: ['sombras', 'escapada', 'ultima-memoria'] },
  divertido: { solo: 'caos', group: 'escapada', altIds: ['guardiao', 'horizonte', 'caos'] },
  nostalgico: { solo: 'ultima-memoria', group: 'guardiao', altIds: ['sombras', 'caos', 'labirinto'] },
  tenso: { solo: 'labirinto', group: 'sombras', altIds: ['horizonte', 'escapada', 'ultima-memoria'] },
  inspirado: { solo: 'horizonte', group: 'guardiao', altIds: ['ultima-memoria', 'escapada', 'caos'] },
  caotico: { solo: 'escapada', group: 'caos', altIds: ['labirinto', 'horizonte', 'guardiao'] },
};

function getMovieById(id: string): Movie {
  return movies.find((m) => m.id === id) || movies[0];
}

export async function getRecommendation(
  mood: Mood,
  context: Context,
  duration: Duration,
  query: string
): Promise<RecommendationResult> {
  try {
    const response = await fetch('http://localhost:8080/api/recommendations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ mood, context, duration, query }),
    });

    if (!response.ok) {
      throw new Error(`Erro na API: ${response.status}`);
    }

    const data = await response.json();
    return data as RecommendationResult;
  } catch (error) {
    console.error("Falha ao buscar recomendação. Usando fallback local.", error);
    
    // Fallback local caso o backend esteja desligado ou dê erro
    const map = recommendationMap[mood];
    let primaryId = context === 'amigos' ? map.group : map.solo;

    // Duration adjustment
    const candidate = getMovieById(primaryId);
    if (duration === 'curto' && candidate.durationMinutes > 115) {
      const shorter = map.altIds
        .map(getMovieById)
        .find((m) => m.durationMinutes <= 115);
      if (shorter) primaryId = shorter.id;
    } else if (duration === 'longo' && candidate.durationMinutes < 120) {
      const longer = map.altIds.map(getMovieById).find((m) => m.durationMinutes >= 120);
      if (longer) primaryId = longer.id;
    }

    const primary = getMovieById(primaryId);
    const alternatives = map.altIds
      .filter((id) => id !== primaryId)
      .map(getMovieById)
      .slice(0, 3);

    return {
      primary,
      alternatives,
      matchReason:
        matchReasons[primaryId]?.[mood] ||
        'Este filme foi escolhido especialmente para o seu momento atual.',
      mood,
      query,
      context,
    };
  }
}

export function saveToHistory(item: HistoryItem) {
  const history = getHistory();
  const updated = [item, ...history].slice(0, 20);
  localStorage.setItem('qaerosistir_history', JSON.stringify(updated));
}

export function getHistory(): HistoryItem[] {
  try {
    const raw = localStorage.getItem('qaerosistir_history');
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function clearHistory() {
  localStorage.removeItem('qaerosistir_history');
}

export const moodConfig: Record<Mood, { label: string; emoji: string; color: string; bgColor: string; borderColor: string; activeBg: string }> = {
  leve: {
    label: 'Leve',
    emoji: '🌤️',
    color: 'text-sky-300',
    bgColor: 'bg-sky-500/10',
    borderColor: 'border-sky-500/30',
    activeBg: 'bg-sky-500/25',
  },
  emocional: {
    label: 'Emocional',
    emoji: '💙',
    color: 'text-blue-300',
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-500/30',
    activeBg: 'bg-blue-500/25',
  },
  intenso: {
    label: 'Intenso',
    emoji: '⚡',
    color: 'text-amber-300',
    bgColor: 'bg-amber-500/10',
    borderColor: 'border-amber-500/30',
    activeBg: 'bg-amber-500/25',
  },
  divertido: {
    label: 'Divertido',
    emoji: '😂',
    color: 'text-green-300',
    bgColor: 'bg-green-500/10',
    borderColor: 'border-green-500/30',
    activeBg: 'bg-green-500/25',
  },
  nostalgico: {
    label: 'Nostálgico',
    emoji: '🎞️',
    color: 'text-orange-300',
    bgColor: 'bg-orange-500/10',
    borderColor: 'border-orange-500/30',
    activeBg: 'bg-orange-500/25',
  },
  tenso: {
    label: 'Tenso',
    emoji: '😱',
    color: 'text-red-300',
    bgColor: 'bg-red-500/10',
    borderColor: 'border-red-500/30',
    activeBg: 'bg-red-500/25',
  },
  inspirado: {
    label: 'Inspirado',
    emoji: '✨',
    color: 'text-purple-300',
    bgColor: 'bg-purple-500/10',
    borderColor: 'border-purple-500/30',
    activeBg: 'bg-purple-500/25',
  },
  caotico: {
    label: 'Caótico',
    emoji: '🌪️',
    color: 'text-indigo-300',
    bgColor: 'bg-indigo-500/10',
    borderColor: 'border-indigo-500/30',
    activeBg: 'bg-indigo-500/25',
  },
};
