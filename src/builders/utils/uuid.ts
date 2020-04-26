import {v4 as uuidv4} from 'uuid';

export function getUUId() {
  return uuidv4().replace(/-/g, '');
}
