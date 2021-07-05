import {Button, Card, Divider, Form, Input} from 'antd';
import PropTypes from 'prop-types';
import {FormItem} from '@mxjs/a-form';
import Upload from '@mxjs/upload';
import $ from 'miaoxing';
import {PlusOutlined, CloseCircleFilled, DownCircleFilled, UpCircleFilled} from '@ant-design/icons';
import {css} from '@chakra-ui/react';
import LinkPicker from '@miaoxing/link-to/components/LinkPicker';

const navItem = css({
  position: 'relative',
  mb: 4,
  px: 6,
  pt: 6,
  boxShadow: 'sm',
  border: '1px solid',
  borderColor: 'gray.100',
  _hover: {
    '> .toolbar': {
      display: 'block',
    },
  },
});

const toolbar = css({
  display: 'none',
  position: 'absolute',
  top: -4,
  right: -2,
  fontSize: 'xl',
  '> a': {
    ml: 1,
    color: 'gray.400',
  },
});

const SwiperConfig = ({propName}) => {
  return (
    <Card title="轮播图" bodyStyle={{maxHeight: 542, overflowY: 'scroll'}}>
      <FormItem label="切换时间" name={propName(['duration'])}>
        <Input suffix="毫秒"/>
      </FormItem>

      <Divider/>

      <Form.List name={propName('items')}>
        {(fields, {add, remove, move}) => {
          return (
            <>
              {fields.map(({key, name}, index) => {
                return (
                  <div key={key} css={navItem}>
                    <div className="toolbar" css={toolbar}>
                      {index !== 0 && <a href="#" onClick={(e) => {
                        e.preventDefault();
                        move(index, index - 1);
                      }}>
                        <UpCircleFilled/>
                      </a>}
                      {index !== fields.length - 1 && <a href="#" onClick={(e) => {
                        e.preventDefault();
                        move(index, index + 1);
                      }}>
                        <DownCircleFilled/>
                      </a>}
                      <a href="#" onClick={(e) => {
                        e.preventDefault();
                        $.confirm('删除后不能还原，确认删除？', result => {
                          if (result) {
                            remove(index);
                          }
                        });
                      }}>
                        <CloseCircleFilled/>
                      </a>
                    </div>

                    <FormItem name={[name, 'image']} label="图片"
                      extra="建议宽 750px，高不限，较好显示效果是高 350px"
                    >
                      <Upload
                        url={$.apiUrl('files', {type: 'image'})}
                        max={1}
                      />
                    </FormItem>

                    <FormItem name={[name, 'link']} label="链接">
                      <LinkPicker/>
                    </FormItem>
                  </div>
                );
              })}
              <Button block type="dashed" onClick={() => {
                add({});
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
