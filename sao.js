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
      default: 'my web project',
    },
    tailwindcss: {
      message: 'TailwindCSS?',
      type: 'confirm',
      default: true,
    },
    routing: {
      message: 'Routing?',
      type: 'confirm',
      default: true,
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
    'tailwind.js': 'tailwindcss',
    'src/styles/tailwind.scss': 'tailwindcss',
    'src/pages/**': 'routing',
    'src/router/**': 'routing',
    'src/App.css': '!routing',
  },
  move: {
    gitignore: '.gitignore',
  },
  showTip: true,
  gitInit: true,
  installDependencies: true,
  post(context, stream) {
    // run eslint --fix
    exec(`cd ${context.folderName} && yarn lint:fix`, (err, stdout, stderr) => {
      if (err) {
        console.log(err.message);
        return;
      }
      stdout && console.log(stdout);
      stderr && console.log(stderr);
    })
  },
};
