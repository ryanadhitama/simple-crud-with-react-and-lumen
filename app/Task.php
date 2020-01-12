<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Task extends Model
{

    protected $fillable = ["title", "description"];

    protected $dates = [];

    public static $rules = [
        "title" => "required",
        "description" => "required",
    ];
}
