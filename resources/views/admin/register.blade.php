<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            Legg til ny bruker
        </h2>
    </x-slot>

    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-white overflow-hidden shadow-xl sm:rounded-lg">
                <div class="p-6 sm:px-20 bg-white border-b border-gray-200">
                    <form action="{{ route('userMgmt.user.post') }}" method="post">
                        <x-jet-validation-errors class="mb-4"/>
                        <div>
                            @csrf
                            <div class="pt-8">
                                <div>
                                    <h3 class="text-lg leading-6 font-medium text-gray-900">
                                        Brukerinformasjon
                                    </h3>
                                    <p class="mt-1 text-sm leading-5 text-gray-500">
                                        Brukeren vil som standard ha tilgang til å redigere åpningsstatusen til attraksjonene, samt legge til, slette og redigere statusmeldinger
                                    </p>
                                </div>
                                <div class="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                                    <div class="sm:col-span-6">
                                        <label for="name" class="block text-sm font-medium leading-5 text-gray-700">
                                            Navn
                                        </label>
                                        <div class="mt-1 rounded-md shadow-sm">
                                            <input id="name" name="name" value="{{ old('name') }}" type="text"
                                                   class="form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5">
                                        </div>
                                    </div>
                                    <div class="sm:col-span-6">
                                        <label for="email" class="block text-sm font-medium leading-5 text-gray-700">
                                            E-Post
                                        </label>
                                        <div class="mt-1 rounded-md shadow-sm">
                                            <input id="email" name="email" value="{{ old('email') }}" type="email"
                                                   class="form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5">
                                        </div>
                                    </div>
                                    <div class="sm:col-span-6">
                                        <label for="password" class="block text-sm font-medium leading-5 text-gray-700">
                                            Passord
                                        </label>
                                        <div class="mt-1 rounded-md shadow-sm">
                                            <input id="password" name="password" type="password"
                                                   class="form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5">
                                        </div>
                                    </div>
                                    <div class="sm:col-span-6">
                                        <label for="confirm_password" class="block text-sm font-medium leading-5 text-gray-700">
                                            Bekreft Passord
                                        </label>
                                        <div class="mt-1 rounded-md shadow-sm">
                                            <input id="confirm_password" name="confirm_password" type="password"
                                                   class="form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5">
                                        </div>
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
        <button type="submit"
                class="inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 active:bg-gray-900 focus:outline-none focus:border-gray-900 focus:shadow-outline-gray disabled:opacity-25 transition ease-in-out duration-150">
          Opprett ny bruker
        </button>
      </span>
                            </div>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    </div>
</x-app-layout>
