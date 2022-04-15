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
?>

<?php snippet('header') ?>

<?php
$projectTitle = get('i');

echo "<h1>$projectTitle</h1>";
?>

<div>

</div>

<div>
  share with
  <form>
    <?php
    $users = $kirby->users();
    foreach ($users as $user) {
      $userName = $user->username();
      echo "<div>";
        echo"<input type='checkbox' >";
        echo"<label >$userName</label>";
      echo "</div>";
    }

    ?>
  </form>
</div>

<?php snippet('footer') ?>

