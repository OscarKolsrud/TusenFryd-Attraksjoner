<?php

namespace App\Http\Controllers;

use App\Models\Attraction;
use App\Models\ServiceMessage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ServiceMessageController extends Controller
{
    public function addView($attraction) {
        return view('pages.servicemessage.add', [
            'attraction' => Attraction::where('slug', $attraction)->firstOrFail()
        ]);
    }

    public function add(Request $request, $attraction) {
        //Validate the incoming data
        $validated = $request->validate([
            'content' => 'required',
            'expires_at' => 'required',
        ], []);

        //Fetch the attraction
        $attraction = Attraction::where('slug', $attraction)->firstOrFail();

        $validated["attraction_id"] = $attraction->id;

        if (isset(Auth::user()->id)) {
            $validated["user_id"] = Auth::user()->id;
        }


        return redirect()->route('editAttraction-view', ['slug' => $attraction->slug])->with(array('message' => 'Attraksjonen ble oppdatert', 'status' => 'success'));
    }
}
