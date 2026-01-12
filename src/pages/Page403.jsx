import { useNavigate } from 'react-router-dom';
import { Result, Button } from 'antd';

function Page403() {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center items-center" style={{ height: '100vh' }}>
      <Result
        status="403"
        title="403"
        subTitle="您没有访问该页面的权限"
        extra={
          <Button type="primary" onClick={() => navigate('/', { replace: true })}>
            返回首页
          </Button>
        }
      />
    </div>
  );
}

export default Page403;
