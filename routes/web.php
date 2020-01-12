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

$router->get('/', function () use ($router) {
    return $router->app->version();
});

/**
 * Routes for resource task
 */
$router->get('task', 'TasksController@all');
$router->get('task/{id}', 'TasksController@get');
$router->post('task', 'TasksController@add');
$router->put('task/{id}', 'TasksController@put');
$router->delete('task/{id}', 'TasksController@remove');
