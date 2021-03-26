<?php

/**
 * @property    Miaoxing\Page\Service\PageComponentModel $pageComponentModel
 * @method      Miaoxing\Page\Service\PageComponentModel pageComponentModel() 返回当前对象
 */
class PageComponentModelMixin {
}

/**
 * @property    Miaoxing\Page\Service\PageModel $pageModel
 * @method      Miaoxing\Page\Service\PageModel pageModel() 返回当前对象
 */
class PageModelMixin {
}

/**
 * @mixin PageComponentModelMixin
 * @mixin PageModelMixin
 */
class AutoCompletion {
}

/**
 * @return AutoCompletion
 */
function wei()
{
    return new AutoCompletion;
}

/** @var Miaoxing\Page\Service\PageComponentModel $pageComponent */
$pageComponent = wei()->pageComponentModel;

/** @var Miaoxing\Page\Service\PageComponentModel|Miaoxing\Page\Service\PageComponentModel[] $pageComponents */
$pageComponents = wei()->pageComponentModel();

/** @var Miaoxing\Page\Service\PageModel $page */
$page = wei()->pageModel;

/** @var Miaoxing\Page\Service\PageModel|Miaoxing\Page\Service\PageModel[] $pages */
$pages = wei()->pageModel();
