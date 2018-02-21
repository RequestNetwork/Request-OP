import * as express from 'express';

export default function setRoutes(app) {

  const router = express.Router();

  // Users
  // router.route('/login').post(userCtrl.login);
  // router.route('/user').post(userCtrl.insert);
  // router.route('/user/:id').put(passport.authenticate('jwt', { session: false }), userCtrl.update);

  // router.route('/user/:email/resetPwd').put(userCtrl.resetPwd);

  // Apply the routes to our application with the prefix /api
  app.use('/api', router);
}
