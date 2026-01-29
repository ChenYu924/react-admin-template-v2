import { v4 as uuidv4 } from 'uuid';

/**
 * @description 生成一个v4 UUID
 * @return {string} UUID字符串
 * */
export function generateUUID() {
  return uuidv4();
}

/**
 * @description 在嵌套的菜单项中查找指定key的所有父级key
 * @param {Array} items - 菜单项数组
 * @param {string} targetKey - 目标key
 * @param {Array} parents - 当前父级key数组（递归使用）
 * @return {Array} 父级key数组
 * */
export function findParentKeys(items, targetKey, parents = []) {
  for (const item of items) {
    if (item.key === targetKey) {
      return parents;
    }
    if (item.children) {
      const result = findParentKeys(item.children, targetKey, [...parents, item.key]);
      if (result) {
        return result;
      }
    }
  }
  return null;
}
