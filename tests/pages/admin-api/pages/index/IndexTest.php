<?php

namespace MiaoxingTest\Page\Pages\AdminApi\Pages\Index;

use Miaoxing\Page\Service\PageModel;
use Miaoxing\Plugin\Service\Tester;
use Miaoxing\Plugin\Service\User;
use Miaoxing\Plugin\Test\BaseTestCase;

class IndexTest extends BaseTestCase
{
    public function testPut()
    {
        User::loginById(1);

        $page = PageModel::save([
            'name' => '测试新首页',
        ]);

        $indexPage = PageModel::findByOrCreate(['type' => PageModel::TYPE_INDEX]);

        $ret = Tester::putAdminApi('pages/index', ['id' => $page->id]);
        $this->assertRetSuc($ret);

        $page->reload();
        $this->assertSame(PageModel::TYPE_INDEX, $page->type);

        $indexPage->reload();
        $this->assertSame(PageModel::TYPE_STANDALONE, $indexPage->type);
    }
}
