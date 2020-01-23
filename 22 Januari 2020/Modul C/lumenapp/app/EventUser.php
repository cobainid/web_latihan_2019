<?php

namespace App;
use Illuminate\Database\Eloquent\Model;

class EventUser extends Model
{
    function event (){
        return $this->belongsTo('App\Event');
    }
    function user (){
        return $this->belongsTo('App\User');
    }
}
