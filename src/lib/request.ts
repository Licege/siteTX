import axios from 'axios'

type MethodsTypes = 'GET'|'POST'|'PATCH'|'PUT'|'DELETE'|'COPY'

const downloadFileHandler = (response: any) => {
  const filename = response.headers
    .get('content-disposition')
    .split('filename=')[1]
    .slice(1, -1);

  response.blob().then((blob: any) => {
    const url = window.URL.createObjectURL(blob);
    // window.location.assign(url);
    // TODO: позволяет выбрать имя архива
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
  });
};

const responseHandler = async (response: any) => {
  const contentType = response.headers.get('content-type');

  if (!contentType) return Promise.resolve();

  if (contentType.includes('text/html') || contentType.includes('text/plain')) {
    if (response.status >= 400) {
      return Promise.reject();
    }
    return Promise.resolve();
  }
  if (contentType.includes('application/json')) {
    if (response.status >= 400) {
      return Promise.reject(await response.json());
    }
    return response.json();
  }
  if (contentType.includes('application/zip')) {
    return downloadFileHandler(response);
  }

  return Promise.reject(new TypeError(`Oops, we haven't got JSON! Your type is: ${contentType}`));
};

const generalOptions = {
  headers: {
    'Content-Type': 'application/json',
    'Authorization': localStorage.getItem('accessToken')
  }
}

const request = (method: MethodsTypes) => async (url: string, body?: any, options = {}) => {
  const init: any = { ...generalOptions, ...options, method }
  if (body) {
    init.body = JSON.stringify(body)
  }
  const response = axios(url, init)
  return responseHandler(response)
}

export default {
  get: request('GET'),
  post: request('POST'),
  patch: request('PATCH'),
  put: request('PUT'),
  delete: request('DELETE'),
  copy: request('COPY')
};