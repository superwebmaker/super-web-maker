const balm = require('balm');
const config = require('./config/balmrc');
const { spawn } = require('child_process');

balm.beforeTask = () => {
  const egg = spawn('egg-bin', ['dev']);

  egg.stdout.on('data', data => {
    console.log(`stdout: ${data}`);
  });

  egg.stderr.on('data', data => {
    console.log(`stderr: ${data}`);
  });

  egg.on('close', code => {
    console.log(`child process exited with code ${code}`);
  });
};

balm.config = config;

balm.go();
