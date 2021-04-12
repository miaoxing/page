<?php

namespace Miaoxing\Page\Migration;

use Wei\Migration\BaseMigration;

class V20210326182807CreatePageTables extends BaseMigration
{
    /**
     * {@inheritdoc}
     */
    public function up()
    {
        $this->schema->table('pages')->tableComment('页面')
            ->bigId()
            ->uInt('app_id')->comment('应用编号')
            ->string('name')->comment('页面名称')
            ->tinyInt('type')->defaults(1)->comment('页面类型。1:独立页面;2:首页')
            ->timestamps()
            ->userstamps()
            ->softDeletable()
            ->exec();

        $this->schema->table('page_components')->tableComment('页面组件')
            ->bigId()
            ->uInt('app_id')->comment('应用编号')
            ->uBigInt('page_id')->comment('页面编号')
            ->string('type', 32)->comment('类型')
            ->smallInt('sort')->comment('顺序')
            ->json('props')->comment('属性')
            ->timestamps()
            ->userstamps()
            ->softDeletable()
            ->exec();
    }

    /**
     * {@inheritdoc}
     */
    public function down()
    {
        $this->schema->dropIfExists('pages')
            ->dropIfExists('page_components');
    }
}
