import * as fs from 'fs';
import * as path from 'path';

const logFilePath = path.join(__dirname, 'logs.txt');

export function writeLog(message: string) {
    const logMessage = `${new Date().toISOString()} - ${message}\n`;


    fs.appendFile(logFilePath, logMessage, (err) => {
        if (err) {
            console.error('Log write error:', err);
        }
    });
}