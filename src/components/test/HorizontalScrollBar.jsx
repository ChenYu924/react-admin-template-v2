import { useRef, useState, useEffect } from 'react';
import { Typography } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';
import styles from './styles/HorizontalScrollBar.module.less';

function HorizontalScrollBar() {
  const sliderRef = useRef(null);
  const [x, setX] = useState(0);
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;
    if(!verified) {
      slider.addEventListener('mousedown', handleMouseDown);
    }

    return () => {
      slider.removeEventListener('mousedown', handleMouseDown);
    };
  }, [verified]);

  function handleMouseDown(e) {
    const slider = sliderRef.current;
    if (!slider) return;

    const startX = e.clientX;
    const sliderLeft = slider.offsetLeft;

    function handleMouseMove(e) {
      const moveX = e.clientX - startX;
      let newLeft = sliderLeft + moveX;
      const maxLeft = slider.parentElement.offsetWidth - slider.offsetWidth - 2;
      if (newLeft < 0) {
        newLeft = 0;
      }
      if (newLeft > maxLeft) {
        newLeft = maxLeft;
      }
      setX(newLeft);
    }
    function handleMouseUp() {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);

      const maxLeft = slider.parentElement.offsetWidth - slider.offsetWidth - 2;
      if (slider.offsetLeft >= maxLeft) {
        setX(maxLeft);
        setVerified(true);
        slider.removeEventListener('mousedown', handleMouseDown);
      } else {
        setX(0);
      }
    }

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  }
  function handleReset() {
    setX(0);
    setVerified(false);
  }

  return (
    <div className={styles.container}>
      <div className={styles.barContainer}>
        <div className={styles.slider} style={{ left: `${x}px` }} ref={sliderRef}>
          <ArrowRightOutlined />
        </div>
        <div className={styles.mask} style={{ width: `${x > 0 ? x + 19 : 0}px` }} />
        {verified ? (
          <span className={styles.successText}>验证成功</span>
        ) : (
          <span className={styles.tips}>按住滑块拖动</span>
        )}
      </div>
      <Typography.Link onClick={handleReset}>重置</Typography.Link>
    </div>
  );
}

export default HorizontalScrollBar;
