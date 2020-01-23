<?php

use Illuminate\Database\Seeder;

use App\Role;

class RoleSeeder extends Seeder
{


    public function run()
    {
        $data = [
        	[
        		"name" => "Administrator"
        	],
        	[
        		"name" => "User Biasa"
        	]
        ];

        foreach ($data as $val) {
        	Role::create($val);
        }
    }
}
