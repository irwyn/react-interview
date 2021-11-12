import { Card, Col, message, Row, Spin, Tabs, Typography } from 'antd';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffectOnce } from 'react-use';

import DateRangePicker from '@/components/DateRangePicker';
import LayoutDefault from '@/components/LayoutDefault';
import { actions, thunks } from '@/store/carriers';

import styles from './CarriersReports.module.css';
import RevenueReport from './components/RevenueReport';
import TableReport from './components/TableReport';

const CarrierReportsPage = () => {
  const { data: carriersData, isFetching } = useSelector(s => s.carriers.reports);
  const dispatch = useDispatch();
  const [range, setRange] = useState([]);

  const fetchData = async (query) => {
    try {
      const epochNow = Math.trunc(new Date().valueOf() / 1000);
      const params = query?.length === 2 ? {
        start: query[0],
        end: query[1]
      } : {
        start: epochNow - 86400,
        end: epochNow,
      };

      await dispatch(thunks.fetchReports(params)).unwrap();
    } catch (error) {
      console.error(error);
      message.error(error.message);
    }
  };

  const handleReset = () => {
    dispatch(actions.reset());
    setRange([]);
    fetchData();
  };

  const handleRangeChange = (value) => {
    setRange(value);
    fetchData(value ? value.map(v => v.unix()) : undefined);
  };

  useEffectOnce(() => {
    fetchData();

    return () => dispatch(actions.reset());
  });

  return (
    <LayoutDefault
      title="Carriers Data Reports"
      breadcrumbs={['Home', 'Carriers', 'Reports']}
    >
      <Card bordered size="small">
        <Tabs className={styles.tabs} onChange={handleReset}>
          <Tabs.TabPane key="tab1" tab="Carriers summary">
            <Row>
              <Col flex="1">
                <Typography.Title level={3}>
                  Carriers summary
                </Typography.Title>
              </Col>
              <Col>
                <DateRangePicker value={range} onChange={handleRangeChange} />
              </Col>
            </Row>

            <Spin spinning={isFetching}>
              {isFetching ? (
                <div style={{ height: 80 }} />
              ) : (
                <TableReport carriersData={carriersData} />
              )}
            </Spin>
          </Tabs.TabPane>

          <Tabs.TabPane key="tab2" tab="Revenue report by carriers">
            <Row>
              <Col flex="1">
                <Typography.Title level={3}>
                  Revenue report by carriers
                </Typography.Title>
              </Col>
              <Col>
                <DateRangePicker value={range} onChange={handleRangeChange} />
              </Col>
            </Row>
            
            <Spin spinning={isFetching}>
              {isFetching ? (
                <div style={{ height: 80 }} />
              ) : (
                <RevenueReport carriersData={carriersData} />
              )}
            </Spin>
          </Tabs.TabPane>
        </Tabs>
      </Card>
    </LayoutDefault>

  );
};

export default CarrierReportsPage;
