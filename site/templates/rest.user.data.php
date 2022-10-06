<?php

use Kirby\Cms\App;
use Kirby\Cms\Page;
use Kirby\Cms\Pages;
use Kirby\Cms\Site;

include_once './site/_global/UserData.php';

/**
 * @var App   $kirby
 * @var Site  $site
 * @var Pages $pages
 * @var Page  $page
 */


if( UserData::phpInputValidateToCreateInstanceOfUserData()->error ) {
  echo json_encode([
    'error' => UserData::phpInputValidateToCreateInstanceOfUserData()->error,
  ]);
} else {

  $userData = new UserData(
    $kirby,
    UserData::phpInputValidateToCreateInstanceOfUserData()->userId,
    UserData::phpInputValidateToCreateInstanceOfUserData()->userPassword,
  );

  echo json_encode([
    'userID'      => $userData->connectedUserID,
    'username'    => $userData->connectedUserName,
    'email'       => $userData->connectedUserEmail,
    'isConnected' => $userData->connectedUserIsLoggedIn,
    'projects'    => $userData->connectedUserProjects,

// todo: cookie session
//  'kirby_session' => array_key_exists('kirby_session', $_COOKIE) ? $_COOKIE['kirby_session'] : null,
//  'kirby_session2' => \Kirby\Http\Cookie::get('kirby_session'),
  ]);
}

