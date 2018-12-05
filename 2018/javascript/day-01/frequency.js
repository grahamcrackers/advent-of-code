const fs = require('fs');

const frequency = {
    getData: function () {
        return fs.readFileSync('./data.txt', 'utf8').split('\n').map(line => +line);
    },

    reduce: function (input) {
        return input.reduce((a, b) => +a + +b, 0);
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

    findFirstDuplicateFrequency: function (input) {
        const frequencyCount = input.length;
        let found = false;
        let index = 0;
        let frequency = 0;
        let foundFrequencies = {
            0: true
        }
        let duplicateFrequency = 0;

        while (!found) {
            let newFrequency = frequency + input[index % frequencyCount];
            //console.log('Index: ' + index + ' - frequency: ' + frequency + ' - newFrequency: ' + newFrequency);

            if (foundFrequencies[newFrequency]) {
                duplicateFrequency = newFrequency;
                found = true;
            } else {
                foundFrequencies[newFrequency] = true;
                frequency = newFrequency;
                index++;
            }
        }
        return duplicateFrequency;
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

    calibrateUnique: function () {
        const testData1 = [+1, -1];
        const testData2 = [+3, +3, +4, -2, -4];
        const testData3 = [-6, +3, +8, +5, -6];
        const testData4 = [+7, +7, -2, -7, -4];

        //console.log('Test Data 1 (Expected = 0): ' + this.findDuplicateFrequency(testData1));
        //console.log('Test Data 2 (Expected = 10): ' + this.findDuplicateFrequency(testData2));
        //console.log('Test Data 3 (Expected = 5): ' + this.findDuplicateFrequency(testData3));
        //console.log('Test Data 3 (Expected = 14): ' + this.findDuplicateFrequency(testData4));

        let startTime = new Date();
        let result = this.findDuplicateFrequency(this.getData());
        let endTime = new Date();
        let timeElapsed = endTime.getTime() - startTime.getTime();
        console.log('Real Data: ' + result);
        console.log(`Modulus solution solved in ${timeElapsed}ms.`);

        startTime = new Date();
        result = this.findDuplicateFrequency(this.getData());
        endTime = new Date();
        timeElapsed = endTime.getTime() - startTime.getTime();
        console.log('Real Data: ' + result);
        console.log(`For Loop solution solved in ${timeElapsed}ms.`);
    }
}

//frequency.calibrate();
frequency.calibrateUnique();