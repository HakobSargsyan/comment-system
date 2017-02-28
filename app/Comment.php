<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'description', 'parent_id',
    ];

    public function comments()
    {
        return $this->hasMany(__Class__, "parent_id");
    }

    /**
     * Recursive get coments with childrens
     *
     * @var array
     */
    public function childrens()
    {
        return $this->comments()->with('childrens');
    }

}
