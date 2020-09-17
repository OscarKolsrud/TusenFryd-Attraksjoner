<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class ServiceMessage extends Model
{
    public function add(Request $request) {
        //Validate the incoming data
        $validated = $request->validate([
            'attraction_id' => 'required|exists:attractions,id',
            'content' => 'required',
            'expires' => 'required',
        ], []);

        $attraction = ServiceMessage::create($validated);

        return redirect()->route('editAttraction-view', ['slug' => $attraction->slug])->with(array('message' => 'Attraksjonen ble oppdatert', 'status' => 'success'));
    }
}
