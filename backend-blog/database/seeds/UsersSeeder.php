<?php

use Illuminate\Database\Seeder;
use App\User;

class UsersSeeder extends Seeder
{

    
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //User::truncate();

        $faker=\Faker\Factory::create();

        $password=bcrypt('123456');

        User::create([
            'name'=>"Admin",
            'email'=>"admin@gmail.com",
            'password'=>$password,
            'phone'=>'3145665555',
            'role'=>"Administrador"

        ]);

        // for($i=0;$i<5;$i++){
        //     User::create([
        //         'name'=>$faker->name,
        //         'email'=>$faker->email,
        //         'password'=>$password,
        //         'phone'=>$faker->phoneNumber,
        //         'role'=>"Usuario"    
        //     ]);
        // }


    }
}
