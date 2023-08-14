<?php

use Miaoxing\Plugin\BasePage;
use Miaoxing\Services\Page\CollTrait;
use Miaoxing\Services\Page\PostToPatchTrait;

return new class () extends BasePage {
    use CollTrait;
    use PostToPatchTrait {
        PostToPatchTrait::post insteadof CollTrait;
    }
};
