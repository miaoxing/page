import {CTableDeleteLink, Table, TableActions, TableProvider, useTable} from '@mxjs/a-table';
import {CEditLink, CNewBtn} from '@mxjs/a-clink';
import {Page, PageActions} from '@mxjs/a-page';
import {Tag} from 'antd';
import $ from 'miaoxing';

const types = {
  1: <Tag color="blue" bordered={false}>独立页面</Tag>,
  2: <Tag color="orange" bordered={false}>首页</Tag>,
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
                <TableActions>
                  {data.type === 1 && <a href="#" onClick={async (e) => {
                    e.preventDefault();
                    const {ret} = await $.put('pages/index', {data:{id}});
                    $.ret(ret);
                    table.reload();
                  }}>设为首页</a>}
                  <CEditLink id={id}/>
                  <CTableDeleteLink id={id}/>
                </TableActions>
              ),
            },
          ]}
        />
      </TableProvider>
    </Page>
  );
};

export default Index;
