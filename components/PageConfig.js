import {Card, Divider, Radio} from 'antd';
import {FormItem} from '@mxjs/a-form';
import Upload from '@mxjs/upload';
import $ from 'miaoxing';
import ColorPicker from '@mxjs/a-color-picker';
import PropTypes from 'prop-types';

const PageConfig = ({propName}) => {
  return (
    <Card title="页面">
      <FormItem name={propName('name')} label="页面名称" extra="仅供后台展示"/>

      <FormItem name={propName('shareTitle')} label="分享标题"/>

      <FormItem name={propName('shareImage')} label="分享图片">
        <Upload url={$.apiUrl('files', {type: 'image'})} max={1}/>
      </FormItem>

      <Divider/>

      <FormItem name={propName('title')} label="页面标题"/>

      <FormItem name={propName(['navStyle', 'color'])} label="标题颜色">
        <Radio.Group>
          <Radio value="black">黑色</Radio>
          <Radio value="white">白色</Radio>
        </Radio.Group>
      </FormItem>

      <FormItem name={propName(['navStyle', 'backgroundColor'])} label="背景颜色">
        <ColorPicker disableAlpha/>
      </FormItem>
    </Card>
  );
};

PageConfig.propTypes = {
  propName: PropTypes.func,
};

export default PageConfig;
