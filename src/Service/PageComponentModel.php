<?php

namespace Miaoxing\Page\Service;

use Miaoxing\Page\Metadata\PageComponentTrait;
use Miaoxing\Plugin\BaseModel;
use Miaoxing\Plugin\Model\HasAppIdTrait;
use Miaoxing\Plugin\Model\ModelTrait;
use Miaoxing\Plugin\Model\SnowflakeTrait;
use Wei\Model\SoftDeleteTrait;

class PageComponentModel extends BaseModel
{
    use HasAppIdTrait;
    use ModelTrait;
    use PageComponentTrait;
    use SnowflakeTrait;
    use SoftDeleteTrait;

    protected $columns = [
        'props' => [
            'cast' => 'object',
        ],
    ];
}
