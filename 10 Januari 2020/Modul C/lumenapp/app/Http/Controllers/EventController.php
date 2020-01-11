<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

use App\User;
use App\Event;
use App\EventUser;

class EventController extends Controller
{

    public function index(){
        $event = Event::orderBy('created_at','DESC')->get();
        return response([
            'success' => true,
            'data' => $event
        ]);
    }

    public function store(Request $r){

        $fileName = time().'_'.Str::random(5).'.'.$r->image_url->getClientOriginalExtension();

        $r->image_url->move('images',$fileName);

        $data = [
            'name' => $r->name,
            'address' => $r->address,
            'date' => $r->date,
            // 'image_url' => $r->image_url,
            'image_url' => $fileName,
            'description' => $r->description
        ];

        $event = new Event($data);

        if($event->save()){
            return response([
                'success' => true,
                'message' => 'Data berhasil ditambahkan'
            ]);
        }

        return response([
            'success' => false,
            'message' => 'Data gagal ditambahkan'
        ]);
    }


    public function update(Request $r,$id){

        $event = Event::findOrFail($id);

        // dd($r->image_url);

        if($r->image_url == $event->image_url){
            $fileName = $event->image_url;
        }else{
            $fileName = time().'_'.Str::random(5).'.'.$r->image_url->getClientOriginalExtension();

            $r->image_url->move('images',$fileName);
        }

        $data = [
            'name' => $r->name,
            'address' => $r->address,
            'date' => $r->date,
            // 'image_url' => $r->image_url,
            'image_url' => $fileName,
            'description' => $r->description
        ];

        
        if($event->update($data)){
            $event->touch();

            return response([
                'success' => true,
                'message' => 'Data berhasil diubah'
            ]);
        }

        return response([
            'success' => false,
            'message' => 'Data gagal diubah'
        ]);
    }

    public function show($id){
        $event = Event::findOrFail($id);

        return response([
            'success' => true,
            'data' => $event
        ]);
    }

    public function destroy($id){
        $event = Event::findOrFail($id);

        if($event->delete()){
            return response([
                'success' => true,
                'message' => "Data berhasil dihapus"
            ]);
        }

        return response([
            'success' => false,
            'message' => "Data gagal dihapus"
        ]);
    }


    public function join(Request $r){
        $user = User::where(['api_token' => $r->api_token])->get();
        // dd($user[0]);
        if(count($user) < 1){
            return response([
                "success" =>false,
                "message" => 'Authentication failed'
            ]);

        }else{
            $event = EventUser::where(['user_id' => $user[0]->id])->get();
            $events = [];


            foreach ($event as $ev) {
                \array_push($events,Event::findOrFail($ev->event_id));
            }

            return response([
                "success" =>true,
                "count" => count($events),
                "data" => $events
            ]);
            
        }
    }

    public function storeJoin(Request $r,$id){
        $user = User::where(['api_token' => $r->api_token])->get();
        $event = Event::where(['id' => $id])->get();
        if(count($user) < 1 && count($event) > 0){
            return response([
                "success" =>false,
                "message" => 'Authentication failed'
            ]);

        }else{

            $data = [
                'user_id' => $user[0]->id,
                'event_id' => $id
            ];
            $eventCheck = EventUser::where($data)->get();
            if(count($eventCheck) > 0){
                return response([
                    "success" => false,
                    "message" => "Telah bergabung dengan event"
                ]);
            }
            $defEvent = new EventUser($data);

            if($defEvent->save()){
                return response([
                    "success" => true,
                    "message" => "Data berhasil ditambahkan",
                    "data" => $defEvent,
                ]);
            }
            return response([
                "success" => false,
                "message" => "Data gagal ditambahkan"
            ]);

            
        }

    }




}
