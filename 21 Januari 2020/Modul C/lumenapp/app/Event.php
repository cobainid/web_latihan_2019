<?php

namespace App;


use Illuminate\Database\Eloquent\Model;


class Event extends Model
{
    function EventUser(){
        return $this->hasMany('App\EventUser');
    }
}
