<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Illuminate\Http\Request;

use App\Event;
use App\EventUser;
use App\User;

class EventController extends Controller
{

    public function __construct()
    {
        //
    }


    public function index(){
    	return response([
    		"success" => true,
    		"data" => Event::orderBy('created_at','DESC')->get()]);
    }


    public function store(Request $r){
        if($r->hasFile('image_url')){
            $fileName = Str::random(32).".".$r->image_url->getClientOriginalExtension();
            $r->image_url->move('images',$fileName);
            $r->image_url = $fileName;
        }else {
            return response([
                "success" => false,
                "message" => "Gambar tidak boleh kosong"]);
        }

        $event = new Event;
        $event->name = $r->name;
        $event->address = $r->address;
        $event->date = $r->date;
        $event->image_url = $r->image_url;
        $event->description = $r->description;

        $event->save();

        return response([
            "success" => true,
            "message" => "Event Berhasil disimpan",
            "data" => Event::orderBy('created_at','DESC')->get()]);
    }

    public function update(Request $r,$id){
        $event = Event::findOrFail($id);

        if($r->image_url != "undefined"){
            $fileName = Str::random(32).".".$r->image_url->getClientOriginalExtension();
            $r->image_url->move('images',$fileName);
            $r->image_url = $fileName;
        }else {
        	$r->image_url = $event->image_url;
        }

        $event->name = $r->name;
        $event->address = $r->address;
        $event->date = $r->date;
        $event->image_url = $r->image_url;
        $event->description = $r->description;

        $event->save();

        return response([
            "success" => true,
            "message" => "Event Berhasil disimpan",
            "data" => Event::orderBy('created_at','DESC')->get()]);
    }

    public function show($id){
    	$event  = Event::findOrFail($id);
    	return response(["success" => true, "data" => $event]);
    }


    public function destroy($id){
    	try{
    		$event = Event::findOrFail($id);

    		$event->delete();

    		return response([
    			"success" => true,
    			"message" => "Event berhasil di hapus",
	            "data" => Event::orderBy('created_at','DESC')->get()]);

    	}catch(Exception $e){
	    	return response([
	    		"success" => false,
	    		"message" => "Event gagal di hapus"]);
    	}
    }



    //
}
