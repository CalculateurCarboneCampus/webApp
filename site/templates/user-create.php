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

$userPublic  = $kirby->user('azertypow+headcc_public@gmail.com');

$userPublic->login('publicKey');

/**
 * @param mixed $newUserName
 * @param mixed $newUserMail
 * @param mixed $newUserPassword
 * @return null[]|User[]|Exception[]
 */
function createUser(mixed $newUserName, mixed $newUserMail, mixed $newUserPassword) {

  if(! $newUserName)      return ['error' => new Exception("le nom d'utilisateur est vide")];
  if(! $newUserMail)      return ['error' => new Exception("le nom mail est vide")];
  if(! $newUserPassword)  return ['error' => new Exception("le nom mot de passe est vide")];

  try {
    return [
      'error' => null,
      'user'  =>     User::create([
        'name'      => $newUserName,
        'email'     => $newUserMail,
        'password'  => $newUserPassword,

        'role'      => 'editor',
        'language'  => 'fr',
      ])
    ];
  } catch(Exception $createUserError) {
    return [
      'error' => $createUserError,
    ];
  }
}

$newUser = createUser(get('newUserName'), get('newUserMail'), get('newUserPassword'));

if(! $newUser['error']) {
  $newUser['user']->login( get('newUserPassword') );
  go('user-panel');
}

?>

<?php snippet('header') ?>

<h1>Creer un compte</h1>

<?php if( $newUser['error'] ): ?>
  <p>Erreur lors de la création de l'utilisateur: </p>
  <p><strong><?= $newUser['error']->getMessage() ?></strong></p>
<?php endif ?>

<form>
  <label>
    nom d'utilisateur
    <input name="newUserName"     type="text">
  </label>

  <label>
    adresse mail
    <input name="newUserMail"     type="email" >
  </label>

  <label>
    mot de pass
    <input name="newUserPassword" type="password">
  </label>

  <input type="submit" >
</form>

<h2>Déja un compte?</h2>
<p><a href="user-login" >se connecter -></a></p>


<?php snippet('footer') ?>
