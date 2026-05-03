export interface ApiResponse<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
  timestamp: string;
}

export interface ApiErrorResponse {
  success: false;
  statusCode: number;
  message: string;
  error?: string;
  validationErrors?: Array<{
    field: string;
    message: string;
  }>;
  timestamp: string;
}

export class ApiError extends Error {
  constructor(
    public statusCode: number,
    public message: string,
    public data?: any
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export class ValidationError extends ApiError {
  constructor(public validationErrors: Array<{ field: string; message: string }>) {
    super(400, 'Erro de validação', validationErrors);
    this.name = 'ValidationError';
  }
}

export class TimeoutError extends ApiError {
  constructor() {
    super(408, 'Tempo de requisição expirado');
    this.name = 'TimeoutError';
  }
}

export class NetworkError extends ApiError {
  constructor(message = 'Erro de conexão') {
    super(0, message);
    this.name = 'NetworkError';
  }
}
