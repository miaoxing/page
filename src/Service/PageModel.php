<?php

namespace Miaoxing\Page\Service;

use Miaoxing\Plugin\BaseModel;
use Miaoxing\Plugin\Model\HasAppIdTrait;
use Miaoxing\Plugin\Model\ModelTrait;
use Miaoxing\Plugin\Model\ReqQueryTrait;
use Miaoxing\Plugin\Model\SnowflakeTrait;
use Wei\Model\SoftDeleteTrait;

/**
 * @property string|null $id
 * @property string $appId 应用编号
 * @property string $name 页面名称
 * @property int $type 页面类型。1:独立页面;2:首页
 * @property string|null $createdAt
 * @property string|null $updatedAt
 * @property string $createdBy
 * @property string $updatedBy
 * @property string|null $deletedAt
 * @property string $deletedBy
 * @property PageComponentModel $components
 * @property string|null $id
 * @property string $appId 应用编号
 * @property string $name 页面名称
 * @property int $type 页面类型。1:独立页面;2:首页
 * @property string|null $createdAt
 * @property string|null $updatedAt
 * @property string $createdBy
 * @property string $updatedBy
 * @property string|null $deletedAt
 * @property string $deletedBy
 */
class PageModel extends BaseModel
{
    use HasAppIdTrait;
    use ModelTrait;
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
