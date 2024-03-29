import { Router } from 'express';
import { adaptRoute } from '../adpters/express-route-adapter';
import { makeSignUpController } from '../factories/signup';

export default (router: Router): void => {
  router.post('/signup', adaptRoute(makeSignUpController()));
  /*router.post('/signup', (req, res ) => {
    res.send({message: 'ok'});
  });*/
};