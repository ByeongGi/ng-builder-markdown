import {blue, green, red} from 'chalk';
import figlet from 'figlet';

const pkg = require('../../../package.json');

export function logo() {
  figlet.text(`ng markdown`, (error, result) => {
    if (!error) {
      const version = pkg.version;
      console.log(blue.bold(`${result} \n \t\t\t\t\t\t\t      ${version}`));
    }
  });
}

export function info(msg: string) {
  console.log(blue(msg));
}

export function log(msg: string) {
  console.log(green(msg));
}

export function error(error:Error) {
  console.error(red(error));
}
