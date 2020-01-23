<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class EventUser extends Model
{
    protected $table = 'event_user';
    protected $primaryKey = 'id';

    function event(){
        return $this->belongsTo('App\Event');
    }

    function user(){
        return $this->belongsTo('App\User');
    }

}
