import { Col, Row } from 'antd';
import { format, fromUnixTime } from 'date-fns';
import { flatMapDeep, fromPairs, groupBy, sumBy, uniq } from 'lodash-es';
import numeral from 'numeral';
import { useMemo } from 'react';
import { Area, CartesianGrid, Cell, ComposedChart, Legend, Line, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

import { hashToColor } from '@/utils';

function formatMoney(v) {
  return numeral(v).format('$0,0');
}

const RevenueReport = ({ carriersData }) => {
  const { values, sum, carriers } = useMemo(() => {
    const groups = groupBy(carriersData, 'timestamp');
    const values = Object.entries(groups).map(([ts, items]) => ({
      timestamp: format(fromUnixTime(ts), 'Pp'),
      ...fromPairs(items.map(item => ([item.carrierId, item.revenue_by_carrier]))),
      total: sumBy(items, 'revenue_by_carrier'),
    }));
    const sum = Object.entries(groupBy(carriersData, 'carrierId'))
      .map(([carrierId, records]) => ({
        name: carrierId,
        value: Math.round(sumBy(records, 'revenue_by_carrier') * 1000) / 1000,
      }));
    const carriers = uniq(flatMapDeep(carriersData.map(c => c.carrierId)));
    
    return { values, carriers, sum };
  }, [carriersData]);

  return (
    <Row>
      <Col span={16}>
        <div style={{ textAlign: 'center' }}>
          Revenue by carriers
        </div>
        <ResponsiveContainer width="100%" height={500}>
          <ComposedChart data={values} width={700} height={200}>
            <XAxis dataKey="timestamp" />
            <YAxis tickCount={20} tickFormatter={formatMoney} />
            <CartesianGrid stroke="#dddddd" strokeDasharray="5 5"/>
            <Legend verticalAlign="top" />
            <Tooltip formatter={formatMoney} />
            {carriers.map((cid) => (
              <Area key={cid} type="monotone" stackId="main" dataKey={cid} stroke={hashToColor(String(cid))} fill={hashToColor(String(cid))} />
            ))}
            <Line name="Total" type="monotone" dataKey="total" stroke="#000000" strokeWidth="0" dot={false} />
          </ComposedChart>
        </ResponsiveContainer>
      </Col>
      <Col span={8}>
        <div style={{ textAlign: 'center' }}>
          Revenue shares by carriers
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={sum}
              dataKey="value"
              nameKey="name"
              outerRadius={100}
              fill="#95de64"
              label={({ name, value }) => `${name}: ${formatMoney(value)}`}
            >
              {sum.map(({ name }) => (
                <Cell key={name} fill={hashToColor(String(name))} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </Col>
    </Row>
  );
};

export default RevenueReport;
