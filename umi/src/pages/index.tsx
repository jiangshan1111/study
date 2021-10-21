import './index.scss';
import Header from '../components/Header';
import Footer from '../components/Footer';

import { Layout } from 'antd';

const { Content } = Layout;
// 
export default function IndexPage() {
  return (
    <div>
      <Layout>
        <Header></Header>
        <Content className="content">
          <h1 className="title">hehe</h1></Content>
        <Footer></Footer>
      </Layout>
    </div>
  );
}
