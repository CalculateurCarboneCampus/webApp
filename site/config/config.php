<?php

use Kirby\Cms\Page;

return [
    'debug'  => true,
    'routes' => [
        [
            'pattern' => 'user-create',
            'action'  => function () {
                return Page::factory([
                    'slug'      => 'user-create',
                    'template'  => 'user-create',
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
            'pattern' => 'user-login',
            'action'  => function () {
                return Page::factory([
                    'slug'      => 'user-login',
                    'template'  => 'user-login',
                ]);
            }
        ],
        [
            'pattern' => 'user-logout',
            'action'  => function () {
                return Page::factory([
                    'slug'      => 'user-logout',
                    'template'  => 'user-logout',
                ]);
            }
        ],
        [
            'pattern' => 'project',
            'action'  => function () {
                return Page::factory([
                    'slug'      => 'project',
                    'template'  => 'project',
                ]);
            }
        ],

        [
            'pattern' => 'connection',
            'action'  => function () {
                return Page::factory([
                    'slug'      => 'connection',
                    'template'  => 'connection',
                ]);
            }
        ],

        [
            'pattern' => '/',
            'action'  => function () {
                return Page::factory([
                    'slug'      => 'home',
                    'template'  => 'default',
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
