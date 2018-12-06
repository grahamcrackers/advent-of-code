import { parseData } from '../../helpers';

// const data = parseData('./src/data/day1.graham.txt');

interface FrequencyInput {
    symbol: string;
    value: number;
}


// const inputData: string[] = data.input;

export const massagedData = (inputs: string[]): FrequencyInput[] =>
    inputs.map(input => ({
        symbol: input.substring(0, 1),
        value: Number(input.substring(1))
    }));

export const calculateFrequency = (inputs: string[], initalValue: number = 0) =>
    massagedData(inputs).reduce((acc, cur) => {
        return cur.symbol === '-' ? acc - cur.value : acc + cur.value;
    }, initalValue);
