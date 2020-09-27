<?php

namespace App\Http\Controllers;

use App\Models\Attraction;
use App\Models\ServiceMessage;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ServiceMessageController extends Controller
{
    public function listView($attraction) {
        $data = Attraction::where('slug', $attraction)->firstOrFail();

        return view('servicemessage.list', [
            'attraction' => $data,
            'servicemessages' => ServiceMessage::where('attraction_id', $data->id)->orderBy('id', 'DESC')->get()
        ]);
    }

    public function addView($attraction) {
        return view('servicemessage.add', [
            'attraction' => Attraction::where('slug', $attraction)->firstOrFail()
        ]);
    }

    public function editView($attraction, $servicemessage) {
        return view('servicemessage.edit', [
            'attraction' => Attraction::where('slug', $attraction)->firstOrFail(),
            'servicemessage' => ServiceMessage::findOrFail($servicemessage)
        ]);
    }

    public function edit(Request $request, $attraction, $servicemessage) {
        //Validate the incoming data
        $validated = $request->validate([
            'content' => 'required',
            'expires_at_weeks' => 'required|numeric',
            'expires_at_days' => 'required|numeric',
            'expires_at_hours' => 'required|numeric',
            'expire_now' => 'nullable|boolean'
        ], []);

        //Fetch the servicemessage
        $servicemessage = ServiceMessage::findOrFail($servicemessage);

        //Fetch the attraction
        $attraction = Attraction::where('slug', $attraction)->firstOrFail();

        //Expire administration checks
        if (isset($validated["expire_now"]) && $validated["expire_now"] == 1) {
            //Check if a expire now request has been set
            //Just set the expire time to the current time. This way a log will be kept, but the message will disappear from public view
            $validated["expires_at"] = Carbon::now('UTC');
        } elseif($validated["expires_at_weeks"] > 0 || $validated["expires_at_days"] > 0 || $validated["expires_at_hours"] > 0) {
            //The message should be extended
            $validated["expires_at"] = Carbon::parse($servicemessage["expires_at"])->addDays($validated["expires_at_days"])->addHours($validated["expires_at_hours"])->addWeeks($validated["expires_at_weeks"]);
        }

        //Remove the unneccesary stuff from the validated array
        unset($validated["expire_now"]);
        unset($validated["expires_at_hours"]);
        unset($validated["expires_at_days"]);
        unset($validated["expires_at_weeks"]);

        //Update the content
        $servicemessage->update($validated);
        $servicemessage->save();

        return redirect()->route('serviceMessage.edit.get', ['servicemessage' => $servicemessage->id, 'attraction' => $attraction->slug])->with(array('message' => 'Statusmeldingen ble oppdatert', 'status' => 'success'));
    }

    public function delete($attraction, $servicemessage) {
        ServiceMessage::destroy($servicemessage);

        return redirect()->route('serviceMessage.list.get', $attraction)->with(array('message' => 'Statusmeldingen ble slettet', 'status' => 'success'));
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
        $validated["expires_at"] = Carbon::now('UTC')->addDays($validated["expires_at_days"])->addHours($validated["expires_at_hours"])->addWeeks($validated["expires_at_weeks"]);

        //Remove the unneccesary stuff from the validated array
        unset($validated["open"]);
        unset($validated["expires_at_hours"]);
        unset($validated["expires_at_days"]);
        unset($validated["expires_at_weeks"]);

        //Create the new servicemessage
        $servicemessage = ServiceMessage::create($validated);


        return redirect()->route('serviceMessage.edit.get', ['servicemessage' => $servicemessage->id, 'attraction' => $attraction->slug])->with(array('message' => 'Statusmeldingen ble lagt til', 'status' => 'success'));
    }
}
