<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
Route::post('register', 'App\Http\Controllers\Auth\RegisterController@register');

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

Route::middleware('auth:sanctum')->get('/usr', function (Request $request) {
    return $request->usr();
});
