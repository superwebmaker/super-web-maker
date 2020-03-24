const { spawn } = require('child_process');

const beforeTask = () => {
  const egg = spawn('egg-bin', ['dev']);

  egg.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
  });

  egg.stderr.on('data', (data) => {
    console.log(`stderr: ${data}`);
  });

  egg.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
  });
};

module.exports = beforeTask;
