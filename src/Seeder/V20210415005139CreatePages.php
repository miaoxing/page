<?php

namespace Miaoxing\Page\Seeder;

use Faker\Factory;
use Miaoxing\Page\Service\PageModel;
use Miaoxing\Plugin\Seeder\BaseSeeder;

class V20210415005139CreatePages extends BaseSeeder
{
    /**
     * {@inheritdoc}
     */
    public function run()
    {
        $faker = Factory::create('zh_CN');

        $page = PageModel::findByOrCreate(['type' => PageModel::TYPE_INDEX], [
            'name' => '首页',
        ]);
        if ($page->wasRecentlyCreated()) {
            $this->updateComponents($page, $faker);
        }

        for ($i = 0; $i <= 10; ++$i) {
            $page = PageModel::save([
                'name' => $faker->words(3, true),
                'type' => PageModel::TYPE_STANDALONE,
            ]);
            $this->updateComponents($page, $faker);
        }
    }

    protected function updateComponents($page, $faker)
    {
        $page->components()->saveRelation([
            [
                'type' => 'page',
                'props' => [
                    'name' => $page->name,
                    'title' => $faker->words(3, true),
                    'shareTitle' => $faker->words(3, true),
                    'navStyle' => [
                        'color' => $faker->randomElement(['black', 'white']),
                        'backgroundColor' => $faker->safeHexColor,
                    ],
                ],
            ],
            [
                'type' => 'richText',
                'props' => [
                    'content' => $faker->paragraph,
                ],
            ],
            [
                'type' => 'richText',
                'props' => [
                    'content' => $faker->paragraph,
                ],
            ],
            [
                'type' => 'richText',
                'props' => [
                    'content' => $faker->paragraph,
                ],
            ],
        ]);
    }
}
