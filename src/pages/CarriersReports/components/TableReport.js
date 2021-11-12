import { ClockCircleOutlined } from '@ant-design/icons';
import { Table, Typography } from 'antd';
import { format, fromUnixTime } from 'date-fns';
import { uniq } from 'lodash-es';
import numeral from 'numeral';
import { useMemo } from 'react';

const TableReport = ({ carriersData }) => {
  const carrierFilters = useMemo(() => {
    return uniq(carriersData.map(c => c.carrierId)).map(cid => ({ text: cid, value: cid }));
  }, [carriersData]);

  return (
    <Table
      bordered
      dataSource={carriersData}
      rowKey={(r) => `${r.timestamp}:${r.carrierId}`}
      pagination={{ pageSize: 40, showSizeChanger: false }}
    >
      <Table.Column
        title={<ClockCircleOutlined />}
        width={200}
        dataIndex="timestamp"
        render={ts => (
          <Typography.Text style={{ fontFamily: 'monospace' }}>
            {format(fromUnixTime(ts), 'Pp')}
          </Typography.Text>
        )}
      />
      <Table.Column
        title="Carrier ID"
        dataIndex="carrierId"
        filters={carrierFilters}
        onFilter={(v, r) => r.carrierId === v}
      />
      <Table.Column
        title="# Records"
        dataIndex="records"
        align="right"
        render={v => numeral(v).format('0,0')}
      />
      <Table.Column
        title="Revenue"
        dataIndex="revenue_by_carrier"
        align="right"
        render={v => numeral(v).format('$0,0.00')}
      />
      <Table.Column
        title="# Sends"
        dataIndex="sends"
        align="right"
        render={v => numeral(v).format('0,0')}
      />
      <Table.Column
        title="Optout"
        dataIndex="optout_by_carrier"
        align="right"
        render={v => numeral(v).format('0,0')}
      />
      <Table.Column
        title="Optout ratio"
        dataIndex="optout_ratio_by_carrier"
        align="right"
        render={v => numeral(v).format('0.00[00]%')}
      />
      <Table.Column
        title="Errors"
        dataIndex="errors"
        align="right"
        render={v => numeral(v).format('0,0')}
      />
      <Table.Column
        title="Error rate"
        dataIndex="error_rate"
        align="right"
        render={v => numeral(v).format('0.00[00]%')}
      />
    </Table>
  );
};

export default TableReport;
