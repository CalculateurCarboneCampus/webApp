<?php

class UserData {

    public ?Kirby\Cms\User  $connectedUser              = null;
    public bool             $connectedUserIsLoggedIn    = false;
    public ?string          $error                      = null;
    public ?string          $connectedUserID            = null;
    public ?string          $connectedUserName          = null;
    public ?string          $connectedUserEmail         = null;
    public ?array           $connectedUserProjects      = null;

    public function __construct(
        Kirby\Cms\App $kirby,
        string $userId,
        string $userPassword
    )
    {
        if($kirby->user($userId)) {
            try {
                $kirby->user($userId)->login($userPassword);
                $this->connectedUser            = $kirby->user($userId);
                $this->connectedUserIsLoggedIn  = $kirby->user($userId)->isLoggedIn();
                $this->connectedUserID          = $this->connectedUser->id();
                $this->connectedUserName        = $this->connectedUser->username();
                $this->connectedUserEmail       = $this->connectedUser->email();
                $this->connectedUserProjects    = $kirby->site()->pages()->filter('id',$this->connectedUserID)->children()->toArray();
            } catch (Exception $exception) {
                $this->error = $exception->getMessage();
            }
        } else {
            $this->error = "$userId User ID does\'t exist";
        }

        return $this;
    }

    public static function phpInputValidateToCreateInstanceOfUserData(): StdClass
    {
        $response =  new StdClass;
        $response->error        = null;
        $response->userId       = null;
        $response->userPassword = null;

        $inputPostData = file_get_contents('php://input');
        if( ! $inputPostData ) {
            $response->error = 'no php://input';
            return $response;
        }

        $inputJsonData = json_decode($inputPostData);
        if( $inputJsonData == null) {
            $response->error = 'can\'t decode json data';
            return $response;
        }

        if( ! property_exists($inputJsonData, 'userId') ) {
            $response->error = 'An \'userId\' property is necessary to connect new user';
            return $response;
        }

        if( ! property_exists($inputJsonData, 'userPassword') ) {
            $response->error = 'An \'userPassword\' property is necessary to connect new user';
            return $response;
        }

        $response->userId = $inputJsonData->userId;
        $response->userPassword = $inputJsonData->userPassword;

        return $response;
    }

}
