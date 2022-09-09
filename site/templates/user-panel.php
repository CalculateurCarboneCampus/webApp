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

function createSlug(string $str, string $delimiter = '-'): string {

  $slug = strtolower(trim(preg_replace('/[\s-]+/', $delimiter, preg_replace('/[^A-Za-z0-9-]+/', $delimiter, preg_replace('/[&]/', 'and', preg_replace('/[\']/', '', iconv('UTF-8', 'ASCII//TRANSLIT', $str))))), $delimiter));
  return $slug;

}

if(! $kirby->user() ) go('user-create');

$user     = $kirby->user();
$userName = $kirby->user()->name();

$projects =
  array_filter(
    $kirby->site()->pages()->toArray(),
    function ($page) use ($kirby) {
      try {
        return $page['content']['userid'] == $kirby->user()->id();
      } catch (Exception $e) {
        return false;
      }
    });


$newPage = null;

if(get('newProjectName')) {

  $userPage = page($user->id());
  $slugPage = createSlug(get('newProjectName'));

  if($userPage == null) {
    $userPage = new Page([
      "slug" => $user->id(),
      "isDraft" => false,
    ]);
  }

  if( $userPage->find($slugPage) !== null ) {
    echo 'un projet avec le même nom existe déjà';
    exit;
  }

  $newPage = $userPage->createChild([
    "slug" => $slugPage,
    "isDraft" => false,
    'template' => 'defaultProjectData',
  ]);

  $newPage = $newPage->changeStatus('unlisted');

  $data = [
    'userID' => $kirby->user()->id(),
    'status' => 'draft',
    'content' => json_encode([
      'data' => 'value',
    ]),
  ];

  $newPage = $newPage->save($data, null, false);

}
?>

<?php snippet('header') ?>

<h1>Mon éspace</h1>

<h2>Projets - <?= $userName ?></h2>

<div>
  <ul>
    <?php
    foreach ($projects as $project) {
      $projectId = $project['id'];
      $projectStatus = $project['content']['status'];
      $projectUrl = $project['slug'];

      echo "<li>$projectId, status: $projectStatus, <a href='project?i=$projectUrl' >edit</a></li>";
    }
    ?>
  </ul>
</div>

<form>
  <input type="submit" value="ajouter un projet">

  <label>
    nom du nouveau projet
    <input type="text" name="newProjectName">
  </label>

  <?php
  if($newPage) {
//    $slug = $newPage->slug();
//    go("project?i=$slug");
  }
  ?>

</form>

<?php snippet('footer') ?>
