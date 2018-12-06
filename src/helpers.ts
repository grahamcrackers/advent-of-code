import * as fs from 'fs';

export const parseData = (path: string) => {
    return fs.readFileSync(path, 'utf8').split('\r\n');
};

export const getFileNameArg = () => {    
    return process.argv[2];    
};
