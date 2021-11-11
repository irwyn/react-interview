import { Card, message, Spin, Tabs, Typography } from 'antd';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffectOnce } from 'react-use';

import DateRangePicker from '@/components/DateRangePicker';
import LayoutDefault from '@/components/LayoutDefault';
import { actions, thunks } from '@/store/carriers';

import styles from './CarriersReports.module.css';
import TableReport from './components/TableReport';

const CarrierReportsPage = () => {
  const { data: carriersData, isFetching } = useSelector(s => s.carriers.reports);
  const dispatch = useDispatch();
  const [range, setRange] = useState([]);

  const fetchData = async (query) => {
    try {
      const params = query?.length === 2 ? { start: query[0], end: query[1] } : undefined;

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
            <Typography.Title level={3}>
              Carriers summary
            </Typography.Title>

            <Spin spinning={isFetching}>
              {isFetching ? (
                <div style={{ height: 80 }} />
              ) : (
                <>
                  <DateRangePicker value={range} onChange={handleRangeChange} />
                  <TableReport
                    carriersData={carriersData}
                    range={range}
                    onRangeChange={setRange}
                  />
                </>
              )}
            </Spin>
          </Tabs.TabPane>

          <Tabs.TabPane key="tab2" tab="Revenue report by carriers">
            <Typography.Title level={3}>
              Revenue report by carriers
            </Typography.Title>
          </Tabs.TabPane>

          <Tabs.TabPane key="tab3" tab="Errors report by carriers">
            <Typography.Title level={3}>
              Errors report by carriers
            </Typography.Title>
          </Tabs.TabPane>
        </Tabs>
      </Card>
    </LayoutDefault>

  );
};

export default CarrierReportsPage;
