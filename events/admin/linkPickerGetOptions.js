import React, {useEffect, useState} from 'react';
import {Button, Modal} from 'antd';
import api from '@mxjs/api';
import {Table, TableProvider, useTable} from '@mxjs/a-table';
import {SearchForm, SearchItem} from '@mxjs/a-form';
import {CNewBtn} from '@mxjs/a-clink';
import {PageActions} from '@mxjs/a-page';
import Icon from '@mxjs/icons';
import $ from 'miaoxing';
import PropTypes from 'prop-types';

const PagePicker = ({pickerRef, linkPicker, value}) => {
  const [table] = useTable();
  const [id, setId] = useState(value.id);
  const [name, setName] = useState();
  const [visible, setVisible] = useState(true);

  // 每次都更新
  pickerRef && (pickerRef.current = {
    show: () => {
      setVisible(true);
    },
  });

  return <Modal
    title="选择页面"
    visible={visible}
    width={800}
    bodyStyle={{
      padding: '1rem',
    }}
    onOk={() => {
      linkPicker.addValue({id}, {name});
      setVisible(false);
    }}
    onCancel={() => {
      setVisible(false);
    }}
  >
    <TableProvider>
      <PageActions>
        <CNewBtn target="_blank">
          添 加{' '}<Icon type="mi-external-link"/>
        </CNewBtn>
        <Button onClick={() => {
          table.reload();
        }}>刷新</Button>
      </PageActions>
      <SearchForm>
        <SearchItem label="名称" name={['search', 'name:ct']}/>
      </SearchForm>
      <Table
        tableApi={table}
        url={$.apiUrl('pages')}
        rowSelection={{
          type: 'radio',
          onChange: (selectedRowKeys, selectedRows) => {
            setId(selectedRowKeys[0]);
            setName(selectedRows[0]?.name);
          },
        }}
        columns={[
          {
            title: '名称',
            dataIndex: 'name',
          },
          {
            title: '创建时间',
            dataIndex: 'createdAt',
            width: 180,
          },
          {
            title: '最后更改时间',
            dataIndex: 'updatedAt',
            width: 180,
          },
        ]}
      />
    </TableProvider>
  </Modal>;
};

PagePicker.propTypes = {
  pickerRef: PropTypes.object,
  linkPicker: PropTypes.object,
  value: PropTypes.object,
};

const PagePickerLabel = ({value, extra}) => {
  const [name, setName] = useState('');

  useEffect(() => {
    if (!extra.name) {
      (async () => {
        const ret = await api.get('pages/' + value.id);
        setName(ret.data.name);
      })();
    }
  }, [value.id, extra]);

  return extra.name || name;
};

export default [
  {
    value: 'page',
    label: '页面',
    children: [
      {
        value: 'pages/index',
        label: '首页',
      },
      {
        value: 'pages/[id]',
        label: <>独立页面 <Icon type="mi-popup"/></>,
        inputLabel: '独立页面',
        picker: PagePicker,
        pickerLabel: PagePickerLabel,
      },
    ],
  },
];
