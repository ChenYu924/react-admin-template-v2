import { useRef, useState, useEffect } from 'react';
import { ArrowRightOutlined } from '@ant-design/icons';
import styles from './styles/Captcha.module.less';

function Captcha({ value, onChange, onSuccess }) {
  const sliderRef = useRef(null);
  const [x, setX] = useState(0);
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    if (value) {
      setVerified(value === 'success');
    }
  }, [value]);
  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;
    slider.addEventListener('mousedown', handleMouseDown);

    return () => {
      slider.removeEventListener('mousedown', handleMouseDown);
    };
  }, [verified]);

  function handleMouseDown(e) {
    if (verified) return;
    const slider = sliderRef.current;
    if (!slider) return;
    const startX = e.clientX;
    const sliderLeft = slider.offsetLeft;

    function handleMouseMove(e) {
      const moveX = e.clientX - startX;
      let newLeft = sliderLeft + moveX;
      const maxLeft = slider.parentElement.offsetWidth - slider.offsetWidth;

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

      const maxLeft = slider.parentElement.offsetWidth - slider.offsetWidth;
      if (slider.offsetLeft >= maxLeft) {
        setX(maxLeft);
        onChange('success');
        onSuccess();
        // 成功后解绑 mousedown，禁止再次拖动
        slider.removeEventListener('mousedown', handleMouseDown);
      } else {
        setX(0);
        onChange('fail');
      }
    }

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  }

  return (
    <div className={styles.container}>
      <div className={styles.slider} ref={sliderRef} style={{ left: `${x}px` }}>
        <ArrowRightOutlined />
      </div>
      <div className={styles.sliderBg} style={{ width: x > 0 ? `${x + 19}px` : 0 }} />
      {!verified ? (
        <span className={styles.tips}>按住滑块拖动</span>
      ) : (
        <div className={styles.successText}>验证成功</div>
      )}
    </div>
  );
}

export default Captcha;
