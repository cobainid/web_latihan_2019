<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class EventUser extends Model
{
    protected $table = 'event_user';
    

    protected $fillable = [
        'user_id', 'event_id'
    ];

    function user(){
        return $this->belongsTo('App\User');
    }
    function event(){
        return $this->belongsTo('App\Event');
    }
}
