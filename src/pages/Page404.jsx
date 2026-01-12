import { useNavigate } from 'react-router-dom';
import { Result, Button } from 'antd';

function Page404() {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center items-center" style={{ height: '100vh' }}>
      <Result
        status="404"
        title="404"
        subTitle="找不到对应的页面"
        extra={
          <Button type="primary" onClick={() => navigate('/', { replace: true })}>
            返回首页
          </Button>
        }
      />
    </div>
  );
}

export default Page404;
