<?php

namespace Miaoxing\Page;

use Miaoxing\Admin\Service\AdminMenu;
use Miaoxing\App\Service\PermissionMap;
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
        $pages->addChild()->setUrl('admin/pages/[id]/delete')->setLabel('删除');
    }

    public function onPermissionGetMap(PermissionMap $map)
    {
        $map->prefix('admin/pages', function (PermissionMap $map) {
            $map->addList('', [
                'PUT api/admin/pages/index',
            ]);
            $map->addNew();
            $map->addEdit();
            $map->addDelete();
        });
    }
}
