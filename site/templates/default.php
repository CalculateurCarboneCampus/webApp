<?php

/**
 * @var \Kirby\Cms\Page $page
 */


echo json_encode([
  'page' => $page->title(),
]);

