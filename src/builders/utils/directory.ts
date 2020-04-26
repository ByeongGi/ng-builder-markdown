import {access, mkdir} from 'fs';
import {v4 as uuidv4} from 'uuid';

export function makeDirectory(path: string): Promise<boolean> {
  return new Promise((resolve, rejects) => {
    access(path, err => {
      if (err) {
        mkdir(path, {recursive: true}, (err) => {
          if (err) {
            console.log('Not create cache directory');
            rejects(new Error('Not create cache directory'));
          } else {
            resolve(true);
          }
        });
      } else {
        console.log('Exist cache directory');
        resolve(true);
      }
    });
  });
}

export function getUUId() {
  return uuidv4().replace(/-/g, '');
}
