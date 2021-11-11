import { Breadcrumb, Layout } from 'antd';

import styles from './LayoutDefault.module.css';

const { Header, Content, Footer } = Layout;

const LayoutDefault = ({ children, breadcrumbs = [] }) => {
  return (
    <Layout className={styles.fitHeight}>
      <Header>
        <div className={styles.logo}>
          Noesis Technology
        </div>
      </Header>
      <Content className={styles.content}>
        {breadcrumbs.length > 0 && (
        <Breadcrumb className={styles.breadcrumbs}>
          {breadcrumbs.map((label, idx) => (
            <Breadcrumb.Item key={idx}>{label}</Breadcrumb.Item>
          ))}
        </Breadcrumb>
        )}
        <div>
          {children}
        </div>
      </Content>
      <Footer className={styles.footer}>
        &copy; 2021 BachNX
      </Footer>
    </Layout>
  );
};

export default LayoutDefault;
