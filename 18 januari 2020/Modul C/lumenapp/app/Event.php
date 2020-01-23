<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    protected $table = 'event';
    protected $primaryKey = 'id';

    function eventUser(){
        return $this->hasMany('App\EventUser');
    }

}
