import {blue, green, red} from 'chalk';

export const info = (msg: string) => console.log(blue(msg));

export const log = (msg: string) => console.log(green(msg));

export const error = (error: Error) => console.error(red(error));
