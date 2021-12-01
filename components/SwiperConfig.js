import {Button, Card, Divider, Form, Input} from 'antd';
import PropTypes from 'prop-types';
import {FormItem} from '@mxjs/a-form';
import Upload from '@mxjs/upload';
import $ from 'miaoxing';
import {PlusOutlined, CloseCircleFilled, DownCircleFilled, UpCircleFilled} from '@ant-design/icons';
import {css} from '@fower/core';
import LinkPicker from '@miaoxing/link-to/components/LinkPicker';
import {spacing} from '@mxjs/css';

const navItemClass = css({
  position: 'relative',
  mb4: true,
  px6: true,
  pt6: true,
  shadowTiny: true,
  border: 1,
  borderColor: 'gray100',
  ':hover': {
    '> .toolbar': {
      display: 'block',
    },
  },
});

const toolbarClass = css({
  display: 'none',
  position: 'absolute',
  top: -spacing(4),
  right: -spacing(2),
  textXL: true,
  '> a': {
    ml1: true,
    gray400: true,
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
                  <div key={key} className={navItemClass}>
                    <div className={'toolbar ' + toolbarClass}>
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
