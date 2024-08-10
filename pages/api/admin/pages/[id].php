<?php

use Miaoxing\Page\Service\PageModel;
use Miaoxing\Plugin\BasePage;
use Miaoxing\Services\Page\ItemTrait;
use Miaoxing\Services\Service\UpdateAction;
use Wei\V;

return new /**
 * @mixin \ObjectReqMixin
 */
class extends BasePage {
    use ItemTrait;

    protected $include = [
        'components',
    ];

    public function patch()
    {
        return UpdateAction::setReq($this->objectReq)
            ->beforeSave(static function (PageModel $page, $req) {
                $v = V::defaultOptional();
                $v->tinyChar('name', '名称')->required($page->isNew())->notBlank();
                $v->array('components', '组件')->required($page->isNew())->each(static function (V $v) {
                    $v->maxLength('type', '类型', 32);
                    $v->object('props', '属性', 1024 * 1024 * 16);
                });
                return $v->check($req);
            })
            ->afterSave(static function (PageModel $page, $req) {
                if ($req['components']) {
                    $page->components()->saveRelation($req['components']);
                }

                // 返回值包含所有页面组件，以便前端更新组件编号
                $page->components;
            })
            ->exec($this);
    }
};
