<?php

use Kirby\Cms\App;
use Kirby\Cms\Page;
use Kirby\Cms\Pages;
use Kirby\Cms\Site;
use Kirby\Cms\User;

/**
 * @var App   $kirby
 * @var Site  $site
 * @var Pages $pages
 * @var Page  $page
 */

echo json_encode(
  $pages->filter(function ($field) {
    return $field->num() > 0;
  })->map(function ($value) {
    return [
      'entityName'      => $value->title()->value(),
      'description'     => $value->text()->value(),
      'entitySections'  => $value->item()->toStructure()->toArray(),
    ];
  })
);
