<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            Brukeradministrasjon
        </h2>
    </x-slot>



    @foreach ($users as $user)
        @if ($loop->first)
            <div class="py-12">
                <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div class="flex flex-col mb-3">
                        <div class="flex flex-col">
                            <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                                    <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                                        <table class="min-w-full divide-y divide-gray-200">
                                            <thead>
                                            <tr>
                                                <th class="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                                    Navn
                                                </th>
                                                <th class="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                                    E-Post
                                                </th>
                                                <th class="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                                    Rolle
                                                </th>
                                                <th class="px-6 py-3 bg-gray-50"></th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                        @endif

                                        @if($loop->even)
                                            <tr class="bg-gray-50">
                                                <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5 font-medium text-gray-900">
                                                    {{ $user->name }}
                                                </td>
                                                <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                                                    {{ $user->email }}
                                                </td>
                                                <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                                                    @if($user->hasRole('Administrator')) Administrator @elseif($user->hasRole('Bruker')) Bruker @else Ukjent/Ingen Rolle @endif
                                                </td>
                                                <td class="px-6 py-4 whitespace-no-wrap text-right text-sm leading-5 font-medium">
                                                    <a href="{{ route('userMgmt.edit.get', $user->id) }}" class="text-indigo-600 hover:text-indigo-900">Rediger</a>
                                                </td>
                                            </tr>
                                            @endif

                                        @if($loop->odd)
                                            <tr class="bg-white">
                                                <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5 font-medium text-gray-900">
                                                    {{ $user->name }}
                                                </td>
                                                <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                                                    {{ $user->email }}
                                                </td>
                                                <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                                                    @if($user->hasRole('Administrator')) Administrator @elseif($user->hasRole('Bruker')) Bruker @else Ukjent/Ingen Rolle @endif
                                                </td>
                                                <td class="px-6 py-4 whitespace-no-wrap text-right text-sm leading-5 font-medium">
                                                    <a href="{{ route('userMgmt.edit.get', $user->id) }}" class="text-indigo-600 hover:text-indigo-900">Rediger</a>
                                                </td>
                                            </tr>
                                        @endif

                                        @if ($loop->last)
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                </div>
                        {{ $users->links() }}
            </div>
            </div>
        @endif
    @endforeach

    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-white overflow-hidden shadow-xl sm:rounded-lg">
                <div class="p-6 sm:px-20 bg-white border-b border-gray-200">
                    <div class="flex justify-center">
                        <div class="text-2xl">
                            Handlinger
                        </div>
                    </div>
                    <div class="flex justify-center">
                        <a class="inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 active:bg-gray-900 focus:outline-none focus:border-gray-900 focus:shadow-outline-gray disabled:opacity-25 transition ease-in-out duration-150"
                           href="{{ route('userMgmt.user.get') }}">Legg til ny bruker</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</x-app-layout>
