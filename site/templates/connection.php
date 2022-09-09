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


$json = file_get_contents('php://input');

//$testValue = json_decode($json);

//$kirby->user('azertypow+headcc@gmail.com')->login('motdepass');

$connectedUserEmail = $kirby->user() ? $kirby->user()->email() : null;

echo json_encode([
  'user' => $connectedUserEmail,
//  'testValue' => $testValue->test,
]);


?>

<!--<script>-->
<!--  var myHeaders = new Headers();-->
<!--  myHeaders.append("Content-Type", "application/json");-->
<!--  myHeaders.append("Cookie", "kirby_session=4bc8405f8bdb226f9019ac04c051754061b6e09e%2B1662572691.b2f07a2d2f8f10b6cbe7.5d99246a33e12d7df9ca0c1ffcd15a59f8725a81e8711f687c47300e7ff588ec");-->
<!---->
<!--  var raw = JSON.stringify({-->
<!--    "test": "coucou"-->
<!--  });-->
<!---->
<!--  var requestOptions = {-->
<!--    method: 'GET',-->
<!--    headers: myHeaders,-->
<!--    // body: raw,-->
<!--    redirect: 'follow'-->
<!--  };-->
<!---->
<!--  fetch("http://localhost:8000/connection", requestOptions)-->
<!--    .then(response => response.text())-->
<!--    .then(result => console.log(result))-->
<!--    .catch(error => console.log('error', error));-->
<!--</script>-->
