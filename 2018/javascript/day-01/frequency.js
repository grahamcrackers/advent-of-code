const fs = require('fs');

const frequency = {
    getData: function () {
        return fs.readFileSync('./data.txt', 'utf8').split('\n').map(line => +line);
    },

    reduce: function (input) {
        return input.reduce((a, b) => +a + +b, 0);
    },

    findDuplicateFrequency: function (input) {
        const frequencyCount = input.length;
        let found = false;
        let runningFrequency = 0;
        let foundFrequencies = {};
        let duplicateFrequency = 0;

        while (!found) {
            for (const frequency of input) {
                runningFrequency += +frequency;
                if (foundFrequencies[runningFrequency]) {
                    duplicateFrequency = runningFrequency;
                    found = true;
                    break;
                } else {
                    foundFrequencies[runningFrequency] = true;
                }
            }
        }
        return duplicateFrequency;
    },

    calibrate: function () {
        const testData1 = [+1, +1, +1];
        const testData2 = [+1, +1, -2];
        const testData3 = [-1, -2, -3];

        const calculate = input => {
            return this.reduce(input);
        };

        console.log('Test Data 1 (Expected = 3): ' + calculate(testData1));
        console.log('Test Data 2 (Expected = 0): ' + calculate(testData2));
        console.log('Test Data 3 (Expected = -6): ' + calculate(testData3));
        console.log('Real Data: ' + calculate(this.getData()));
    },

    calibrateUnique: function () {
        const testData1 = [+1, -1];
        const testData2 = [+3, +3, +4, -2, -4];
        const testData3 = [-6, +3, +8, +5, -6];
        const testData4 = [+7, +7, -2, -7, -4];

        console.log('Test Data 1 (Expected = 0): ' + this.findDuplicateFrequency(testData1));
        console.log('Test Data 2 (Expected = 10): ' + this.findDuplicateFrequency(testData2));
        console.log('Test Data 3 (Expected = 5): ' + this.findDuplicateFrequency(testData3));
        console.log('Test Data 3 (Expected = 14): ' + this.findDuplicateFrequency(testData4));
        console.log('Real Data: ' + this.findDuplicateFrequency(this.getData()));
    },

    run: function () {
        console.log('Running part 1...');
        let startTime = new Date();
        frequency.calibrate();
        let endTime = new Date();
        let timeElapsed = endTime.getTime() - startTime.getTime();
        console.log(`Star found in ${timeElapsed}ms.`);

        console.log('Running part 2...');
        startTime = new Date();
        frequency.calibrateUnique();
        endTime = new Date();
        timeElapsed = endTime.getTime() - startTime.getTime();
        console.log(`Star found in ${timeElapsed}ms.`);
    }
}

frequency.run();