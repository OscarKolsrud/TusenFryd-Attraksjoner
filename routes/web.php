<?php

use App\Http\Controllers\AttractionController;
use App\Http\Controllers\ServiceMessageController;
use App\Http\Controllers\UserMgmtController;
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
*/

//This route only redirects the base url to the logged in page or asks for login
Route::redirect('/', '/dashboard');

//Public routes used for the iframe
Route::prefix('/integrationView')->group(function () {
    //Version 1 design routes
    Route::prefix('/v1')->group(function () {
        Route::get('/iframe', [AttractionController::class, 'publicListv1'])->name('publicListv1');
        Route::get('/driftsmelding/{attraction}', [AttractionController::class, 'driftsmeldingv1'])->name('driftsmeldingv1');
    });
});

//Authenticated routes
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', [AttractionController::class, 'dashboard'])->name('dashboard');

    Route::prefix('/attraction')->group(function () {
        //Attraction creation routes
        Route::get('/new', [AttractionController::class, 'addView'])->middleware(['permission:add attraction'])->name('addAttraction.get');
        Route::post('/new', [AttractionController::class, 'add'])->middleware(['permission:add attraction'])->name('addAttraction.post');

        //Attraction view and manage routes
        Route::get('/{slug}', [AttractionController::class, 'editView'])->name('editAttraction.get');
        Route::put('/{slug}', [AttractionController::class, 'edit'])->name('editAttraction.put');
        Route::delete('/{slug}', [AttractionController::class, 'delete'])->middleware(['permission:delete attraction'])->name('editAttraction.delete');
        Route::put('/{slug}/opening', [AttractionController::class, 'opening'])->name('editAttraction.open.put');

        //List servicemessages for specific attraction
        Route::get('{attraction}/servicemessage', [ServiceMessageController::class, 'listView'])->name('serviceMessage.list.get');

        //Create new servicemessage
        Route::get('/{attraction}/servicemessage/new', [ServiceMessageController::class, 'addView'])->name('serviceMessage.add.get');
        Route::post('/{attraction}/servicemessage/new', [ServiceMessageController::class, 'add'])->name('serviceMessage.add.post');

        //Edit servicemessage
        Route::get('/{attraction}/servicemessage/{servicemessage}', [ServiceMessageController::class, 'editView'])->name('serviceMessage.edit.get');
        Route::put('/{attraction}/servicemessage/{servicemessage}', [ServiceMessageController::class, 'edit'])->name('serviceMessage.edit.put');

        //Delete servicemessage
        Route::delete('/{attraction}/servicemessage/{servicemessage}', [ServiceMessageController::class, 'delete'])->name('serviceMessage.edit.delete');
    });

    //User management routes
    Route::prefix('/user')->middleware(['role:super-admin'])->group(function () {
        //List user table
        Route::get('/', [UserMgmtController::class, 'listPage'])->name('userMgmt.get');

        //Add new user routes
        Route::get('/add', [UserMgmtController::class, 'createPage'])->name('userMgmt.user.get');
        Route::post('/add', [UserMgmtController::class, 'create'])->name('userMgmt.user.post');

        //Edit user routes
        Route::get('/e/{userid}', [UserMgmtController::class, 'editPage'])->name('userMgmt.edit.get');
        Route::put('/e/{userid}', [UserMgmtController::class, 'edit'])->name('userMgmt.edit.put');
        Route::delete('/e/{userid}', [UserMgmtController::class, 'delete'])->name('userMgmt.edit.delete');
    });
});
