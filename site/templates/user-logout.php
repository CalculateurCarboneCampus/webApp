<?php

use Kirby\Cms\App;
use Kirby\Cms\Page;
use Kirby\Cms\Pages;
use Kirby\Cms\Site;

/**
 * @var App $kirby
 * @var Site $site
 * @var Pages $pages
 * @var Page $page
 */

if( $kirby->user() ) $kirby->user()->logout();

go('user-login');
