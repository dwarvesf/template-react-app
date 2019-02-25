// https://saojs.org/saofile.html

const { exec } = require('child_process');

module.exports = {
  prompts: [
    {
      name: 'name',
      message: 'What is the name of the new project?',
      default: '{outFolder}',
    },
    {
      name: 'description',
      message: 'How would you describe the new project?',
      default: 'My web project',
    },
    {
      name: 'tailwindcss',
      message: 'TailwindCSS?',
      type: 'confirm',
      default: true,
    },
    {
      name: 'i18n',
      message: 'i18n?',
      type: 'confirm',
      default: false,
    },
    {
      name: 'pwa',
      message: 'PWA support?',
      type: 'confirm',
      default: false,
    },
 ],
  templateData() {
    return {
      website: `github.com/${this.gitUser.name}`,
    };
  },
  actions: [
    {
      type: 'add',
      files: '**',
      filters: {
        'static/manifest.json': 'pwa',
        'src/registerSW.js': 'pwa',
        'tailwind.js': 'tailwindcss',
        'src/styles/tailwind.scss': 'tailwindcss',
        'src/bundles/localize.js': 'i18n',
        'src/translations/**': 'i18n',
      },
    },
    {
      type: 'move',
      patterns: {
        gitignore: '.gitignore',
      },
    },
  ],
  async completed() {
    await this.npmInstall();
    await eslintFix(this.outDir, this.logger);
    this.showProjectTips();
  }
};

function execAsync(cmd) {
  return new Promise((resolve, reject) => {
    exec(cmd, (err, stdout, stderr) => {
      if (err) {
        err.stderr = stderr;
        reject(err);
        return;
      }
      resolve(stdout);
    })
  })
}

function eslintFix(dir, logger) {
  return execAsync(`cd ${dir} && npm run lint:fix`).catch(err => {
    logger.error(err.message);
    err.stderr && logger.warn(err.stderr);
  })
}
