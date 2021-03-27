import React from 'react';
import {CTableDeleteLink, Table, TableProvider, useTable} from '@mxjs/a-table';
import {CEditLink, CNewBtn} from '@mxjs/a-clink';
import {Page, PageActions} from '@mxjs/a-page';
import {LinkActions} from '@mxjs/actions';
import {Tag} from 'antd';
import api from '@mxjs/api';
import $ from 'miaoxing';

const types = {
  1: <Tag color="blue">独立页面</Tag>,
  2: <Tag color="orange">首页</Tag>,
};

const Index = () => {
  const [table] = useTable();

  return (
    <Page>
      <PageActions>
        <CNewBtn/>
      </PageActions>

      <TableProvider>
        <Table
          tableApi={table}
          columns={[
            {
              title: '名称',
              dataIndex: 'name',
            },
            {
              title: '类型',
              dataIndex: 'type',
              render: (value) => types[value],
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
            {
              title: '操作',
              dataIndex: 'id',
              render: (id, data) => (
                <LinkActions>
                  {data.type === 1 && <a href="#" onClick={async (e) => {
                    e.preventDefault();
                    const ret = await api.put('pages/index', {data:{id}});
                    $.ret(ret);
                    table.reload();
                  }}>设为首页</a>}
                  <CEditLink id={id}/>
                  <CTableDeleteLink id={id}/>
                </LinkActions>
              ),
            },
          ]}
        />
      </TableProvider>
    </Page>
  );
};

export default Index;
