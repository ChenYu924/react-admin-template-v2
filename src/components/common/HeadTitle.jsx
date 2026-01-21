import classnames from 'classnames';
import styles from './styles/HeadTitle.module.less';

function HeadTitle({ title = '标题', size = 'middle' }) {
  function getClass(name) {
    switch (size) {
      case 'small':
        return styles[`${name}Small`];
      case 'large':
        return styles[`${name}Large`];
      case 'middle':
      default:
        return styles[name];
    }
  }

  return (
    <div className={styles.container}>
      <div className={classnames(styles.verticalLine, getClass('verticalLine'))} />
      <span className={classnames(styles.title, getClass('title'))}>{title}</span>
    </div>
  );
}

export default HeadTitle;
