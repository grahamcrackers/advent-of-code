const fs = require('fs');
const data = fs.readFileSync('./data.txt', {
    encoding: 'utf8'
});
const testData1 = ['+1', '+1', '+1'];
const testData2 = ['+1', '+1', '-2'];
const testData3 = ['-1', '-2', '-3'];

const frequency = input => {
    return input.reduce((a, b) => +a + +b, 0);
};

console.log('Test Data 1 (Expected = 3): ' + frequency(testData1));
console.log('Test Data 2 (Expected = 0): ' + frequency(testData2));
console.log('Test Data 3 (Expected = -6): ' + frequency(testData3));
console.log('Real Data: ' + frequency(data.split('\n')));