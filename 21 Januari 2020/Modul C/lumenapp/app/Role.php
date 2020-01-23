<?php

namespace App;


use Illuminate\Database\Eloquent\Model;


class Role extends Model
{
    function User(){
        return $this->hasMany('App\User');
    }
}
