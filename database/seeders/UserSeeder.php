<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //First seed all roles and perms
        $iteration = 0;
        $roles = ['Administrator', 'Bruker'];
        $normalPermissions = ['manage attractions', 'manage servicemessages'];
        $administratorPermissions = ['manage users', 'add attraction', 'delete attraction'];

        $adminRole = Role::create(['name' => 'Administrator']);
        $userRole = Role::create(['name' => 'Bruker']);


        foreach ($normalPermissions as $permissionname) {
            $permission = Permission::create(['name' => $permissionname]);
            $adminRole->givePermissionTo($permission);
            $userRole->givePermissionTo($permission);
        }

        //Permissions for administrator user
        foreach ($administratorPermissions as $permissionname) {
            $permission = Permission::create(['name' => $permissionname]);
            $adminRole->givePermissionTo($permission);
        }

        //Create a inital admin user
        $adminUser = User::create([
            'name' => "Administrator",
            'email' => "admin@tusenfryd.no",
            'password' => Hash::make("passord")
        ]);
        $adminUser->assignRole('Administrator');
    }
}
