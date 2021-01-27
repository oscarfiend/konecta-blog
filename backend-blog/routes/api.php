<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });


// estas rutas se pueden acceder sin proveer de un token válido.
//rutas publicas

Route::post('/login', 'AuthController@login');
Route::post('/register', 'AuthController@register');

// estas rutas requiren de un token válido para poder accederse.
//rutas privadas
Route::group(['middleware' => 'auth.jwt'], function () {
    Route::post('/logout', 'AuthController@logout');
    Route::post('/auth', 'AuthController@getAuthUser');

    //rutas para las categorias
    Route::get('categories/{category}', 'CategoryController@show');
    Route::put('categories/{category}', 'CategoryController@update');
    Route::delete('categories/{category}', 'CategoryController@destroy');
    Route::apiResource('categories','CategoryController');

    //rutas para articulos
    Route::get('articles/{article}', 'ArticleController@show');
    Route::put('articles/{article}', 'ArticleController@update');
    Route::delete('articles/{article}', 'ArticleController@destroy');
    Route::apiResource('articles','ArticleController');

    //rutas para usuarios
    Route::get('users/{user}', 'UserController@show');
    Route::put('users/{user}', 'UserController@update');
    Route::delete('users/{user}', 'UserController@destroy');
    Route::apiResource('users','UserController');

    //rutas para los likes
    Route::get('likes/{article}','LikesController@show');
    Route::apiResource('likes','LikesController');

    //ruta para las imagenes
    Route::post('storage/save', 'StorageController@save');
});






