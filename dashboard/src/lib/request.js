import fetch from 'isomorphic-fetch'

const downloadFileHandler = response => {
  const filename = response.headers
    .get('content-disposition')
    .split('filename=')[1]
    .slice(1, -1);

  response.blob().then(blob => {
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

const responseHandler = async response => {
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
    'Content-Type': 'application/json'
  },
  credentials: 'include'
}

const request = method => async (url, body, options = {}) => {
  const init = { ...generalOptions, ...options, method }
  if (body) {
    if (body instanceof FormData) {
      init.body = body
      delete init.headers
    } else {
      init.body = JSON.stringify(body)
    }
  }
  const response = await fetch(url, init)
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