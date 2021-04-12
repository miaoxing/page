/**
 * @share [id]/edit
 */
import React, {useEffect, useRef, useState} from 'react';
import {CListBtn} from '@mxjs/a-clink';
import {Page, PageActions} from '@mxjs/a-page';
import {Form} from '@mxjs/a-form';
import {Col, Row, Form as AntdForm, Dropdown, Menu} from 'antd';
import {floatRight} from '@mxjs/css';
import curUrl from '@mxjs/cur-url';
import {event} from '@mxjs/app';
import EditorComponentPanel from '../../../components/EditorComponentPanel';
import EditorConfigPanel from '../../../components/EditorConfigPanel';
import EditorPreviewPanel from '../../../components/EditorPreviewPanel';
import $ from 'miaoxing';
import orderBy from 'lodash/orderBy';

// @link https://gist.github.com/gordonbrander/2230317
const generateId = () => {
  return Math.random().toString(36).substr(2, 9);
};

const getComponents = async () => {
  let components = [];
  await event.trigger('pageGetComponents', [components]);

  components.forEach(component => {
    if (typeof component.sort === 'undefined') {
      component.sort = 50;
    }
  });
  components = orderBy(components, ['sort'], 'desc');
  components = components.reduce((result, component) => {
    result[component.type] = component;
    return result;
  }, {});

  return components;
};

const New = () => {
  const form = useRef();
  const [isNew, setIsNew] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [redirect, setRedirect] = useState(false);

  const [components, setComponents] = useState({});
  const loadedComponents = useRef(new Promise(() => {
  }));
  const componentsRef = useRef({});

  useEffect(() => {
    loadedComponents.current = new Promise((resolve) => {
      (async () => {
        const components = await getComponents();
        setComponents(components);
        componentsRef.current = components;
        resolve();
      })();
    });
  }, []);

  const initComponent = (type) => {
    return {
      id: generateId(),
      type: type,
      props: getDefaults(type),
    };
  };

  const getDefaults = (type) => {
    // FIXME: 添加时，components 未更新，先用 componentsRef 替代
    return componentsRef.current[type].default || {};
  };

  return (
    <Page>
      <Form
        formRef={form}
        labelCol={{span: 8}}
        wrapperCol={{span: 24}}
        redirect={redirect}
        redirectUrl={(ret) => {
          if (!$.req('id')) {
            return curUrl.edit(ret.data.id);
          }
          return curUrl.index();
        }}
        afterLoad={async (ret) => {
          await loadedComponents.current;

          if (!ret.data.components) {
            ret.data.components = [
              initComponent('page'),
              initComponent('richText'),
            ];
          } else {
            ret.data.components.forEach((component) => {
              // 合并一级属性和样式
              const defaults = getDefaults(component.type);
              component.props = {...defaults, ...component.props};
              if (component.props.style && defaults.style) {
                component.props.style = {...defaults.style, ...component.props.style};
              }
            });
          }
        }}
        beforeSubmit={(values) => {
          values.components.forEach((component, index) => {
            // 同步页面名称
            if (component.type === 'page') {
              values.name = component.props.name;
            }
            // 增加排序
            component.sort = 1000 - index;
          });
          return values;
        }}
        afterSubmit={(ret, form) => {
          ret.isSuc() && form.setFieldsValue(ret.data);
        }}
      >
        <PageActions>
          <CListBtn/>

          <Dropdown.Button
            type="primary"
            htmlType="submit"
            css={floatRight()}
            overlay={
              <Menu>
                <Menu.Item onClick={() => {
                  setRedirect(true);
                  form.current.submit();
                }}>
                  保存并返回
                </Menu.Item>
              </Menu>
            }
            onClick={() => {
              setRedirect(!form.current.getFieldValue('id'));
            }}
          >
            保存
          </Dropdown.Button>
        </PageActions>

        <AntdForm.List name="components">
          {(fields, {add, remove, move}) => {
            const onAdd = (type) => {
              setIsNew(true);
              setSelectedIndex(fields.length);
              add(initComponent(type));
            };

            const onDelete = (index) => {
              $.confirm('删除后将无法还原，确认删除?', result => {
                if (result) {
                  remove(index);
                }
              });
            };

            const onMove = (from, to) => {
              move(from, to);
              if (selectedIndex === from) {
                setSelectedIndex(to);
              } else if (selectedIndex === to) {
                setSelectedIndex(from);
              }
            };

            return (
              <Row gutter={16} justify="center">
                <Col flex="300px">
                  <EditorComponentPanel
                    components={components}
                    onAdd={onAdd}
                  />
                </Col>

                <Col flex="375px">
                  {/* 更改表单后重新渲染预览区域 */}
                  <AntdForm.Item noStyle shouldUpdate>
                    {() => (
                      <EditorPreviewPanel
                        components={components}
                        fields={fields}
                        selectedIndex={selectedIndex}
                        isNew={isNew}
                        onSelect={setSelectedIndex}
                        onDelete={onDelete}
                        onMove={onMove}
                      />
                    )}
                  </AntdForm.Item>
                </Col>

                <Col flex="460px">
                  <EditorConfigPanel
                    components={components}
                    fields={fields}
                    selectedIndex={selectedIndex}
                  />
                </Col>
              </Row>
            );
          }}
        </AntdForm.List>
      </Form>
    </Page>
  );
};

export default New;
