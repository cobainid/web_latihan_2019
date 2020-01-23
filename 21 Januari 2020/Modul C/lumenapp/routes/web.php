<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

// $router->get('/', function () use ($router) {
//     return $router->app->version();
// });


$router->group(["prefix" => "event"],function() use($router){
	$router->get('/join','EventUserController@join');
	$router->post('/join/{id}','EventUserController@storeJoin');
	$router->get('/member/{id}','EventUserController@member');


	$router->get('/','EventController@index');
	$router->post('/','EventController@store');
	$router->put('/{id}','EventController@update');
	$router->get('/{id}','EventController@show');
	$router->delete('/{id}','EventController@destroy');

});

$router->post('/register','AuthController@register');
$router->post('/login','AuthController@login');
