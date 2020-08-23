<?php

return [

    // Titles
    'showing-all-users'     => 'Viser Alle Brukere',
    'users-menu-alt'        => 'Vis Bruker Administrasjon Meny',
    'create-new-user'       => 'Opprett Ny Bruker',
    'show-deleted-users'    => 'Vis Slettet Bruker',
    'editing-user'          => 'Redigerer Bruker :name',
    'showing-user'          => 'Viser Bruker :name',
    'showing-user-title'    => ':name\'s Informasjon',

    // Flash Messages
    'createSuccess'   => 'Opprettet bruker!',
    'updateSuccess'   => 'Oppdaterte bruker! ',
    'deleteSuccess'   => 'Slettet bruker! ',
    'deleteSelfError' => 'Du kan ikke slette deg selv! ',

    // Show User Tab
    'viewProfile'            => 'Vis Profil',
    'editUser'               => 'Rediger Bruker',
    'deleteUser'             => 'Slett Bruker',
    'usersBackBtn'           => 'Tilbake til Brukere',
    'usersPanelTitle'        => 'Bruker Informasjon',
    'labelUserName'          => 'Brukernavn:',
    'labelEmail'             => 'E-Post:',
    'labelFirstName'         => 'Fornavn:',
    'labelLastName'          => 'Etternavn:',
    'labelRole'              => 'Rolle:',
    'labelStatus'            => 'Status:',
    'labelAccessLevel'       => 'Tilgang',
    'labelPermissions'       => 'Tillatelser:',
    'labelCreatedAt'         => 'Opprettet:',
    'labelUpdatedAt'         => 'Oppdatert:',
    'labelIpEmail'           => 'E-Post Registrerings IP:',
    'labelIpConfirm'         => 'Bekreftelse IP:',
    'labelIpSocial'          => 'Socialite Registrerings IP:',
    'labelIpAdmin'           => 'Admin Registrerings IP:',
    'labelIpUpdate'          => 'Siste Oppdaterte IP:',
    'labelDeletedAt'         => 'Slettet',
    'labelIpDeleted'         => 'Slettet fra IP:',
    'usersDeletedPanelTitle' => 'Slettet Bruker Informasjon',
    'usersBackDelBtn'        => 'Tilbake til Slettede Brukere',

    'successRestore'    => 'Brukeren ble gjenopprettet.',
    'successDestroy'    => 'Brukeren ble permanenet slettet.',
    'errorUserNotFound' => 'Bruker ikke funnet.',

    'labelUserLevel'  => 'Nivå',
    'labelUserLevels' => 'Nivåer',

    'users-table' => [
        'caption'   => '{1} :userscount bruker total|[2,*] :userscount totale brukere',
        'id'        => 'ID',
        'name'      => 'Brukernavn',
        'fname'     => 'Fornavn',
        'lname'     => 'Etternavn',
        'email'     => 'E-Post',
        'role'      => 'Rolle',
        'created'   => 'Opprettet',
        'updated'   => 'Oppdatert',
        'actions'   => 'Handlinger',
    ],

    'buttons' => [
        'create-new'    => 'New User',
        'delete'        => '<i class="fa fa-trash-o fa-fw" aria-hidden="true"></i>  <span class="hidden-xs hidden-sm">Slett</span><span class="hidden-xs hidden-sm hidden-md"> Bruker</span>',
        'show'          => '<i class="fa fa-eye fa-fw" aria-hidden="true"></i> <span class="hidden-xs hidden-sm">Vis</span><span class="hidden-xs hidden-sm hidden-md"> Bruker</span>',
        'edit'          => '<i class="fa fa-pencil fa-fw" aria-hidden="true"></i> <span class="hidden-xs hidden-sm">Rediger</span><span class="hidden-xs hidden-sm hidden-md"> Bruker</span>',
        'back-to-users' => '<span class="hidden-sm hidden-xs">Tilbake til </span><span class="hidden-xs">Brukere</span>',
        'back-to-user'  => 'Tilbake  <span class="hidden-xs">til Bruker</span>',
        'delete-user'   => '<i class="fa fa-trash-o fa-fw" aria-hidden="true"></i>  <span class="hidden-xs">Slett</span><span class="hidden-xs"> Bruker</span>',
        'edit-user'     => '<i class="fa fa-pencil fa-fw" aria-hidden="true"></i> <span class="hidden-xs">Rediger</span><span class="hidden-xs"> Bruker</span>',
    ],

    'tooltips' => [
        'delete'        => 'Slett',
        'show'          => 'Vis',
        'edit'          => 'Rediger',
        'create-new'    => 'Opprett Ny Bruker',
        'back-users'    => 'Tilbake til brukere',
        'email-user'    => 'E-Post :user',
        'submit-search' => 'Gjennomfør brukersøk',
        'clear-search'  => 'Tøm Søkeresultater',
    ],

    'messages' => [
        'userNameTaken'          => 'Brukernavn er tatt',
        'userNameRequired'       => 'Brukernavn kreves',
        'fNameRequired'          => 'Fornavn kreves',
        'lNameRequired'          => 'Etternavn kreves',
        'emailRequired'          => 'E-Post kreves',
        'emailInvalid'           => 'E-Post er ugyldig',
        'passwordRequired'       => 'Passord kreves',
        'PasswordMin'            => 'Passordet må ha minimum 6 tegn',
        'PasswordMax'            => 'Passordet kan maksimalt ha 20 tegn',
        'captchaRequire'         => 'Captcha kreves',
        'CaptchaWrong'           => 'Captcha er feil, prøv igjen',
        'roleRequired'           => 'Bruker rolle kreves',
        'user-creation-success'  => 'Opprettet bruker!',
        'update-user-success'    => 'Oppdaterte bruker!',
        'delete-success'         => 'Slettet bruker!',
        'cannot-delete-yourself' => 'Du kan ikke slette deg selv!',
    ],

    'show-user' => [
        'id'                => 'Bruker ID',
        'name'              => 'Brukernavn',
        'email'             => '<span class="hidden-xs">Bruker </span>E-Post',
        'role'              => 'Bruker Rolle',
        'created'           => 'Opprettet',
        'updated'           => 'Oppdatert',
        'labelRole'         => 'Bruker Rolle',
        'labelAccessLevel'  => '<span class="hidden-xs">Bruker</span> Tilgangsnivå|<span class="hidden-xs">Bruker</span> Tilgangsnivåer',
    ],

    'search'  => [
        'title'             => 'Viser Søkeresultater',
        'found-footer'      => ' Resultat(er) funnet',
        'no-results'        => 'Ingen Resultater',
        'search-users-ph'   => 'Søk i Brukere',
    ],

    'modals' => [
        'delete_user_message' => 'Er du sikker på at du vil slette :user?',
    ],
];
