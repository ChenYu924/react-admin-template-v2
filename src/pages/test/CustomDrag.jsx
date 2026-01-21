import { Card } from 'antd';
import HeadTitle from '@/components/common/HeadTitle.jsx';
import HorizontalScrollBar from '@/components/test/HorizontalScrollBar.jsx';

function CustomDrag() {
  return (
    <Card className="ant-card">
      <HeadTitle title='横向拖拽条' />
      <div className='py-4 pl-8'>
        <HorizontalScrollBar />
      </div>
    </Card>
  );
}

export default CustomDrag;
