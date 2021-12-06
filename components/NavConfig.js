import {Button, Card, Divider, Form, Radio} from 'antd';
import PropTypes from 'prop-types';
import ColorPicker from '@mxjs/a-color-picker';
import {FormItem} from '@mxjs/a-form';
import Upload from '@mxjs/upload';
import $ from 'miaoxing';
import {PlusOutlined, CloseCircleFilled, DownCircleFilled, UpCircleFilled} from '@ant-design/icons';
import LinkPicker from '@miaoxing/link-to/components/LinkPicker';
import {css, spacing} from '@mxjs/css';

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

                    <FormItem name={[name, 'image']} label="图片" extra="宽高 1:1">
                      <Upload
                        url={$.apiUrl('files', {type: 'image'})}
                        max={1}
                      />
                    </FormItem>

                    <FormItem name={[name, 'title']} label="文字内容"/>

                    <FormItem name={[name, 'link']} label="链接">
                      <LinkPicker/>
                    </FormItem>
                  </div>
                );
              })}
              <Button block type="dashed" onClick={() => {
                add({
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
