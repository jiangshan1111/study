/**
 * title: 登录
 */
import './index.scss'
import { Layout, Form, Input, Button, Checkbox } from 'antd';

const { Content, Footer } = Layout;
// 
const onFinish = (values: any) => {
  console.log('Success:', values);
};

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};
const IndexPage = function () {
  return (
    <div>
      <Layout>
        <Content className="content">
          <div className="form">
            <Form
              name="basic"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              initialValues={{ remember: true }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
            <Form.Item >
              <h1>登录</h1>
            </Form.Item>
              <Form.Item
                label="Username"
                name="username"
                rules={[{ required: true, message: 'Please input your username!' }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>

              <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Content>
        <Footer>
          <p>1233</p>
        </Footer>
      </Layout>
    </div>
  );
}
IndexPage.title = '主页'
export default IndexPage;