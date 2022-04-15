<?php
use Kirby\Cms\App;
use Kirby\Cms\Page;
use Kirby\Cms\Pages;
use Kirby\Cms\Site;

/**
 * @var App   $kirby
 * @var Site  $site
 * @var Pages $pages
 * @var Page  $page
 */
?>

<!doctype html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport"
        content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>App</title>
  <style>
    body {
      font-family: sans-serif;
    }
  </style>
</head>
<body>

<header>
  <?php
  $userName = $kirby->user()->username();
  if ($kirby->user() && $kirby->user()->role() != 'public') {
    echo '<a href="/user-panel">administration </a>';
    echo "$userName <a href='/user-logout'>logout </a>";
  }
  else                echo "<a href='/user-login'>login</a>";
  ?>
</header>
