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

/** @var string[] $connectionError */
$connectionError = [];

if(! get('userPassword') )          array_push($connectionError, 'vous devez rentrer un mot de passe');
if(! get('userName') )              array_push($connectionError, 'vous devez rentrer un nom');
if(! $kirby->user(get('userName'))) array_push($connectionError, "aucun compte avec cette adresse mail");

function hasNoError(array $connectionError): bool{ return count($connectionError) == 0;}
$user       = hasNoError($connectionError) ? $kirby->user(get('userName')) : null;
$password   = get('userPassword');

if( hasNoError($connectionError) ) {
  try {
    if( !$user->login($password) ) array_push($connectionError, 'mot de passe incorrect');

    echo $user;

  } catch (\Kirby\Exception\InvalidArgumentException | \Kirby\Exception\NotFoundException $e) {
    array_push( $connectionError, $e->getMessage());
  }
}

?>

<?php snippet('header') ?>

<section>
  <h1>Connection</h1>
  <?php if ( ! hasNoError($connectionError) ) : ?>
  <h3>error</h3>
  <ul>
    <?php
    foreach ($connectionError as $message) echo "<li>$message</li>"
    ?>
  </ul>
  <?php endif; ?>
  <form>
    <label>
      nom d'utilisateur
      <input name="userName"     type="text">
    </label>

    <label>
      mot de pass
      <input name="userPassword" type="password">
    </label>

    <input type="submit" >
  </form>
</section>

<section>
  <h2>Nouveau</h2>
  <p>Pas encore de parmis nous? <a href="/user-create">Créez votre compte -></a></p>
</section>

<section>
  <h2>Liste des comptes</h2>
  <?php
  foreach ($kirby->users()->pluck('email') as $userName) {
    echo "<li>$userName</li>";
  }
  ?>
</section>


<?php snippet('footer') ?>
