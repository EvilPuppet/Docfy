const { Project, Section } = require('../models');

module.exports = {
  async show(req, res, next) {
    try {
      const sections = await Section.findAll({
        include: [Project],
        where: {
          ProjectId: req.params.id,
        },
      });

      const project = await Project.findById(req.params.id);

      return res.render('projects/show', {
        sections,
        activeProjectId: req.params.id,
        project,
      });
    } catch (err) {
      return next(err);
    }
  },

  async store(req, res, next) {
    try {
      const project = await Project.create({
        ...req.body,
        UserId: req.session.user.id,
      });

      req.flash('sucess', 'Categoria criada com sucesso');

      return res.redirect(`/app/projects/${project.id}`);
    } catch (err) {
      return next(err);
    }
  },

  async update(req, res, next) {
    try {
      const { id } = req.params;
      const project = await Project.findById(id);

      await project.update(req.body);

      return res.redirect(`/app/projects/${id}`);
    } catch (err) {
      return next(err);
    }
  },

  async destroy(req, res, next) {
    try {
      await Project.destroy({
        where: {
          id: req.params.id,
        },
      });

      return res.redirect('/app/dashboard');
    } catch (err) {
      return next(err);
    }
  },
};
