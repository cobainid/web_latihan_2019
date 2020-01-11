<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use App\User;

class AuthController extends Controller
{

    public function register(Request $r){
        $checkUser = User::where(['username' => $r->username])->get();
        if(count($checkUser) > 0){
            return response([
                'success' => false,
                'message' => 'Username sudah digunakan'
            ]);
        }else{

            $data = [
                "username" => $r->username,
                "password" => Hash::make($r->password),
                "api_token" => Str::random(32),
                "role_id" => $r->role_id
            ];

            $user = new User($data);

            if($user->save()){
                return response([
                    'success' => true,
                    'message' => 'Data berhasil disimpan',
                    'data' => $data
                ]);
            }

            return response([ 
                'success' => false,
                'message' => 'Error saat menambahkan data'
             ]);
        }
    }



    public function login(Request $r){
        $checkUser = User::where(['username' => $r->username])->get();
        if(count($checkUser) > 0){
            // dd($checkUser)
            if(Hash::check($r->password,$checkUser[0]->password)){
                $checkUser[0]->update([
                    'api_token' => Str::random(32)
                ]);

                return response([
                    'success' => true,
                    'data' => $checkUser[0]
                ]);
            }
        }

        return response([
            'success' => false,
            'message' => 'Username / password yang anda masukkan salah'
        ]);
    }

}
