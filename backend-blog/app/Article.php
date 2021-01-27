<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Article extends Model
{

    protected $table='articles';

    protected $fillable = [
        'title','slug','short_text','large_text','image','category_id','likes'
    ];

    public function categoria(){
        return $this->belongsTo('App\Category');
    }

    public function likes(){
        return $this->hasMany('App\Likes');
    }

    public function sluggable()
    {
        return [
            'slug' => [
                'source' => 'title'
            ]
        ];
    }
}
