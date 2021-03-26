<?php

namespace Miaoxing\Page\Service;

use Miaoxing\Page\Metadata\PageTrait;
use Miaoxing\Plugin\BaseModel;
use Miaoxing\Plugin\Model\ModelTrait;
use Miaoxing\Plugin\Model\ReqQueryTrait;
use Miaoxing\Plugin\Model\SoftDeleteTrait;

class PageModel extends BaseModel
{
    use ModelTrait;
    use PageTrait;
    use ReqQueryTrait;
    use SoftDeleteTrait;
}
