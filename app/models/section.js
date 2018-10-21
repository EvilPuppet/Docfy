const hljs = require('highlight.js');

const md = require('markdown-it')({
  highlight: (str, lang) => {
    if (lang && hljs.getLanguage(lang)) {
      return `<pre class="hljs"><code>${hljs.highlight(lang, str.trim(), true).value}</code></pre>`;
    }
    return `<pre class="hljs"><code>${md.utils.escapeHtml(str.trim())}</code></pre>`;
  },
});

module.exports = (sequelize, DataTypes) => {
  const Section = sequelize.define(
    'Section',
    {
      title: DataTypes.STRING,
      content: DataTypes.TEXT,
    },
    {
      getterMethods: {
        formatedContent() {
          return md.render(this.content);
        },
      },
    },
  );

  Section.associate = (models) => {
    Section.belongsTo(models.Project);
  };

  return Section;
};
