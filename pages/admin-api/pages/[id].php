<?php

use Miaoxing\Page\Service\PageModel;
use Miaoxing\Plugin\BaseController;
use Miaoxing\Services\Page\ItemTrait;
use Miaoxing\Services\Service\UpdateAction;
use Wei\V;

return new /**
 * @mixin \ObjectReqMixin
 */
class () extends BaseController {
    use ItemTrait;

    protected $include = [
        'components',
    ];

    public function patch()
    {
        return UpdateAction
            ::setReq($this->objectReq)
            ->beforeSave(function (PageModel $page, $req) {
                $v = V::defaultOptional();
                $v->tinyChar('name', '名称')->required($page->isNew())->notBlank();
                $v->array('components', '组件')->required($page->isNew())->each(function (V $v) {
                    $v->string('type', '类型');
                    $v->object('props', '属性');
                });
                return $v->check($req);
            })
            ->afterSave(function (PageModel $page, $req) {
                if ($req['components']) {
                    $page->components()->saveRelation($req['components']);
                }

                // 返回值包含所有页面组件，以便前端更新组件编号
                $page->components;
            })
            ->exec($this);
    }
};
