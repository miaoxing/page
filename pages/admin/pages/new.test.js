import Page from './new';
import {fireEvent, render, screen, waitFor} from '@testing-library/react';
import {MemoryRouter} from 'react-router';
import {app, event} from '@mxjs/app';
import $, {Ret} from 'miaoxing';
import {bootstrap, createPromise, setUrl, resetUrl} from '@mxjs/test';
import events from '../../../events/admin/events';

bootstrap();

// add new component will call scrollIntoView
window.HTMLElement.prototype.scrollIntoView = function () {
};

const path = 'admin/page';

describe(path, () => {
  beforeAll(() => {
    event.on('pageGetComponents', events.onPageGetComponents);
  });

  beforeEach(() => {
    setUrl(path + '/new');
    app.page = {
      collection: path,
      index: false,
    };
  });

  afterEach(() => {
    resetUrl();
    app.page = {};
  });

  test('form', async () => {
    const promise = createPromise();
    const promise2 = createPromise();

    $.http = jest.fn()
      // 读取默认数据
      .mockImplementationOnce(() => promise.resolve({
        ret: Ret.new({
          code: 1,
          data: {
            id: 1,
            name: 'page',
          },
        }),
      }))
      // 提交
      .mockImplementationOnce(() => promise2.resolve({
        ret: Ret.new({
          code: 1,
        }),
      }));

    const result = render(<MemoryRouter>
      <Page/>
    </MemoryRouter>);

    await Promise.all([promise]);
    expect($.http).toHaveBeenCalledTimes(1);
    expect($.http).toMatchSnapshot();

    // 看到表单加载了数据
    await waitFor(() => expect(result.getByLabelText('页面名称').value).toBe('未命名页面'));

    // 提交表单
    fireEvent.click(screen.getByText('保 存'));

    await Promise.all([promise2]);

    $.http.mock.calls[1][0].data.components.forEach(component => {
      component.id = 'fixed';
    });

    expect($.http).toHaveBeenCalledTimes(2);
    expect($.http).toMatchSnapshot();
  });

  test('flow', async () => {
    const promise = createPromise();
    const promise2 = createPromise();

    $.http = jest.fn()
      // 读取默认数据
      .mockImplementationOnce(() => promise.resolve({
        ret: Ret.new({
          code: 1,
          data: {
            id: 1,
            name: 'page',
            components: [
              {
                id: 1,
                type: 'page',
                props: {
                  name: '自定义页面名称',
                },
              },
            ],
          },
        }),
      }))
      // 提交
      .mockImplementationOnce(() => promise2.resolve({
        ret: Ret.new({
          code: 1,
        }),
      }));

    const result = render(<MemoryRouter>
      <Page/>
    </MemoryRouter>);

    await Promise.all([promise]);
    expect($.http).toHaveBeenCalledTimes(1);
    expect($.http).toMatchSnapshot();

    // 看到表单加载了数据
    await waitFor(() => expect(result.getByLabelText('页面名称').value).toBe('自定义页面名称'));

    // 添加组件
    const button = await result.findByText('富文本');
    fireEvent.click(button);

    // 预览组件
    await result.findByText('加粗');

    // 删除组件
    $.confirm = jest.fn().mockImplementationOnce((message, fn) => {
      return fn(true);
    });

    const deleteButton = await result.findByText('删除');
    fireEvent.click(deleteButton);

    expect(result.queryAllByText('加粗')).toHaveLength(0);

    // 重新加回去
    fireEvent.click(button);
    await result.findByText('加粗');

    // 提交表单
    fireEvent.click(result.getByText('保 存'));

    await Promise.all([promise2]);
    expect($.http).toHaveBeenCalledTimes(2);

    $.http.mock.calls[1][0].data.components.forEach(component => {
      component.id = 'fixed';
    });

    expect($.http).toMatchSnapshot();
  });

  test('click component will add to preview panel', async () => {
    const promise = createPromise();
    $.http = jest.fn()
      // 读取默认数据
      .mockImplementationOnce(() => promise.resolve({
        ret: Ret.new({
          code: 1,
          data: {
            id: 1,
            name: 'page',
            components: [
              {
                id: 1,
                type: 'page',
                props: {
                  name: '自定义页面名称',
                },
              },
            ],
          },
        }),
      }));

    const result = render(<MemoryRouter>
      <Page/>
    </MemoryRouter>);

    await Promise.all([promise]);

    // 添加组件
    const button = await result.findByText('富文本');
    fireEvent.click(button);

    await waitFor(() => expect(result.getAllByText('加粗')).toHaveLength(1));
  });

  test('click preview component will show config panel', async () => {
    const promise = createPromise();
    $.http = jest.fn()
      // 读取默认数据
      .mockImplementationOnce(() => promise.resolve({
        ret: Ret.new({
          code: 1,
          data: {
            id: 1,
            name: 'page',
            components: [
              {
                id: 1,
                type: 'page',
                props: {
                  title: '自定义页面标题',
                },
              },
              {
                id: 2,
                type: 'richText',
                props: {
                  content: '富文本内容',
                },
              },
            ],
          },
        }),
      }));

    const result = render(<MemoryRouter>
      <Page/>
    </MemoryRouter>);

    await Promise.all([promise]);

    await waitFor(() => expect(result.queryAllByTestId('config-page')).toHaveLength(1));

    const pageConfig = result.queryByTestId('config-page');
    const richTextConfig = result.queryByTestId('config-richText');

    // 进入页面默认选中第一个
    expect(pageConfig.hidden).toBeFalsy();
    expect(richTextConfig.hidden).toBeTruthy();

    // first is preview, second is textarea
    const richTexts = await result.findAllByText('富文本内容');
    fireEvent.click(richTexts[0]);

    expect(pageConfig.hidden).toBeTruthy();
    expect(richTextConfig.hidden).toBeFalsy();
  });

  test('update config will refresh preview', async () => {
    const promise = createPromise();
    $.http = jest.fn()
      // 读取默认数据
      .mockImplementationOnce(() => promise.resolve({
        ret: Ret.new({
          code: 1,
          data: {
            id: 1,
            name: 'page',
            components: [
              {
                id: 1,
                type: 'page',
                props: {
                  name: '自定义页面名称',
                },
              },
            ],
          },
        }),
      }));

    const result = render(<MemoryRouter>
      <Page/>
    </MemoryRouter>);

    await Promise.all([promise]);

    const input = await result.findByLabelText('页面标题');
    fireEvent.change(input, {target: {value: '新页面标题'}});

    const title = await result.findByText('新页面标题');
    expect(title[Object.keys(title)[0]].type).toBe('div');
  });
});
