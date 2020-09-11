const { spawn } = require('child_process');

const getAfterTask = (balm) => {
  return () => {
    if (balm.config.env.isDev) {
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
    }
  };
};

module.exports = getAfterTask;
