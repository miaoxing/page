import {Card} from 'antd';
import {FormUeditor} from '@mxjs/a-ueditor';
import PropTypes from 'prop-types';

const RichTextConfig = ({propName}) => {
  return (
    <Card title="富文本">
      <FormUeditor wrapperCol={{span: 24}} name={propName('content')}/>
    </Card>
  );
};

RichTextConfig.propTypes = {
  propName: PropTypes.func,
};

export default RichTextConfig;
