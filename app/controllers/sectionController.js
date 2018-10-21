const { Project, Section } = require('../models');

module.exports = {
  async show(req, res, next) {
    try {
      const { projectId, id } = req.params;
      const sections = await Section.findAll({
        include: [Project],
        where: {
          ProjectId: projectId,
        },
      });

      const project = await Project.findById(projectId);
      const section = await Section.findById(id);

      return res.render('sections/show', {
        section,
        sections,
        project,
        activeSectionId: id,
        activeProjectId: projectId,
      });
    } catch (err) {
      return next(err);
    }
  },

  async create(req, res, next) {
    try {
      const sections = await Section.findAll({
        include: [Project],
        where: {
          ProjectId: req.params.projectId,
        },
      });

      const project = await Project.findById(req.params.projectId);

      return res.render('sections/create', {
        sections,
        activeProjectId: req.params.projectId,
        project,
      });
    } catch (err) {
      return next(err);
    }
  },

  async store(req, res, next) {
    try {
      const section = await Section.create({
        ...req.body,
        ProjectId: req.params.projectId,
      });

      req.flash('sucess', 'Seção criada com sucesso');

      return res.redirect(`/app/projects/${req.params.projectId}/sections/${section.id}`);
    } catch (err) {
      return next(err);
    }
  },

  async edit(req, res, next) {
    try {
      const { projectId, id } = req.params;

      const sections = await Section.findAll({
        include: [Project],
        where: {
          ProjectId: projectId,
        },
      });

      const project = await Project.findById(projectId);
      const section = await Section.findById(id);

      return res.render('sections/edit', {
        activeProjectId: projectId,
        activeSectionId: id,
        sections,
        project,
        section,
      });
    } catch (err) {
      return next(err);
    }
  },

  async update(req, res, next) {
    try {
      const { projectId, id } = req.params;
      const section = await Section.findById(id);

      await section.update(req.body);

      req.flash('sucess', 'Seção atualizada com sucesso');

      return res.redirect(`/app/projects/${projectId}/sections/${id}`);
    } catch (err) {
      return next(err);
    }
  },

  async destroy(req, res, next) {
    try {
      const { id, projectId } = req.params;

      await Section.destroy({
        where: {
          id,
        },
      });

      return res.redirect(`/app/projects/${projectId}`);
    } catch (err) {
      return next(err);
    }
  },
};
