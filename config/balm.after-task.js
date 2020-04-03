const balm = require('balm');
const { spawn } = require('child_process');

const superWebMakerServer = () => {
  if (balm.config.env.isDev) {
    const egg = spawn('./node_modules/.bin/egg-bin', ['dev']);

    egg.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`);
    });

    egg.stderr.on('data', (data) => {
      console.log(`stderr: ${data}`);
    });

    egg.on('close', (code) => {
      console.log(`child process exited with code ${code}`);
    });
  }
};

module.exports = superWebMakerServer;
