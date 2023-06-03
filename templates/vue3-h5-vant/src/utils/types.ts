import { AxiosRequestConfig } from 'axios';

export interface CreateAxiosOptions extends AxiosRequestConfig {
    requestOptions?: RequestOptions;
    authenticationScheme?: String;
}

export interface RequestOptions {
  // 不进行任何处理，直接返回
  isTransformResponse?: boolean;
  // 是否携带token
  withToken?: boolean;
}

export interface Result<T = any> {
  code: number;
  type?: 'success' | 'error' | 'warning';
  message: string;
  result?: T;
}
