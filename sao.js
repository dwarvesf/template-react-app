// https://sao.js.org/#/create?id=config-file

module.exports = {
  prompts: {
    name: {
      message: 'What is the name of the new project?',
      default: ':folderName:',
    },
    description: {
      message: 'How would you describe the new project?',
      default: 'my web project',
    },
    pwa: {
      message: 'PWA support?',
      type: 'confirm',
      default: true,
    },
  },
  data({ username = 'dwarvesf' }) {
    return {
      website: `github.com/${username}`,
    };
  },
  filters: {
    'static/manifest.json': 'pwa',
  },
  move: {
    gitignore: '.gitignore',
  },
  showTip: true,
  gitInit: true,
  installDependencies: true,
};
