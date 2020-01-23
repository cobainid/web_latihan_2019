<?php

use Illuminate\Database\Seeder;

use App\Role;

class RoleSeeder extends Seeder
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
        		"name" => "Adminstrator"
        	],
        	[
        		"name" => "User Biasa"
        	]
        ];

        foreach ($data as $vl) {
        	Role::create($vl);
        }


    }


}
