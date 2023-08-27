import { Router } from 'express';
import { makeSignUpController } from '../factories/signup';

export default (router: Router): void => {
  router.post('/signup', makeSignUpController().handle);
};