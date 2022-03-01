<?php

return [
    'debug'  => true,
    'routes' => [
        [
            'pattern' => '/home',
            'action'  => function () {
                return page('home');
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
