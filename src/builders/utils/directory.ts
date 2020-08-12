import {access, mkdir, mkdirSync} from 'fs';

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

export function makeDirectorySync(path: string): void {
  mkdirSync(path, {recursive: true});
}
