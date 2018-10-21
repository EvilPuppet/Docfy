module.exports = (req, res, next) => {
  if (req.session && req.session.user) {
    res.locals.user = req.session.user;
    return next();
  }

  req.flash('error', 'Não autorizado');
  return res.redirect('/');
};
