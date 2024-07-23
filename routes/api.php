<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ProjectController;
use App\Http\Controllers\Api\ServiceController;
use App\Http\Controllers\Api\CategoryController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\CommentController;
use App\Http\Controllers\Api\ResponseController;
use App\Http\Controllers\Api\FormulaireController;
use App\Http\Controllers\Api\NotificationController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum') -> group(function() {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    Route::post('/logout', [AuthController::class, 'logout']);
    Route::put('/user/update', [AuthController::class, 'updateUser']);
});

// utilisateur
Route::post('/sign', [AuthController::class, 'sign']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/users/photo', [AuthController::class, 'storePhoto']);
Route::get('/user/{id}', [AuthController::class, 'getUserById']);
Route::get('/users/{id}/photo', [AuthController::class, 'getPhotoByUserId']);

// service
Route::post('/services', [ServiceController::class, 'store']);
Route::post('/services/image', [ServiceController::class, 'storeImage']);
Route::put('/services/{id}', [ServiceController::class, 'update']);
Route::get('/services/category/{category}', [ServiceController::class, 'getServicesByCategory']);
Route::get('/services/user/{id}', [ServiceController::class, 'getServicesByUserId']);
Route::delete('/services/{id}', [ServiceController::class, 'destroy']);
Route::get('/services/{id}/userId', [ServiceController::class, 'getUserIdByServiceId']);

// projet
Route::post('/projects', [ProjectController::class, 'store']);
Route::post('/projects/image', [ProjectController::class, 'storeImage']);
Route::put('/projects/{id}', [ProjectController::class, 'update']);
Route::get('/projects/user/{id}', [ProjectController::class, 'getProjectsByUserId']);
Route::delete('/projects/{id}', [ProjectController::class, 'destroy']);
Route::get('/allprojects', [ProjectController::class, 'getAllProjects']);
Route::get('/projects/category/{category}', [ProjectController::class, 'getProjectsByCategory']);

// categorie
Route::apiResource('categories', CategoryController::class);

// commentaire
Route::post('/comments', [CommentController::class, 'store']);
Route::get('/comments/service/{serviceId}', [CommentController::class, 'getByServiceId']);
Route::get('/comments/user/{userId}', [CommentController::class, 'getByUserId']);
Route::delete('/comments/{id}', [CommentController::class, 'destroy']);
Route::put('/comments/{id}', [CommentController::class, 'update']);


// formulaire 
Route::get('/formulaires/enattente', [FormulaireController::class, 'getEnAttenteFormulaires']);
Route::get('/formulaires/{category_id}', [FormulaireController::class, 'getFormulaireByCategoryId']);
Route::post('/formulaires', [FormulaireController::class, 'store']);
Route::put('/formulaires/{id}', [FormulaireController::class, 'update']);
Route::delete('/formulaires/{id}', [FormulaireController::class, 'destroy']);
Route::get('/formulaires/service/{serviceId}', [FormulaireController::class, 'getByServiceId']);
Route::put('/formulaires/{id}/etat', [FormulaireController::class, 'updateEtat']);


// Reponse
Route::post('reponses', [ResponseController::class, 'store']);
Route::put('reponses/{reponse}', [ResponseController::class, 'update']);
Route::delete('reponses/{reponse}', [ResponseController::class, 'destroy']);
Route::get('/reponses/service/{serviceId}', [ResponseController::class, 'showByServiceId']);
Route::get('/reponses/category/{categoryId}', [ResponseController::class, 'showByCategoryId']);
Route::get('/reponses/user/{userId}', [ResponseController::class, 'showByUserId']);
Route::get('/reponses/{id}', [ResponseController::class, 'show']);
Route::get('/responses/attente', [ResponseController::class, 'getPendingResponses']);
Route::get('/allresponses', [ResponseController::class, 'getAllResponses']);
Route::get('/responses/enattente', [ResponseController::class, 'getEnAttenteResponses']);
Route::put('/responses/{id}/etat', [ResponseController::class, 'updateEtat']);

// Notifcation
Route::apiResource('/notifications', NotificationController::class);
Route::get('notifications/user/{userId}', [NotificationController::class, 'getNotificationsByUserId']);

