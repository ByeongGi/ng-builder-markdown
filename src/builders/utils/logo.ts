import {blue} from 'chalk';
import figlet from 'figlet';

const pkg = require('../../../package.json');

export const logo = () => {
  figlet.text(`ng markdown`, (error, result) => {
    if (!error) {
      const version = pkg.version;
      console.log(blue.bold(`${result} \n \t\t\t\t\t\t\t      ${version}`));
    }
  });
};
