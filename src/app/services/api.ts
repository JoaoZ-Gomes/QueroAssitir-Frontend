import type { Mood, Context, Duration, RecommendationResult, HistoryItem, Movie } from '../data/movies';
import { ApiResponse, ApiError, ValidationError, TimeoutError, NetworkError } from '../types/api';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://queroassitir-backend.onrender.com';
const REQUEST_TIMEOUT = 30000; // 30 segundos

class ApiClient {
  private baseUrl: string;
  private timeout: number;

  constructor(baseUrl: string = API_BASE_URL, timeout: number = REQUEST_TIMEOUT) {
    this.baseUrl = baseUrl;
    this.timeout = timeout;
  }

  /**
   * Método genérico para fazer requisições
   */
  private async request<T>(
    endpoint: string,
    options: RequestInit & { timeout?: number } = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    const timeout = options.timeout || this.timeout;
    delete options.timeout;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
      });

      clearTimeout(timeoutId);

      // Tentar fazer parse do JSON
      let data;
      try {
        data = await response.json();
      } catch {
        data = null;
      }

      // Se a resposta não foi OK, lançar erro
      if (!response.ok) {
        if (data?.validationErrors) {
          throw new ValidationError(data.validationErrors);
        }
        throw new ApiError(
          response.status,
          data?.message || `HTTP ${response.status}: ${response.statusText}`,
          data
        );
      }

      return data as T;
    } catch (error) {
      clearTimeout(timeoutId);

      if (error instanceof ApiError) {
        throw error;
      }

      if (error instanceof DOMException && error.name === 'AbortError') {
        throw new TimeoutError();
      }

      throw new NetworkError(error instanceof Error ? error.message : 'Erro desconhecido');
    }
  }

  /**
   * GET - Obter recomendação
   */
  async getRecommendation(
    mood: Mood,
    context: Context,
    duration: Duration,
    query: string,
    excludedMovieIds?: string[]
  ): Promise<RecommendationResult> {
    const response = await this.request<ApiResponse<RecommendationResult>>('/api/recommendations', {
      method: 'POST',
      body: JSON.stringify({ mood, context, duration, query, excludedMovieIds }),
    });

    return response.data;
  }

  /**
   * GET - Obter histórico completo
   */
  async getHistory(): Promise<HistoryItem[]> {
    const response = await this.request<ApiResponse<HistoryItem[]>>('/api/history', {
      method: 'GET',
    });

    return response.data;
  }

  /**
   * POST - Salvar item no histórico
   */
  async saveHistoryItem(item: Omit<HistoryItem, 'id'>): Promise<HistoryItem> {
    const response = await this.request<ApiResponse<HistoryItem>>('/api/history', {
      method: 'POST',
      body: JSON.stringify({
        query: item.query,
        mood: item.mood,
        context: item.context,
        duration: item.duration,
        filmeId: item.movie.id,
        filmeTitulo: item.movie.title,
        filmeImagem: item.movie.image,
      }),
    });

    return response.data;
  }

  /**
   * DELETE - Deletar item do histórico
   */
  async deleteHistoryItem(id: string): Promise<void> {
    await this.request<ApiResponse<null>>(`/api/history/${id}`, {
      method: 'DELETE',
    });
  }

  /**
   * DELETE - Limpar todo o histórico
   */
  async clearHistory(): Promise<void> {
    await this.request<ApiResponse<null>>('/api/history', {
      method: 'DELETE',
    });
  }

  /**
   * GET - Listar todos os filmes
   */
  async getMovies(): Promise<Movie[]> {
    const response = await this.request<ApiResponse<Movie[]>>('/api/movies', {
      method: 'GET',
    });

    return response.data;
  }

  /**
   * GET - Obter filme por ID
   */
  async getMovieById(id: string): Promise<Movie> {
    const response = await this.request<ApiResponse<Movie>>(`/api/movies/${id}`, {
      method: 'GET',
    });

    return response.data;
  }

  /**
   * GET - Buscar filmes por título
   */
  async searchMovies(query: string): Promise<Movie[]> {
    const response = await this.request<ApiResponse<Movie[]>>(`/api/movies/search?q=${encodeURIComponent(query)}`, {
      method: 'GET',
    });

    return response.data;
  }

  /**
   * GET - Buscar filmes por gênero
   */
  async getMoviesByGenre(genre: string): Promise<Movie[]> {
    const response = await this.request<ApiResponse<Movie[]>>(`/api/movies/genre/${encodeURIComponent(genre)}`, {
      method: 'GET',
    });

    return response.data;
  }

  /**
   * POST - Criar novo filme (admin)
   */
  async createMovie(movie: Movie): Promise<Movie> {
    const response = await this.request<ApiResponse<Movie>>('/api/movies', {
      method: 'POST',
      body: JSON.stringify(movie),
    });

    return response.data;
  }

  /**
   * PUT - Atualizar filme (admin)
   */
  async updateMovie(id: string, movie: Partial<Movie>): Promise<Movie> {
    const response = await this.request<ApiResponse<Movie>>(`/api/movies/${id}`, {
      method: 'PUT',
      body: JSON.stringify(movie),
    });

    return response.data;
  }

  /**
   * DELETE - Deletar filme (admin)
   */
  async deleteMovie(id: string): Promise<void> {
    await this.request<ApiResponse<null>>(`/api/movies/${id}`, {
      method: 'DELETE',
    });
  }
}

// Exportar instância singleton
export const apiClient = new ApiClient();
export default ApiClient;
