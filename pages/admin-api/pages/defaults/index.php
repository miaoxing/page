<?php

use Miaoxing\Page\Service\PageModel;
use Miaoxing\Plugin\BaseController;

return new class () extends BaseController {
    public function get()
    {
        return PageModel::toRet();
    }
};
