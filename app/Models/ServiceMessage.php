<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class ServiceMessage extends Model
{
    protected $fillable = ['content', 'expires_at', 'user_id', 'attraction_id'];

    public function attraction()
    {
        return $this->belongsTo('App\Models\Attraction');
    }
}
