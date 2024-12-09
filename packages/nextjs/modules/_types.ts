interface AxiosRequestParams {
    method: 'post' | 'get' | 'put' | 'delete';
    url: string;
    payload?: any;
    token?: string | null;
  }

  export type {
    AxiosRequestParams
  }