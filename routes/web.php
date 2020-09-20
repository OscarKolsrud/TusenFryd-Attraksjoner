<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
| Middleware options can be located in `app/Http/Kernel.php`
|
*/

// Homepage Route
Route::group(['middleware' => ['web', 'checkblocked']], function () {
    Route::get('/', 'WelcomeController@welcome')->name('welcome');
    Route::get('/terms', 'TermsController@terms')->name('terms');

    Route::prefix('integrationView')->group(function () {
        Route::prefix('v1')->group(function () {
            Route::get('/iframe', 'AttractionController@publicListv1')->name('publicListv1');
            Route::get('/driftsmelding/{attraction}', 'AttractionController@driftsmeldingv1')->name('driftsmeldingv1');
        });
    });

});

// Authentication Routes
Auth::routes(['register' => false]);

// Public Routes
Route::group(['middleware' => ['web', 'checkblocked']], function () {

    // Activation Routes
    Route::get('/activate', ['as' => 'activate', 'uses' => 'Auth\ActivateController@initial']);

    Route::get('/activate/{token}', ['as' => 'authenticated.activate', 'uses' => 'Auth\ActivateController@activate']);
    Route::get('/activation', ['as' => 'authenticated.activation-resend', 'uses' => 'Auth\ActivateController@resend']);
    Route::get('/exceeded', ['as' => 'exceeded', 'uses' => 'Auth\ActivateController@exceeded']);

    // Socialite Register Routes
    Route::get('/social/redirect/{provider}', ['as' => 'social.redirect', 'uses' => 'Auth\SocialController@getSocialRedirect']);
    Route::get('/social/handle/{provider}', ['as' => 'social.handle', 'uses' => 'Auth\SocialController@getSocialHandle']);

    // Route to for user to reactivate their user deleted account.
    Route::get('/re-activate/{token}', ['as' => 'user.reactivate', 'uses' => 'RestoreUserController@userReActivate']);
});

// Registered and Activated User Routes
Route::group(['middleware' => ['auth', 'activated', 'checkblocked']], function () {

    // Activation Routes
    Route::get('/activation-required', ['uses' => 'Auth\ActivateController@activationRequired'])->name('activation-required');
    Route::get('/logout', ['uses' => 'Auth\LoginController@logout'])->name('logout');
});

// Registered and Activated User Routes
Route::group(['middleware' => ['auth', 'activated', 'twostep', 'checkblocked']], function () {

    //  Homepage Route - Redirect based on user role is in controller.
    Route::get('/home', 'AttractionController@list')->name('listAttraction-HomeVariant');

    // Show users profile - viewable by other users.
    Route::get('profile/{username}', [
        'as'   => '{username}',
        'uses' => 'ProfilesController@show',
    ]);
});

// Registered, activated, and is current user routes.
Route::group(['middleware' => ['auth', 'activated', 'currentUser', 'twostep', 'checkblocked']], function () {

    // User Profile and Account Routes
    Route::resource(
        'profile',
        'ProfilesController',
        [
            'only' => [
                'show',
                'edit',
                'update',
                'create',
            ],
        ]
    );
    Route::put('profile/{username}/updateUserAccount', [
        'as'   => '{username}',
        'uses' => 'ProfilesController@updateUserAccount',
    ]);
    Route::put('profile/{username}/updateUserPassword', [
        'as'   => '{username}',
        'uses' => 'ProfilesController@updateUserPassword',
    ]);
    Route::delete('profile/{username}/deleteUserAccount', [
        'as'   => '{username}',
        'uses' => 'ProfilesController@deleteUserAccount',
    ]);

    // Route to show user avatar
    Route::get('images/profile/{id}/avatar/{image}', [
        'uses' => 'ProfilesController@userProfileAvatar',
    ]);

    // Route to upload user avatar.
    Route::post('avatar/upload', ['as' => 'avatar.upload', 'uses' => 'ProfilesController@upload']);
});

// Registered, activated, and is admin routes.
Route::group(['middleware' => ['auth', 'activated', 'role:admin', 'twostep', 'checkblocked']], function () {
    Route::prefix('manage')->group(function () {

        //Routes for Attraction management
        Route::prefix('attraction')->group(function () {
            Route::get('/list', 'AttractionController@list')->name('listAttraction');

            //Create new
            Route::get('/new', 'AttractionController@addView')->name('addAttraction-view');
            Route::post('/new', 'AttractionController@add')->name('addAttraction-post');

            //Edit
            Route::get('/{slug}/edit', 'AttractionController@editView')->name('editAttraction-view');
            Route::put('/{slug}/edit', 'AttractionController@edit')->name('editAttraction-put');
            Route::put('/{slug}/opening', 'AttractionController@opening')->name('openingAttraction-put');
        });

        //Routes for service messages
        Route::prefix('servicemessage')->group(function () {
            //List servicemessages for the specific attraction
            Route::get('{attraction}/list', 'ServiceMessageController@listView')->name('listServiceSpecific');

            //Create new
            Route::get('{attraction}/new', 'ServiceMessageController@addView')->name('serviceMsgView');
            Route::post('{attraction}/new', 'ServiceMessageController@add')->name('serviceMsg-post');

            //Edit
            Route::get('/{messageid}/edit', 'ServiceMessageController@editView')->name('serviceMsg-view');
            Route::put('/{messageid}/edit', 'ServiceMessageController@edit')->name('serviceMsg-put');
        });
    });



    Route::resource('/users/deleted', 'SoftDeletesController', [
        'only' => [
            'index', 'show', 'update', 'destroy',
        ],
    ]);

    Route::resource('users', 'UsersManagementController', [
        'names' => [
            'index'   => 'users',
            'destroy' => 'user.destroy',
        ],
        'except' => [
            'deleted',
        ],
    ]);
    Route::post('search-users', 'UsersManagementController@search')->name('search-users');

    Route::resource('themes', 'ThemesManagementController', [
        'names' => [
            'index'   => 'themes',
            'destroy' => 'themes.destroy',
        ],
    ]);

    Route::get('logs', '\Rap2hpoutre\LaravelLogViewer\LogViewerController@index');
    Route::get('routes', 'AdminDetailsController@listRoutes');
    Route::get('active-users', 'AdminDetailsController@activeUsers');
});

Route::redirect('/php', '/phpinfo', 301);
