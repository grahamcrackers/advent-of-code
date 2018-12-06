import { calculateFrequency } from "./day1";

describe('day 1 part 2 functions', () => {

    it('should be 3', () => {
        const data = ['+1', '+1', '+1'];
        expect(calculateFrequency(data)).toBe(3);
    });

    it('should be 0', () => {
        const data = ['+1', '+1', '-2'];
        expect(calculateFrequency(data)).toBe(0);
    });

    it('should be -6', () => {
        const data = ['-1', '-2', '-3'];
        expect(calculateFrequency(data)).toBe(-6);
    });
});
