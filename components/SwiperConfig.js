import { Button, Card, Divider, Form, Input } from 'antd';
import PropTypes from 'prop-types';
import { FormItem } from '@mxjs/a-form';
import { PlusOutlined } from '@ant-design/icons';
import LinkPicker from '@miaoxing/link-to/components/LinkPicker';
import { Upload } from '@miaoxing/admin';
import ConfigItem from './ConfigItem';

const SwiperConfig = ({propName}) => {
  return (
    <Card title="轮播图" bodyStyle={{maxHeight: 542, overflowY: 'scroll'}}>
      <FormItem label="切换时间" name={propName(['duration'])}>
        <Input suffix="毫秒"/>
      </FormItem>

      <Divider/>

      <Form.List name={propName('items')}>
        {(fields, operation) => {
          return (
            <>
              {fields.map(({key, name}, index) => {
                return (
                  <ConfigItem key={key} index={index} length={fields.length} operation={operation}>
                    <FormItem name={[name, 'image']} label="图片" extra="建议宽 750px，高不限，较好显示效果是高 350px">
                      <Upload max={1}/>
                    </FormItem>

                    <FormItem name={[name, 'link']} label="链接">
                      <LinkPicker/>
                    </FormItem>
                  </ConfigItem>
                );
              })}
              <Button block type="dashed" onClick={() => {
                operation.add({});
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

SwiperConfig.propTypes = {
  propName: PropTypes.func,
};

export default SwiperConfig;
