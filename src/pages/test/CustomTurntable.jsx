import { useRef, useState, useEffect } from 'react';
import { Card } from 'antd';
import styles from '@/components/test/styles/CustomTurntable.module.less';

const initItems = [
  {
    id: 1,
    name: '1',
    bgc: '#FF6B6B',
  },
  {
    id: 2,
    name: '2',
    bgc: '#4ECDC4',
  },
  {
    id: 3,
    name: '3',
    bgc: '#45B7D1',
  },
  {
    id: 4,
    name: '4',
    bgc: '#FFA07A',
  },
  {
    id: 5,
    name: '5',
    bgc: '#F7DC6F',
  },
  {
    id: 6,
    name: '6',
    bgc: '#BB8FCE',
  },
  {
    id: 7,
    name: '7',
    bgc: '#85C1E9',
  },
];

function CustomTurntable() {
  const animationRef = useRef(null);
  const [items] = useState(initItems);
  const [rotation, setRotation] = useState(0);
  const rotationRef = useRef(0);

  useEffect(() => {
    const rotate = () => {
      rotationRef.current += 0.15;
      setRotation(rotationRef.current);
      animationRef.current = requestAnimationFrame(rotate);
    };
    rotate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  function generateClipPath(index, totalItems) {
    const anglePerItem = 360 / totalItems;
    const startAngle = index * anglePerItem - 90; // 从顶部开始
    const endAngle = startAngle + anglePerItem;
    
    const startRad = (startAngle * Math.PI) / 180;
    const endRad = (endAngle * Math.PI) / 180;

    // 计算扇形的三个点：中心点、起始点、结束点
    const centerX = 50;
    const centerY = 50;
    
    // 起始点坐标（稍微超出边界确保完整覆盖）
    const startX = centerX + 100 * Math.cos(startRad);
    const startY = centerY + 100 * Math.sin(startRad);
    
    // 结束点坐标
    const endX = centerX + 100 * Math.cos(endRad);
    const endY = centerY + 100 * Math.sin(endRad);

    return `polygon(${centerX}% ${centerY}%, ${startX}% ${startY}%, ${endX}% ${endY}%)`;
  };

  function getTextPosition(index, totalItems) {
    const anglePerItem = 360 / totalItems;
    const textAngle = index * anglePerItem - 90 + anglePerItem / 2; // 文本位于扇形中央
    const textRad = (textAngle * Math.PI) / 180;
    
    // 文本距离中心的距离（相对于转盘半径的百分比）
    const radiusPercent = 35; // 调整这个值可以改变文本距离中心的远近
    
    const x = 50 + radiusPercent * Math.cos(textRad);
    const y = 50 + radiusPercent * Math.sin(textRad);
    
    return { x: `${x}%`, y: `${y}%` };
  }

  return (
    <Card className="h-[3000px]" bodyStyle={{ padding: 0 }}>
      <div className={styles.container}>
        <div className={styles.left}>
          <div className={styles.turntableContainer}>
            <div className={styles.invertedTriangle}></div>
            <div className={styles.btn}>
              开始
            </div>
            <div 
              className={styles.turntable}
              style={{
                transform: `rotate(${rotation}deg)`
              }}
            >
              {items.map((item, index) => {
                const clipPath = generateClipPath(index, items.length);
                const textPosition = getTextPosition(index, items.length);

                return (
                  <div
                    key={item.id}
                    className={styles.turntableItem}
                    style={{
                      backgroundColor: item.bgc,
                      clipPath,
                    }}
                  >
                    <span 
                      className={styles.itemText}
                      style={{
                        left: textPosition.x,
                        top: textPosition.y,
                        transform: 'translate(-50%, -50%)'
                      }}
                    >
                      {item.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}

export default CustomTurntable;
