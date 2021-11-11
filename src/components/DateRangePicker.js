import { DatePicker } from 'antd';

const DateRangePicker = ({ value, onChange }) => {
  return (
    <DatePicker.RangePicker showTime={{ format: 'HH', defaultValue: new Date() }} value={value} onChange={onChange} />
  );
};

export default DateRangePicker;
