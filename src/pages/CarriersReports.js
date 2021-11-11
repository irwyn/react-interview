import { Tabs, Typography } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useUnmount } from 'react-use';

import LayoutDefault from '@/components/LayoutDefault';
import { actions, thunks } from '@/store/carriers';


const CarrierReportsPage = () => {
  const data = useSelector(s => s.carriers);
  const dispatch = useDispatch();

  const handleLoadDataClicked = () => {
    dispatch(thunks.fetchReports());
  };
  
  useUnmount(() => dispatch(actions.reset()));

  return (
    <LayoutDefault
      breadcrumbs={['Home', 'Carriers', 'Reports']}
    >
      <Typography.Paragraph>
        Carrier Data
      </Typography.Paragraph>
    </LayoutDefault>

  );
};

export default CarrierReportsPage;
