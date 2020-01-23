<?php

namespace App;


use Illuminate\Database\Eloquent\Model;


class EventUser extends Model
{
    function Event(){
        return $this->belongsTo('App\Event');
    }
    function User(){
    	return $this->belongsTo('App\User');
    }
}
