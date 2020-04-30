import {blue, green, red} from 'chalk';

export function info(msg: string) {
  console.log(blue(msg));
}

export function log(msg: string) {
  console.log(green(msg));
}

export function error(error: Error) {
  console.error(red(error));
}
