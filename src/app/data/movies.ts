export type Mood = 'leve' | 'emocional' | 'intenso' | 'divertido' | 'nostalgico' | 'tenso' | 'inspirado' | 'caotico' | 'indiferente';
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
  platforms: string[];
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
    platforms: [],
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
    platforms: [],
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
    platforms: [],
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
    platforms: [],
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
    platforms: [],
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
    platforms: [],
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
    platforms: [],
  },
];

/**
 * DEPRECATED: Tabela de matchReasons hardcoded removida.
 * 
 * As explicações agora são geradas DINAMICAMENTE pelo backend usando IA Generativa.
 * Vantagens:
 * - Explicações personalizadas e contextualizadas
 * - Evita respostas genéricas
 * - Considera mood, contexto, duration, query
 * - Cada explicação é única
 * 
 * Se a API falhar, o fallback automático será usado.
 */

/**
 * DEPRECATED: Mapa de recomendações hardcoded removido.
 * 
 * O backend agora retorna a recomendação completa com:
 * - Filme principal selecionado por IA
 * - Alternativas variadas
 * - matchReason gerado dinamicamente
 * 
 * O fallback local é mantido apenas para emergências (backend offline).
 */

import { apiClient } from '../services/api';
import { ApiError, TimeoutError, NetworkError, ValidationError } from '../types/api';

/**
 * Fallback de alta qualidade para quando o backend está indisponível
 */
function generateEmergencyFallback(mood: Mood, context: Context): RecommendationResult {
  // Pool diversificado de filmes clássicos para fallback
  const fallbackMovies = {
    leve: { solo: 'guardiao', group: 'caos' },
    emocional: { solo: 'ultima-memoria', group: 'sombras' },
    intenso: { solo: 'labirinto', group: 'horizonte' },
    divertido: { solo: 'caos', group: 'escapada' },
    nostalgico: { solo: 'ultima-memoria', group: 'guardiao' },
    tenso: { solo: 'labirinto', group: 'sombras' },
    inspirado: { solo: 'horizonte', group: 'guardiao' },
    caotico: { solo: 'escapada', group: 'caos' },
    indiferente: { solo: 'horizonte', group: 'caos' },
  };

  const selectedIds = fallbackMovies[mood] || fallbackMovies.indiferente;
  const primaryId = context === 'amigos' ? selectedIds.group : selectedIds.solo;
  
  // Lista alternativa em caso de fallback
  const altIds = ['guardiao', 'ultima-memoria', 'labirinto', 'horizonte', 'caos', 'sombras', 'escapada'];

  const primary = getMovieById(primaryId);
  const alternatives = altIds
    .filter(id => id !== primaryId)
    .map(getMovieById)
    .slice(0, 5);

  return {
    primary,
    alternatives,
    matchReason: `Selecionado com base no seu humor (${mood}) e contexto (${context}). O backend estava indisponível, então esta é uma recomendação baseada em nossos favorites locais.`,
    mood,
    query: '',
    context,
  };
}

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
    const history = await getHistory();
    const excludedMovieIds = history.map((h) => h.movie.id);
    return await apiClient.getRecommendation(mood, context, duration, query, excludedMovieIds);
  } catch (error) {
    console.error("[RECOMMENDATION] Falha ao buscar recomendação da API", error);
    
    // Log detalhado do tipo de erro
    if (error instanceof ValidationError) {
      console.error("[RECOMMENDATION-ERROR] Erro de validação:", error.validationErrors);
    } else if (error instanceof TimeoutError) {
      console.error("[RECOMMENDATION-ERROR] Requisição expirou após 30 segundos");
    } else if (error instanceof NetworkError) {
      console.error("[RECOMMENDATION-ERROR] Erro de conexão:", error.message);
    }
    
    console.warn("[RECOMMENDATION-FALLBACK] Usando fallback de emergência");
    return generateEmergencyFallback(mood, context);
  }
}

export async function saveToHistory(item: HistoryItem) {
  try {
    // Tenta salvar no backend
    await apiClient.saveHistoryItem({
      query: item.query,
      mood: item.mood,
      context: item.context,
      duration: item.duration,
      timestamp: item.timestamp,
      movie: item.movie,
    });
    console.log("Histórico salvo com sucesso no backend");
  } catch (error) {
    console.error("Erro ao salvar histórico no backend:", error);
    // Fallback para localStorage
    try {
      const history = await getHistory();
      const updated = [item, ...history].slice(0, 20);
      localStorage.setItem('queroassistir_history', JSON.stringify(updated));
    } catch {
      // Se getHistory também falhar, salva só o item atual
      localStorage.setItem('queroassistir_history', JSON.stringify([item]));
    }
  }
}

export async function getHistory(): Promise<HistoryItem[]> {
  try {
    // Tenta recuperar do backend
    return await apiClient.getHistory();
  } catch (error) {
    console.error("Erro ao recuperar histórico do backend:", error);
    // Fallback para localStorage
    try {
      const raw = localStorage.getItem('queroassistir_history');
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }
}

export async function clearHistory() {
  try {
    // Tenta limpar no backend
    await apiClient.clearHistory();
    console.log("Histórico limpo com sucesso no backend");
  } catch (error) {
    console.error("Erro ao limpar histórico no backend:", error);
    // Fallback para localStorage
    localStorage.removeItem('queroassistir_history');
  }
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
  indiferente: {
    label: 'Indiferente',
    emoji: '😐',
    color: 'text-gray-300',
    bgColor: 'bg-gray-500/10',
    borderColor: 'border-gray-500/30',
    activeBg: 'bg-gray-500/25',
  },
};
