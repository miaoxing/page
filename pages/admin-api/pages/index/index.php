<?php

use Miaoxing\Page\Service\PageModel;
use Miaoxing\Plugin\BaseController;
use Wei\Ret;

return new class extends BaseController {
    public function put(): Ret
    {
        $page = PageModel::findOrFail(req('id'));

        $indexPage = PageModel::findBy('type', PageModel::TYPE_INDEX);
        if ($indexPage) {
            $indexPage->save(['type' => PageModel::TYPE_STANDALONE]);
        }

        $page->save(['type' => PageModel::TYPE_INDEX]);

        return suc();
    }
};
