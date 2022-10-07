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

include_once './site/_global/UserData.php';

function createSlug(string $str, string $delimiter = '-'): string {

  $slug = strtolower(trim(preg_replace('/[\s-]+/', $delimiter, preg_replace('/[^A-Za-z0-9-]+/', $delimiter, preg_replace('/[&]/', 'and', preg_replace('/[\']/', '', iconv('UTF-8', 'ASCII//TRANSLIT', $str))))), $delimiter));
  return $slug;

}

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

  if( $userData->error ) {

    echo json_encode([
      'error'    => $userData->error,
    ]);

  } else {

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

    $inputJsonData = json_decode(file_get_contents('php://input'));

    if(property_exists($inputJsonData, 'projectName')) {

      $userPage = page($userData->connectedUserID);
      $slugPage = createSlug(get('projectName'));

      if($userPage == null) {
        $userPage = new Page([
          "slug" => $userData->connectedUserID,
          "isDraft" => false,
        ]);
      }

//      if( $userPage->find($slugPage) !== null ) {
//
//        echo json_encode([
//          'error' => 'un projet avec le même nom existe déjà',
//        ]);
//
//      } else {
//        $newPage = $userPage->createChild([
//          "slug" => $slugPage,
//          "isDraft" => false,
//          'template' => 'defaultProjectData',
//        ]);
//
//        $newPage = $newPage->changeStatus('unlisted');

        $newPage = $userPage->find($slugPage);

        if ($newPage == null) {
          $newPage = $userPage->createChild([
            "slug" => $slugPage,
            "isDraft" => false,
            'template' => 'defaultProjectData',
          ]);

          $newPage = $newPage->changeStatus('unlisted');
        }

        $data = [
          'userID' => $kirby->user()->id(),
          'status' => 'draft',
          'content' => json_encode(get('value')),
        ];

        $newPage = $newPage->save($data, null, true);

        echo json_encode([
          'error' => null,
          'success' => true,
        ]);
//      }
    } else {
      echo json_encode([
        'error' => 'no \'projectName\' parameter',
      ]);
    }
  }
}

