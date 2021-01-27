<?php

use Illuminate\Database\Seeder;
use App\Category;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //Categoria::truncate();

        $faker=\Faker\Factory::create();
        for($i=0;$i<10;$i++){
            Category::create([
                'name'=>$faker->sentence,
            ]);
        }
    }
}
