<?php

use Kirby\Cms\Page;

return [
    'debug'  => true,
    'routes' => [
        [
            'pattern' => 'create-user',
            'action'  => function () {
                return Page::factory([
                    'slug'      => 'create-user',
                    'template'  => 'create-user',
                ]);
            }
        ],
        [
            'pattern' => 'user-panel',
            'action'  => function () {
                return Page::factory([
                    'slug'      => 'user-panel',
                    'template'  => 'user-panel',
                ]);
            }
        ],
        [
            'pattern' => '(:any)',
            'action'  => function () {
                return false;
            }
        ],
    ]
];
