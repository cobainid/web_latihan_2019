<?php

namespace App;
use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    function eventUser (){
        return $this->hasMany('App\EventUser');
    }
}
