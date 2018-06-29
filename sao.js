// https://sao.js.org/#/create?id=config-file

const { exec } = require('child_process');

module.exports = {
  prompts: {
    name: {
      message: 'What is the name of the new project?',
      default: ':folderName:',
    },
    description: {
      message: 'How would you describe the new project?',
      default: 'My web project',
    },
    tailwindcss: {
      message: 'TailwindCSS?',
      type: 'confirm',
      default: true,
    },
    i18n: {
      message: 'i18n?',
      type: 'confirm',
      default: false,
    },
    pwa: {
      message: 'PWA support?',
      type: 'confirm',
      default: false,
    },
  },
  data({ username = 'dwarvesf' }) {
    return {
      website: `github.com/${username}`,
    };
  },
  filters: {
    'static/manifest.json': 'pwa',
    'tailwind.js': 'tailwindcss',
    'src/styles/tailwind.scss': 'tailwindcss',
    'src/bundles/localize.js': 'i18n',
    'src/translations/**': 'i18n',
  },
  move: {
    gitignore: '.gitignore',
  },
  showTip: true,
  gitInit: false,
  installDependencies: true,
  post(context, stream) {
    // run eslint --fix
    exec(`cd ${context.folderPath} && npm run lint:fix`, (err, stdout, stderr) => {
      if (err) {
        console.log(err.message);
        return;
      }
      stdout && console.log(stdout);
      stderr && console.log(stderr);
    })
  },
};
