const { hostname } = window.location
export const WS_BASE = `//${hostname}/`

export const serverUrl = `//${hostname}/`
export const authUrl = `//${hostname}/api/auth`
export const baseUrl = `${serverUrl}api/public`
export const apiUrl = `${serverUrl}api`