<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            Rediger bruker: {{ $user->name }}
        </h2>
    </x-slot>

    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-white overflow-hidden shadow-xl sm:rounded-lg">
                <div class="p-6 sm:px-20 bg-white border-b border-gray-200">
                    <form id="editForm" action="{{ route('userMgmt.edit.put', $user->id) }}" method="post">
                        <x-jet-validation-errors class="mb-4"/>
                        <div>
                            @csrf
                            @method('PUT')
                            <div class="pt-8">
                                <div>
                                    <h3 class="text-lg leading-6 font-medium text-gray-900">
                                        Brukerinformasjon
                                    </h3>
                                </div>
                                <div class="mt-3 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                                    <div class="sm:col-span-6">
                                        <label for="name" class="block text-sm font-medium leading-5 text-gray-700">
                                            Navn
                                        </label>
                                        <div class="mt-1 rounded-md shadow-sm">
                                            <input id="name" name="name" value="{{ old('name') ?? $user->name }}" type="text"
                                                   class="form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5">
                                        </div>
                                    </div>
                                    <div class="sm:col-span-6">
                                        <label for="email" class="block text-sm font-medium leading-5 text-gray-700">
                                            E-Post
                                        </label>
                                        <div class="mt-1 rounded-md shadow-sm">
                                            <input id="email" name="email" value="{{ old('email') ?? $user->email }}" type="email"
                                                   class="form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5">
                                        </div>
                                    </div>
                                    <div class="sm:col-span-6">
                                        <label for="password" class="block text-sm font-medium leading-5 text-gray-700">
                                            Passord (Fyll kun ut om du skal endre passord)
                                        </label>
                                        <div class="mt-1 rounded-md shadow-sm">
                                            <input id="password" name="password" type="password"
                                                   class="form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5">
                                        </div>
                                    </div>
                                    <div class="sm:col-span-6">
                                        <label for="confirm_password" class="block text-sm font-medium leading-5 text-gray-700">
                                            Bekreft Passord (Fyll kun ut om du skal endre passord)
                                        </label>
                                        <div class="mt-1 rounded-md shadow-sm">
                                            <input id="confirm_password" name="confirm_password" type="password"
                                                   class="form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5">
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                                <div class="sm:col-span-6">
                                    <label for="role" class="block text-sm font-medium leading-5 text-gray-700">
                                        Rolle
                                    </label>
                                    <div class="mt-1 rounded-md shadow-sm">
                                        <select id="role" name="role" class="form-select block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5">
                                            <option value="Administrator" {{ (old("role") == "Administrator" || $user->hasRole('Administrator') ? "selected":"") }}>Administrator</option>
                                            <option value="Bruker" {{ (old("role") == "Bruker" || $user->hasRole('Bruker') ? "selected":"") }}>Bruker</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="mt-8 border-t border-gray-200 pt-5">
                            <div class="flex justify-end">
                                <span class="inline-flex rounded-md shadow-sm">
        <a href="{{ route('userMgmt.get') }}" role="button"
           class="py-2 px-4 border border-gray-300 rounded-md text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800 transition duration-150 ease-in-out">
          Gå tilbake til brukeradministrasjon
        </a>
      </span>
                                <span class="ml-3 inline-flex rounded-md shadow-sm">
        <button type="submit" form="editForm"
                class="inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 active:bg-gray-900 focus:outline-none focus:border-gray-900 focus:shadow-outline-gray disabled:opacity-25 transition ease-in-out duration-150">
          Lagre endringer
        </button>
      </span>
                            </div>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    </div>

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
                        <form id="deleteForm" action="{{ route('userMgmt.edit.delete', $user->id) }}" method="post">
                            @csrf
                            @method('DELETE')
                            <button type="submit" class="inline-flex items-center justify-center px-4 py-2 bg-red-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-red-500 focus:outline-none focus:border-red-700 focus:shadow-outline-red active:bg-red-600 transition ease-in-out duration-150">
                                Slett Bruker
                            </button>
                        </form>

                    </div>
                </div>
            </div>
        </div>
    </div>
</x-app-layout>
