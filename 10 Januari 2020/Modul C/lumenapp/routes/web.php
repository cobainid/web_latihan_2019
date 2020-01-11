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


$router->group(['prefix' => 'event'],function() use($router) {
	$router->get('/join',['uses'=>'EventController@join','as' => 'event.join']);
	$router->post('/join/{id}',['uses'=>'EventController@storeJoin','as' => 'event.storeJoin']);
	
	$router->put('/update/{id}',['uses'=>'EventController@update','as' => 'event.update']);
	$router->delete('/delete/{id}',['uses'=>'EventController@destroy','as' => 'event.destroy']);
	$router->get('/{id}',['uses'=>'EventController@show','as' => 'event.show']);
	$router->get('/',['uses'=>'EventController@index','as' => 'event.index']);
	$router->post('/',['uses'=>'EventController@store','as' => 'event.store']);

});


	$router->post('/login',['uses'=>'AuthController@login','as' => 'event.login']);

	$router->post('/register',['uses'=>'AuthController@register','as' => 'event.register']);




// $router->group(['prefix' => 'aut'],function() use($router) {
// 	$router->get('')
// });



