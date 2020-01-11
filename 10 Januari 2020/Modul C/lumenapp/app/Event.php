<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    protected $table = 'event';
    

    protected $fillable = [
        'name', 'address', 'date', 'description', 'image_url'
    ];

    function eventUser(){
        return $this->hasMany('App\EventUser');
    }
}
