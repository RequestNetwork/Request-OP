import * as express from 'express';
import RequestCtrl from './controllers/request.controller';

export default function setRoutes(app) {

  const router = express.Router();
  const requestCtrl = new RequestCtrl();

  router.route('/signRequest').post(requestCtrl.signRequest);
  router.route('/getTxDetails/:txHash').get(requestCtrl.getTxDetails);

  // Apply the routes to our application with the prefix /api
  app.use('/api', router);
}
