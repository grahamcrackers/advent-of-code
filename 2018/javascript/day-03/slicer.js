const fs = require('fs');

const slicer = {
    getData: function () {
        return fs.readFileSync('./data.txt', 'utf8').split('\n').map(x => x.trim());
    },

    getGrid: function (input) {
        let grid = {};
        for (let a = 0; a < input.length; a++) {
            let item = input[a];
            let matchGroups = item.match(/#(\d+) @ (\d+),(\d+): (\d+)x(\d+)/);
            let offsetX = parseInt(matchGroups[2]);
            let offsetY = parseInt(matchGroups[3]);
            let width = parseInt(matchGroups[4]);
            let height = parseInt(matchGroups[5]);
            for (let i = 0; i < width; i++) {
                let x = offsetX + i;
                for (let j = 0; j < height; j++) {
                    let y = offsetY + j;
                    grid[`${x},${y}`] = (grid[`${x},${y}`] !== undefined) ? grid[`${x},${y}`] + 1 : 1;
                }
            }
        }
        return grid;
    },

    getOverlap: function (input) {
        let grid = this.getGrid(input);
        let overlap = Object.values(grid);
        let result = overlap.filter(spot => spot >= 2).length;
        return result;        
    },

    getOverlapUntouched: function (input) {
        let grid = this.getGrid(input);

        for (let a = 0; a < input.length; a++) {
            let item = input[a];
            let matchGroups = item.match(/#(\d+) @ (\d+),(\d+): (\d+)x(\d+)/);            
            let claimId = parseInt(matchGroups[1]);
            let offsetX = parseInt(matchGroups[2]);
            let offsetY = parseInt(matchGroups[3]);        
            let width = parseInt(matchGroups[4]);
            let height = parseInt(matchGroups[5]);

            let patches = new Set();            
            for (let i = 0; i < width; i++) {
                let x = offsetX + i;
                for (let j = 0; j < height; j++) {
                    let y = offsetY + j;
                    patches.add(grid[`${x},${y}`]); 
                }
            }

            if (patches.size === 1 && patches.has(1)) {
                return claimId;
            }
        }
    },

    calculate: function () {
        testData = ['#1 @ 1,3: 4x4', '#2 @ 3,1: 4x4', '#3 @ 5,5: 2x2'];

        console.log('Test Data (Expected = 4): ' + this.getOverlap(testData));
        console.log('Real Data: ' + this.getOverlap(this.getData()));
    },

    calculateUntouched: function () {
        testData = ['#1 @ 1,3: 4x4', '#2 @ 3,1: 4x4', '#3 @ 5,5: 2x2'];

        console.log('Test Data (Expected = 3): ' + this.getOverlapUntouched(testData));
        console.log('Real Data: ' + this.getOverlapUntouched(this.getData()));
    },

    run: function () {
        console.log('Running part 1...');
        let startTime = new Date();
        this.calculate();
        let endTime = new Date();
        let timeElapsed = endTime.getTime() - startTime.getTime();
        console.log(`Star found in ${timeElapsed}ms.`);
        
        console.log('Running part 2...');
        startTime = new Date();
        this.calculateUntouched();
        endTime = new Date();
        timeElapsed = endTime.getTime() - startTime.getTime();
        console.log(`Star found in ${timeElapsed}ms.`);
    }
}

slicer.run();
