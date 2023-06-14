<?php

namespace MiaoxingTest\Page\Pages\Api\Admin\Pages;

use Miaoxing\Page\Service\PageModel;
use Miaoxing\Plugin\Service\Tester;
use Miaoxing\Plugin\Service\User;
use Miaoxing\Plugin\Test\BaseTestCase;

class IndexTest extends BaseTestCase
{
    public function testGet()
    {
        User::loginById(1);

        $page = PageModel::save([
            'name' => '测试页面',
        ]);

        $ret = Tester::request(['limit' => 1])->getAdminApi('pages');

        $this->assertSame($page->toArray(), $ret['data'][0], 'order by id');
    }
}
