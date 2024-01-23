import { Card, Slider, Input, Row, Col, Radio } from 'antd';
import PropTypes from 'prop-types';
import ColorPicker from '@mxjs/a-color-picker';
import { FormItem } from '@mxjs/a-form';
import { Box } from '@mxjs/a-box';

const IntegerStep = (props) => {
  let value = parseInt(props.value, 10);
  if (isNaN(value)) {
    value = 0;
  }
  if (value > props.max) {
    value = props.max;
  }
  if (value < props.min) {
    value = props.min;
  }

  return (
    <Row gutter={8}>
      <Col span={18}>
        <Slider
          min={props.min}
          max={props.max}
          onChange={props.onChange}
          value={value}
        />
      </Col>
      <Col span={6}>
        <Box
          as={Input}
          textAlign="center"
          value={value}
          onChange={(e) => {
            props.onChange(e);
          }}
        />
      </Col>
    </Row>
  );
};

IntegerStep.propTypes = {
  min: PropTypes.number,
  max: PropTypes.number,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  onChange: PropTypes.func,
};

const DividerConfig = ({propName}) => {
  return (
    <Card title="分割线">
      <FormItem label="线条样式" name={propName(['style', 'borderStyle'])}>
        <Radio.Group>
          <Radio value="solid">实线</Radio>
          <Radio value="dashed">虚线</Radio>
          <Radio value="dotted">点线</Radio>
        </Radio.Group>
      </FormItem>
      <FormItem name={propName(['style', 'borderColor'])} label="线条颜色">
        <ColorPicker/>
      </FormItem>
      <FormItem label="上下边距" name={propName(['style', 'my'])}>
        <IntegerStep min={1} max={100}/>
      </FormItem>
      <FormItem label="左右边距" name={propName(['style', 'mx'])}>
        <IntegerStep min={0} max={100}/>
      </FormItem>
    </Card>
  );
};

DividerConfig.propTypes = {
  propName: PropTypes.func,
};

export default DividerConfig;
