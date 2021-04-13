<?php

namespace MiaoxingTest\Page\Pages\AdminApi\Pages\Defaults;

use Miaoxing\Plugin\Service\Tester;
use Miaoxing\Plugin\Test\BaseTestCase;

class IndexTest extends BaseTestCase
{
    public function testGet()
    {
        $ret = Tester::getAdminApi('pages/defaults');

        $this->assertRetSuc($ret);
    }
}
