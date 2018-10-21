const express = require('express');

const routes = express.Router();

const authController = require('./controllers/authController');
const dashboardController = require('./controllers/dashboardController');
const projectController = require('./controllers/projectController');
const sectionController = require('./controllers/sectionController');

const authMiddleware = require('./middlewares/auth');
const guestMiddleware = require('./middlewares/guest');

routes.use((req, res, next) => {
  res.locals.flashSuccess = req.flash('success');
  res.locals.flashError = req.flash('error');
  next();
});

routes.use('/app', authMiddleware);

// AUTH

routes.get('/', guestMiddleware, authController.signin);
routes.get('/signup', guestMiddleware, authController.signup);
routes.get('/signout', authController.signout);
routes.post('/register', authController.register);
routes.post('/authenticate', authController.authenticate);

// DASHBOARD
routes.get('/app/dashboard', dashboardController.index);

// PROJECTS
routes.get('/app/projects/:id', projectController.show);
routes.post('/app/projects', projectController.store);
routes.put('/app/projects/edit/:id', projectController.update);
routes.delete('/app/projects/:id', projectController.destroy);

// SECTIONS
routes.get('/app/projects/:projectId/sections/create', sectionController.create);
routes.get('/app/projects/:projectId/sections/:id', sectionController.show);
routes.get('/app/projects/:projectId/sections/edit/:id', sectionController.edit);

routes.post('/app/projects/:projectId/sections', sectionController.store);
routes.put('/app/projects/:projectId/sections/:id', sectionController.update);
routes.delete('/app/projects/:projectId/sections/:id', sectionController.destroy);

// 404
routes.use((req, res) => res.render('error/404'));

routes.use((err, req, res, _next) => {
  res.status(err.status || 500);

  return res.render('error/index', {
    message: err.message,
    error: process.env.NODE_ENV === 'production' ? {} : err,
  });
});

module.exports = routes;
