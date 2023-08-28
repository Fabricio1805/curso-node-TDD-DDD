export interface IHttpResponse {
  statusCode: number
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body: any
}

export interface IHttpRequest {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body?: any 
}