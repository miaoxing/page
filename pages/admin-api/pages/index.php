<?php

use Miaoxing\Plugin\BaseController;
use Miaoxing\Services\Page\CollTrait;
use Miaoxing\Services\Page\PostToPatchTrait;

return new class extends BaseController {
    use CollTrait;
    use PostToPatchTrait {
        PostToPatchTrait::post insteadof CollTrait;
    }
};
