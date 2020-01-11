<?php

use Illuminate\Database\Seeder;
use App\Role;

class role_seeder extends Seeder
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
    		]
    	];

    	foreach ($data as $k) {
        Role::create($k);
    	}
    }
}
