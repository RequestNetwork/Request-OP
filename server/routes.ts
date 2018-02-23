import * as express from 'express';
import RequestCtrl from './controllers/request.controller';

export default function setRoutes(app) {

  const router = express.Router();
  const requestCtrl = new RequestCtrl();

  // Users
  // router.route('/login').post(userCtrl.login);
  // router.route('/user').post(userCtrl.insert);

  // Apply the routes to our application with the prefix /api
  app.use('/api', router);
}
