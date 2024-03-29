import { Request, Response } from 'express';
import { IController, IHttpRequest } from '../../presentation/protocols';

export const adaptRoute = (controller: IController) => {
  return async (req: Request, res: Response) => {
    const httpRequest: IHttpRequest = { 
      body: req.body
    };
    const httpResponse = await controller.handle(httpRequest);
    if (httpResponse.statusCode === 500) {
      res.status(httpResponse.statusCode).json({
        error: httpResponse.body.message,
      });
    } else {
      res.status(httpResponse.statusCode).json(httpResponse.body);
    }
  };
};