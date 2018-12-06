const fs = require('fs');

const checksum = {
    getData: function () {
        return fs.readFileSync('./data.txt', 'utf8').split('\n');
    },

    getCounts: function (input) {
        let map = {};
        let result = {doubles: 0, triples: 0};

        for (i = 0; i < input.length; ++i) {
            const character = input[i];
            const count = map[character];
            map[character] = count ? count + 1 : 1;
        }

        let characters = new Set(Object.values(map));

        if (characters.has(2)) {
            result.doubles++;
        }
        if (characters.has(3)) {
            result.triples++;
        }
        return result;
    },

    processArray: function(boxIds) {
        let result = [];
        for (let boxId of boxIds) {
            result.push(this.getCounts(boxId));
        }
        return result;
    },

    getChecksum: function(input) {
        let doublesCount = 0;
        let triplesCount = 0;

        for (let counts of input) {
            doublesCount += counts.doubles;
            triplesCount += counts.triples;
        }
        return doublesCount * triplesCount;
    },

    findCommon: function(boxIds) {
        function getCommonLetters(firstId, secondId) {
            let commonLetters = [];

            for (let i = 0; i < firstId.length; i++) {
                if (firstId[i] === secondId[i]) {
                    commonLetters.push(firstId[i]);
                }
            }
            return commonLetters;
        }

        function getDiff(firstId, secondId) {
            let diff = 0;

            for (let a = 0; a < firstId.length; a++) {
              let letter = firstId[a];
              let secondLetter = secondId[a];

              if (letter !== secondLetter) {
                diff++;
              }
            };
            return diff;
        }

        for (let i = 0; i < boxIds.length; i++) {
            for (let j = 0; j < boxIds.length; j++) {
              if (getDiff(boxIds[i], boxIds[j]) === 1) {
                return getCommonLetters(boxIds[i], boxIds[j]).join('');
              }
            }
          }
    },

    firstPass: function () {
        const testData = ['abcdef', 'bababc', 'abbcde', 'abcccd', 'aabcdd', 'abcdee', 'ababab'];

        console.log('Test Data (Expected = 12): ' + this.getChecksum(this.processArray(testData)));
        console.log('Real Data: ' + this.getChecksum(this.processArray(this.getData())));
    },

    secondPass: function () {
        const testData = ['abcde', 'fghij', 'klmno', 'pqrst', 'fguij', 'axcye', 'wvxyz'];

        console.log('Test Data (Expected = fgij): ' + this.findCommon(testData));
        console.log('Real Data: ' + this.findCommon(this.getData()));
    },

    run: function () {
        console.log('Running part 1...');
        let startTime = new Date();
        checksum.firstPass();
        let endTime = new Date();
        let timeElapsed = endTime.getTime() - startTime.getTime();
        console.log(`Star found in ${timeElapsed}ms.`);

        console.log('Running part 2...');
        startTime = new Date();
        checksum.secondPass();
        endTime = new Date();
        timeElapsed = endTime.getTime() - startTime.getTime();
        console.log(`Star found in ${timeElapsed}ms.`);
    }
}

checksum.run();