<?php

use Illuminate\Database\Seeder;

use App\Role;
class RolesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $data = [
        	[
        		"name" => "Administrator"
        	],
        	[
        		"name" => "User Biasa"
        	],
        ];

        foreach($data as $dat){
        	Role::create($dat);
        }
    }
}
