const UNIT = 64;

const canvas = document.getElementById('maker');
canvas.width = 1920;
canvas.height = (1920 / 16) * 9;
const context = canvas.getContext('2d');

for (let j = 1; j <= UNIT; j++) {
  for (let i = 1; i <= UNIT; i++) {
    const x = UNIT * (j - 1);
    const y = UNIT * (i - 1);

    // console.log(`x: ${j} - ${x}, y: ${i} - ${y}`);

    context.beginPath();
    // context.setLineDash([5]);
    context.rect(x, y, UNIT, UNIT);
    context.font = '12px Arial';
    context.fillText(`${i}:${j}`, x, y + 12, UNIT);
    context.stroke();
  }
}
