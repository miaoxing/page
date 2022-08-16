<?php

namespace Miaoxing\Page\Service;

use Miaoxing\Page\Metadata\PageTrait;
use Miaoxing\Plugin\BaseModel;
use Miaoxing\Plugin\Model\HasAppIdTrait;
use Miaoxing\Plugin\Model\ModelTrait;
use Miaoxing\Plugin\Model\ReqQueryTrait;
use Miaoxing\Plugin\Model\SnowflakeTrait;
use Wei\Model\SoftDeleteTrait;

/**
 * @property PageComponentModel|PageComponentModel[] $components
 */
class PageModel extends BaseModel
{
    use HasAppIdTrait;
    use ModelTrait;
    use PageTrait;
    use ReqQueryTrait;
    use SnowflakeTrait;
    use SoftDeleteTrait;

    public const TYPE_STANDALONE = 1;

    public const TYPE_INDEX = 2;

    public function components(): PageComponentModel
    {
        return $this->hasMany(PageComponentModel::class)->desc('sort');
    }
}
