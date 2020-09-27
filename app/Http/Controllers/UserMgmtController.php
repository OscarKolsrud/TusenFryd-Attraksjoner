<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;

class UserMgmtController extends Controller
{
    public function listPage(Request $request) {
        return view('admin.user-list', [
            'users' => User::paginate(10)
        ]);
    }

    public function createPage() {
        return view('admin.register');
    }

    public function create(Request $request) {
        //Validate the incoming data
        $validated = $request->validate([
            'name' => 'required',
            'email' => 'required|email',
            'password' => 'required|min:5',
            'confirm_password' => 'same:password'
        ], []);

        $user = User::where('email', '=', $validated["email"])->first();

        if ($user === null) {
            $user = User::create([
                'name' => $validated["name"],
                'email' => $validated["email"],
                'password' => Hash::make($validated["password"])
            ]);
        }

        $user->assignRole('Bruker');

        //User created, redirect
        return redirect()->route('userMgmt.edit.get', ['userid' => $user->id])->with(array('message' => 'Brukeren ble opprettet', 'status' => 'success'));
    }

    public function editPage($user) {
        return view('admin.edit', [
            'user' => User::findOrFail($user),
            'roles' => Role::all()
        ]);
    }

    public function edit(Request $request, $user) {
        //Validate the incoming data
        $validated = $request->validate([
            'name' => 'required',
            'email' => 'required|email',
            'password' => 'nullable|min:5',
            'confirm_password' => 'nullable|required_with:password|same:password',
            'role' => 'required|string'
        ], []);

        //Find the user in question
        $user = User::findOrFail($user);

        $user->name = $validated['name'];
        $user->email = $validated['email'];
        if (isset($validated["password"])) {
            $user->password = Hash::make($validated['password']);
        }

        $user->assignRole($validated['role']);

        $user->save();

        //User created, redirect
        return redirect()->route('userMgmt.edit.get', ['userid' => $user->id])->with(array('message' => 'Brukeren ble redigert', 'status' => 'success'));
    }

    public function delete($userid) {
        if ($userid == auth()->user()->id) {
            return redirect()->route('userMgmt.get')->with(array('message' => 'Du kan ikke slette deg selv!', 'status' => 'danger'));
        } else {
            //Delete the record
            User::destroy($userid);
            return redirect()->route('userMgmt.get')->with(array('message' => 'Brukeren ble slettet', 'status' => 'success'));
        }
    }
}
