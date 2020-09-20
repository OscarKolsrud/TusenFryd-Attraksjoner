<?php

namespace App\Http\Controllers;

use App\Models\Attraction;
use App\Models\ServiceMessage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ServiceMessageController extends Controller
{
    public function listView($attraction) {
        $data = Attraction::where('slug', $attraction)->firstOrFail();

        return view('pages.servicemessage.listSpecific', [
            'attraction' => $data,
            'servicemessages' => ServiceMessage::where('attraction_id', $data->id)->orderBy('id', 'DESC')->get()
        ]);
    }

    public function addView($attraction) {
        return view('pages.servicemessage.add', [
            'attraction' => Attraction::where('slug', $attraction)->firstOrFail()
        ]);
    }

    public function editView($servicemessage) {
        return view('pages.servicemessage.edit', [
            'servicemessage' => ServiceMessage::findOrFail($servicemessage)
        ]);
    }

    public function edit(Request $request, $servicemessage) {
        //Validate the incoming data
        $validated = $request->validate([
            'content' => 'required'
        ], []);

        //Fetch the servicemessage
        $servicemessage = ServiceMessage::findOrFail($servicemessage);

        //Update the content
        $servicemessage->content = $validated["content"];
        $servicemessage->update();

        return redirect()->route('serviceMsg-view', ['messageid' => $servicemessage->id])->with(array('message' => 'Statusmeldingens innhold ble oppdatert', 'status' => 'success'));
    }

    public function add(Request $request, $attraction) {
        //Validate the incoming data
        $validated = $request->validate([
            'content' => 'required',
            'expires_at_hours' => 'required|numeric|min:0',
            'expires_at_days' => 'required|numeric|min:0',
            'expires_at_weeks' => 'required|numeric|min:0',
            'open' => 'boolean'
        ], []);

        //Fetch the attraction
        $attraction = Attraction::where('slug', $attraction)->firstOrFail();

        //Store the attraction id and user id in validated array
        $validated["attraction_id"] = $attraction->id;
        $validated["user_id"] = Auth::user()->id;

        //Update the opening information
        $attraction->open = $validated["open"];
        $attraction->save();

        //Make the correct format of expires_at
        $validated["expires_at"] = \Carbon\Carbon::now('UTC')->addDays($validated["expires_at_days"])->addHours($validated["expires_at_hours"])->addWeeks($validated["expires_at_weeks"]);

        //Remove the unneccesary stuff from the validated array
        unset($validated["open"]);
        unset($validated["expires_at_hours"]);
        unset($validated["expires_at_days"]);
        unset($validated["expires_at_weeks"]);

        //Create the new servicemessage
        $servicemessage = ServiceMessage::create($validated);


        return redirect()->route('serviceMsg-view', ['messageid' => $servicemessage->id])->with(array('message' => 'Statusmeldingen ble lagt til', 'status' => 'success'));
    }
}
