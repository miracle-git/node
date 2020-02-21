const path = require('path');
const { readline } = require('m2-nodejs');

const fileName = path.join(__dirname, '../../log', 'access.log');
const rl = readline(fileName);

let [chromeNum, sum] = [0, 0];

rl.on('line', (data) => {
  if (!data) return;
  sum++;
  const arr = data.split(' -- ');
  if (arr[2] && arr[2].indexOf('Chrome') > -1) {
    chromeNum++;
  }
});

rl.on('close', () => {
  console.log(`Chrome percentage: ${chromeNum / sum}`);
});
