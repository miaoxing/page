import Index from './index';
import {fireEvent, render, waitForElementToBeRemoved} from '@testing-library/react';
import {MemoryRouter} from 'react-router';
import $, {Ret} from 'miaoxing';
import {bootstrap, createPromise, setUrl, resetUrl} from '@mxjs/test';
import {app} from '@mxjs/app';

bootstrap();

const path = 'admin/pages';

describe(path, () => {
  beforeEach(function () {
    setUrl(path);
    app.page = {
      collection: path,
      index: true,
    };
  });

  afterEach(() => {
    resetUrl();
    app.page = {};
  });

  test('index', async () => {
    const promise = createPromise();

    $.http = jest.fn()
      // 读取列表数据
      .mockImplementationOnce(() => promise.resolve({
        ret: Ret.new({
          code: 0,
          data: [
            {
              id: 1,
              name: '测试页面',
              type: 1,
              updatedAt: '2020-01-01 00:00:00',
            },
          ],
        }),
      }));

    const {findByText} = render(<MemoryRouter>
      <Index/>
    </MemoryRouter>);

    await findByText('测试页面');
    await findByText('独立页面');
    await findByText('2020-01-01 00:00:00');

    await Promise.all([promise]);
    expect($.http).toHaveBeenCalledTimes(1);
    expect($.http).toMatchSnapshot();
  });

  test('set index', async () => {
    const promise = createPromise();
    const promise2 = createPromise();
    const promise3 = createPromise();

    $.http = jest.fn()
      // 读取列表数据
      .mockImplementationOnce(() => promise.resolve({
        ret: Ret.new({
          code: 0,
          data: [
            {
              id: 1,
              name: '测试页面',
              type: 1,
              updatedAt: '2020-01-01 00:00:00',
            },
          ],
        }),
      }))
      .mockImplementationOnce(() => promise2.resolve({
        ret: Ret.new({
          code: 0,
        }),
      }))
      .mockImplementationOnce(() => promise3.resolve({
        ret: Ret.new({
          code: 0,
          data: [
            {
              id: 1,
              name: '测试页面',
              type: 2,
              updatedAt: '2020-01-01 00:00:00',
            },
          ],
        }),
      }));

    const result = render(<MemoryRouter>
      <Index/>
    </MemoryRouter>);

    const link = await result.findByText('设为首页');

    await Promise.all([promise]);

    fireEvent.click(link);
    await waitForElementToBeRemoved(() => result.queryByText('设为首页'));

    await Promise.all([promise2, promise3]);

    expect($.http).toHaveBeenCalledTimes(3);
    expect($.http).toMatchSnapshot();
  });
});
