<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Attraction extends Model
{
    protected $fillable = ['name', 'slug', 'description', 'read_more', 'open', 'opening_times_information', 'sort_order'];
}
