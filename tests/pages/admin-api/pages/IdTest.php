<?php

namespace MiaoxingTest\Page\Pages\AdminApi\Pages;

use Miaoxing\Page\Service\PageModel;
use Miaoxing\Plugin\Service\Tester;
use Miaoxing\Plugin\Test\BaseTestCase;

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
}
