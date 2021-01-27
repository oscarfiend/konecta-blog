<?php

use Illuminate\Database\Seeder;
use App\Article;

class ArticleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //Article::truncate();

        $faker=\Faker\Factory::create();

        for($i=0;$i<5;$i++){
            Article::create([
                'title'=>$faker->sentence,
                'category_id'=>"3",
                'slug'=>$faker->slug,
                'short_text'=>$faker->sentence,
                'large_text'=>$faker->sentence,
                'image'=>$faker->word,    
            ]);
        }

        for($i=0;$i<5;$i++){
            Article::create([
                'title'=>$faker->sentence,
                'category_id'=>"2",
                'slug'=>$faker->slug,
                'short_text'=>$faker->sentence,
                'large_text'=>$faker->sentence,
                'image'=>$faker->word,    
            ]);
        }
    }
}
