<?php

namespace MiaoxingTest\Page\Pages\AdminApi\Pages;

use Miaoxing\Page\Service\PageModel;
use Miaoxing\Plugin\Service\Tester;
use Miaoxing\Plugin\Test\BaseTestCase;

/**
 * @mixin \ObjectReqMixin
 */
class IdTest extends BaseTestCase
{
    public function testDelete()
    {
        $page = PageModel::save();

        $ret = Tester::deleteAdminApi('pages/' . $page->id);
        $this->assertRetSuc($ret);

        $page->reload();
        $this->assertTrue($page->isDeleted());
    }

    public function testPost()
    {
        $ret = Tester::setReq($this->objectReq)->postAdminApi('pages', [
            'name' => '测试',
            'components' => [
                [
                    'type' => 'page',
                    'props' => (object) [
                        'shareTitle' => '分享标题',
                    ],
                ],
            ],
        ]);
        $this->assertRetSuc($ret);
    }

    public function testPostWithoutName()
    {
        $ret = Tester::setReq($this->objectReq)->postAdminApi('pages');
        $this->assertRetErr($ret, '名称不能为空');
    }

    public function testPostWithoutComponents()
    {
        $ret = Tester::setReq($this->objectReq)->postAdminApi('pages', [
            'name' => 'test',
        ]);
        $this->assertRetErr($ret, '组件不能为空');
    }

    public function testPostWithoutComponentType()
    {
        $ret = Tester::setReq($this->objectReq)->postAdminApi('pages', [
            'name' => 'test',
            'components' => [
                [
                ],
            ],
        ]);
        $this->assertRetErr($ret, '第 1 个组件的类型不能为空');
    }

    public function testPostWithoutComponentProps()
    {
        $ret = Tester::setReq($this->objectReq)->postAdminApi('pages', [
            'name' => 'test',
            'components' => [
                [
                    'type' => 'page',
                ],
            ],
        ]);
        $this->assertRetErr($ret, '第 1 个组件的属性不能为空');
    }

    public function testPostWithoutComponentInvalidProps()
    {
        $ret = Tester::setReq($this->objectReq)->postAdminApi('pages', [
            'name' => 'test',
            'components' => [
                [
                    'type' => 'page',
                    'props' => 'test',
                ],
            ],
        ]);
        $this->assertRetErr($ret, '第 1 个组件的属性必须是一个对象');
    }

    public function testPatch()
    {
        $page = PageModel::save([
            'name' => 'test',
        ]);

        $ret = Tester::patchAdminApi('pages/' . $page->id, [
            'name' => 'test2',
        ]);

        $this->assertRetSuc($ret);

        /** @var PageModel $newPage */
        $newPage = $ret['data'];
        $this->assertSame('test2', $newPage->name);
    }
}
