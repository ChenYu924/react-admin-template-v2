import { useState, useEffect } from 'react';
import { Button, message } from 'antd';
import styles from '@/components/test/styles/Chessboard.module.less';

const initBlockList = Array.from({ length: 16 }, (_, index) => ({
  id: index + 1,
  value: '',
}));
const elementBackgroundColors = {
  2: '#EDE1D5',
  4: '#F0DDBE',
  8: '#FEA564',
  16: '#FF834B',
  32: '#FF654D',
  64: '#FF3C2F',
  128: '#EFE0C0',
  256: '#EFDAB0',
  512: '#EFCE90',
  1024: '#EFC560',
  2048: '#EFB040',
};
// 遵循从上到下，从左到右的顺序
const upColObj = [
  [1, 5, 9, 13],
  [2, 6, 10, 14],
  [3, 7, 11, 15],
  [4, 8, 12, 16],
];
const downColObj = [
  [13, 9, 5, 1],
  [14, 10, 6, 2],
  [15, 11, 7, 3],
  [16, 12, 8, 4],
];
const leftRowObj = [
  [1, 2, 3, 4],
  [5, 6, 7, 8],
  [9, 10, 11, 12],
  [13, 14, 15, 16],
];
const rightRowObj = [
  [4, 3, 2, 1],
  [8, 7, 6, 5],
  [12, 11, 10, 9],
  [16, 15, 14, 13],
];
const axis = {
  up: upColObj,
  down: downColObj,
  left: leftRowObj,
  right: rightRowObj,
};

function Chessboard() {
  const [blockList, setBlockList] = useState(initBlockList);
  const [currentTo, setCurrentTo] = useState('');

  useEffect(() => {
    if (localStorage.getItem('blockList')) {
      setBlockList(JSON.parse(localStorage.getItem('blockList')));
    } else {
      // 初始化生成两个元素方块
      initChessboard();
    }

    // 添加键盘事件监听器
    function handleKeyDown(event) {
      switch (event.key) {
        case 'ArrowUp':
          setCurrentTo('up');
          break;
        case 'ArrowDown':
          setCurrentTo('down');
          break;
        case 'ArrowLeft':
          setCurrentTo('left');
          break;
        case 'ArrowRight':
          setCurrentTo('right');
          break;
        default:
          break;
      }
    }
    window.addEventListener('keydown', handleKeyDown);

    // 在组件卸载时移除事件监听器
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []); // eslint-disable-line
  useEffect(() => {
    if (currentTo) {
      calcValue();
      setCurrentTo('');
    }
  }, [currentTo]); // eslint-disable-line
  useEffect(() => {
    calcResult();
  }, [blockList]); // eslint-disable-line

  // 列值合并
  function calcCol(arr) {
    const newArr = [];
    let i = 0;
    while (i < arr.length) {
      if (arr[i] === arr[i + 1]) {
        newArr.push(arr[i] * 2);
        i += 2;
      } else {
        newArr.push(arr[i]);
        i++;
      }
    }
    return newArr;
  }
  // 计算位置
  function calcPosition(list, arr, index) {
    axis[currentTo][index].forEach((id, i) => {
      list[id - 1].value = arr[i] || '';
    });
  }
  // 监听方向键事件
  function calcValue() {
    const refList = blockList.map((item) => ({ ...item }));
    const list = blockList.map((item) => ({ ...item }));
    let canMove = false;
    axis[currentTo].forEach((item, index) => {
      const newArr = item.map((id) => blockList.find((i) => i.id === id).value).filter(Boolean);
      const mergedArr = calcCol(newArr);
      calcPosition(list, mergedArr, index);
    });
    if (JSON.stringify(refList) !== JSON.stringify(list)) {
      canMove = true;
    }
    if (canMove) {
      console.log('list', createNewBlock(list));
      localStorage.setItem('blockList', JSON.stringify(createNewBlock(list)));
      setBlockList(createNewBlock(list));
    }
  }
  // 生成新的方块
  function createNewBlock(list) {
    const emptyList = list.filter((item) => !item.value);
    if (!emptyList.length) return;
    const randomIndex = Math.floor(Math.random() * emptyList.length);
    const randomValue = Math.random() > 0.06 ? 2 : 4;
    return list.map((item) =>
      item.id === emptyList[randomIndex].id ? { ...item, value: randomValue } : item,
    );
  }
  // 监听成功
  function calcResult() {
    const success = blockList.some((item) => item.value === 2048);
    if (success) {
      message.success('success');
      setTimeout(() => {
        localStorage.removeItem('blockList');
        setBlockList(initBlockList);
      }, 1000);
    }
    // const lose = blockList.every((item) => item.value);
    // if (lose) {
    //   message.error('over');
    //   setTimeout(() => {
    //     localStorage.removeItem('blockList');
    //     setBlockList(initBlockList);
    //   }, 1000);
    // }
  }
  function initChessboard() {
    localStorage.removeItem('blockList');
    const randomIndex1 = Math.floor(Math.random() * 16);
    let randomIndex2 = Math.floor(Math.random() * 16);
    while (randomIndex1 === randomIndex2) {
      randomIndex2 = Math.floor(Math.random() * 16);
    }
    const newBlockList = initBlockList.map((item, index) =>
      index === randomIndex1 || index === randomIndex2 ? { ...item, value: 2 } : item,
    );
    setBlockList(newBlockList);
  }

  return (
    <>
      <Button style={{ marginBottom: '16px' }} type="primary" danger onClick={initChessboard}>
        重置
      </Button>
      <div className={styles.chessboard}>
        {blockList.map((item) => (
          <div
            key={item.id}
            className={styles.block}
            style={{
              backgroundColor: elementBackgroundColors[item.value],
              color: item.value === 2 || item.value === 4 ? '#000' : '#fff',
            }}
          >
            {item.value}
          </div>
        ))}
      </div>
    </>
  );
}

export default Chessboard;
