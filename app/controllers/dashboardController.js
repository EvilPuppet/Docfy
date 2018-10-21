const { Project, Section } = require('../models');

module.exports = {
  async index(req, res, next) {
    try {
      const projects = await Project.findAll({
        include: [Section],
        where: {
          UserId: req.session.user.id,
        },
      });

      return res.render('dashboard/index', { projects });
    } catch (err) {
      return next(err);
    }
  },
};
