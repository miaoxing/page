<?php

namespace Miaoxing\Page;

use Miaoxing\Admin\Service\AdminMenu;
use Miaoxing\Plugin\BasePlugin;

class PagePlugin extends BasePlugin
{
    protected $name = '页面';

    public function onAdminMenuGetMenus(AdminMenu $menu)
    {
        $setting = $menu->child('setting');

        $pages = $setting->addChild()->setLabel('页面管理')->setUrl('admin/pages')->setSort(300);
        $pages->addChild()->setUrl('admin/pages/new')->setLabel('添加');
        $pages->addChild()->setUrl('admin/pages/[id]/edit')->setLabel('编辑');
    }
}
