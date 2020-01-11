<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    protected $table = 'user';
    

    protected $fillable = [
        'username', 'api_token', 'role_id','password'
    ];


    protected $hidden = [
        'password',
    ];


    function role(){
        return $this->belongsTo('App\Role');
    }

    function eventUser(){
        return $this->hasMany('App\EventUser');
    }
}
