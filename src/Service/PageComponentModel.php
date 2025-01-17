<?php

namespace Miaoxing\Page\Service;

use Miaoxing\Plugin\BaseModel;
use Miaoxing\Plugin\Model\HasAppIdTrait;
use Miaoxing\Plugin\Model\ModelTrait;
use Miaoxing\Plugin\Model\SnowflakeTrait;
use Wei\Model\SoftDeleteTrait;

/**
 * @property string|null $id
 * @property string $appId 应用编号
 * @property string $pageId 页面编号
 * @property string $type 类型
 * @property int $sort 顺序
 * @property object $props 属性
 * @property string|null $createdAt
 * @property string|null $updatedAt
 * @property string $createdBy
 * @property string $updatedBy
 * @property string|null $deletedAt
 * @property string $deletedBy
 */
class PageComponentModel extends BaseModel
{
    use HasAppIdTrait;
    use ModelTrait;
    use SnowflakeTrait;
    use SoftDeleteTrait;

    protected $columns = [
        'props' => [
            'cast' => 'object',
        ],
    ];
}
