import { Button, Card, Divider, Form, Radio } from 'antd';
import PropTypes from 'prop-types';
import ColorPicker from '@mxjs/a-color-picker';
import { FormItem } from '@mxjs/a-form';
import { PlusOutlined } from '@ant-design/icons';
import LinkPicker from '@miaoxing/link-to/components/LinkPicker';
import { Upload } from '@miaoxing/admin';
import ConfigItem from './ConfigItem';

const NavConfig = ({propName}) => {
  return (
    <Card title="导航" bodyStyle={{maxHeight: 542, overflowY: 'scroll'}}>
      <FormItem label="文字颜色" name={propName(['style', 'color'])}>
        <ColorPicker/>
      </FormItem>

      <FormItem label="背景颜色" name={propName(['style', 'backgroundColor'])}>
        <ColorPicker/>
      </FormItem>

      <FormItem label="每行显示" name={propName(['rowNum'])}>
        <Radio.Group>
          <Radio value={3}>3个</Radio>
          <Radio value={4}>4个</Radio>
          <Radio value={5}>5个</Radio>
        </Radio.Group>
      </FormItem>

      <Divider/>

      <Form.List name={propName('items')}>
        {(fields, operation) => {
          return (
            <>
              {fields.map(({key, name}, index) => {
                return (
                  <ConfigItem key={key} index={index} length={fields.length} operation={operation}>
                    <FormItem name={[name, 'image']} label="图片" extra="宽高 1:1">
                      <Upload max={1}/>
                    </FormItem>

                    <FormItem name={[name, 'title']} label="文字内容"/>

                    <FormItem name={[name, 'link']} label="链接">
                      <LinkPicker/>
                    </FormItem>
                  </ConfigItem>
                );
              })}
              <Button block type="dashed" onClick={() => {
                operation.add({
                  title: '导航' + (fields.length + 1),
                });
              }}>
                <PlusOutlined/>
                增加
              </Button>
            </>
          );
        }}
      </Form.List>
    </Card>
  );
};

NavConfig.propTypes = {
  propName: PropTypes.func,
};

export default NavConfig;
