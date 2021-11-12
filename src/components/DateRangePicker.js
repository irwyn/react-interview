import { DatePicker } from 'antd';

const DateRangePicker = ({ value, onChange }) => {
  return (
    <DatePicker.RangePicker showTime={{ showMinute: false, showSecond: false }} value={value} onChange={onChange} />
  );
};

export default DateRangePicker;
