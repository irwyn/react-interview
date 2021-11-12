import { Breadcrumb, Layout, PageHeader } from 'antd';

import styles from './LayoutDefault.module.css';

const { Header, Content, Footer } = Layout;

const LayoutDefault = ({ children, breadcrumbs = [], title }) => {
  return (
    <Layout className={styles.fitHeight}>
      <Header>
        <div className={styles.logo}>
          Noesis Technology
        </div>
      </Header>
      <Content className={styles.content}>
        <PageHeader
          ghost
          title={title}
          breadcrumb={breadcrumbs.length > 0 ? (
            <Breadcrumb className={styles.breadcrumbs}>
              {breadcrumbs.map((label, idx) => (
                <Breadcrumb.Item key={idx}>{label}</Breadcrumb.Item>
              ))}
            </Breadcrumb>
          ) : undefined}
          className={styles.pageHeader}
        />
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
