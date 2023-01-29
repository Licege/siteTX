import { OutgoingHttpHeaders } from 'http';

interface Options {
  baseURL: string;
  timeout?: number;
  headers?: OutgoingHttpHeaders;
}

export interface CreateAxiosClient {
  options: Options;
  refreshTokenUrl: string;
  getCurrentAccessToken: () => string;
  getCurrentRefreshToken: () => string;
  logout: () => void;
}