import { v4 as uuidv4 } from 'uuid';

/**
 * @description 生成一个v4 UUID
 * @return {string} UUID字符串
 * */
export function generateUUID() {
  return uuidv4();
}
