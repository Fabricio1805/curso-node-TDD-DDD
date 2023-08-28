import { ServerError } from '../errors/server-error';
import { IHttpResponse } from '../protocols/http';

export const badRequest = (error: Error) :IHttpResponse => {
  return {
    statusCode: 400,
    body: error,
  };
};

export const serverError = (error: Error): IHttpResponse => {
  return {
    statusCode: 500,
    body: new ServerError(error.stack),
  };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const created = (data: any): IHttpResponse => { 
  return {
    statusCode: 201,
    body: data
  };
};
