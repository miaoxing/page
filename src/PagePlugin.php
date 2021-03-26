<?php

namespace Miaoxing\Page;

use Miaoxing\Plugin\BasePlugin;

class PagePlugin extends BasePlugin
{
    protected $name = '页面';

    public function onAdminNavGetNavs(&$navs, &$categories, &$subCategories)
    {
        $subCategories[] = [
            'parentId' => 'setting',
            'url' => 'admin/pages',
            'name' => '页面管理',
            'sort' => 30,
        ];
    }
}
