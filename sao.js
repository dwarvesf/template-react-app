module.exports = {
  prompts: {
    name: {
      message: 'What is the name of the new project?',
      default: ':folderName:',
    },
    description: {
      message: 'How would you descripe the new project?',
      default: 'my web project',
    },
    pwa: {
      message: 'PWA support?',
      type: 'confirm',
      default: true,
    },
  },
  data({ username }) {
    return {
      website: `github.com/dwarvesf`,
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
  post(context, stream) {
    console.log(context)
    console.log(stream)
  },
};
