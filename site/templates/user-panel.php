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

$user     = $kirby->user();
$userName = $kirby->user()->name();

//echo '<pre>';
//print_r($user);
//echo '</pre>';

if(get('newProjectName')) {
  $newPage = new Page([
    "slug" => get('newProjectName'),
  ]);

  $newPage->save();

}

echo '<h2>Projets</h2>';

echo "<p>Bonjour $userName</p>";

?>

<form>
  <input type="submit" value="ajouter un projet">

  <label>
    nom du nouveau projet
    <input type="text" name="newProjectName">
  </label>
</form>
