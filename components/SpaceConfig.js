import React from 'react';
import {Card, Slider, Input, Row, Col} from 'antd';
import PropTypes from 'prop-types';
import ColorPicker from '@mxjs/a-color-picker';
import {FormItem} from '@mxjs/a-form';

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
        <Input
          css={{textAlign: 'center'}}
          value={value}
          onChange={(e) => {
            console.log('x', e);
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

const SpaceConfig = ({propName}) => {
  return (
    <Card title="空白间距">
      <FormItem label="背景颜色" name={propName(['style', 'backgroundColor'])}>
        <ColorPicker/>
      </FormItem>
      <FormItem label="高度" name={propName(['style', 'height'])}>
        <IntegerStep min={1} max={200}/>
      </FormItem>
    </Card>
  );
};

SpaceConfig.propTypes = {
  propName: PropTypes.func,
};

export default SpaceConfig;
