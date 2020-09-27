<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            Legg til ny statusmelding for {{ $attraction->name }}
        </h2>
    </x-slot>

    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-white overflow-hidden shadow-xl sm:rounded-lg">
                <div class="p-6 sm:px-20 bg-white border-b border-gray-200">
                    <form action="{{ route('serviceMessage.add.post', $attraction->slug) }}" method="post">
                        <x-jet-validation-errors class="mb-4" />
                        <div>
                            @csrf
                            <div class="pt-8">
                                <div>
                                    <h3 class="text-lg leading-6 font-medium text-gray-900">
                                        Statusmeldingens innhold
                                    </h3>
                                    <p class="mt-1 text-sm leading-5 text-gray-500">
                                        Denne informasjonen vil vises til gjesten, og lagres for historikk. Etter meldingens utløp vil den ikke lenger være synlig for gjesten
                                    </p>
                                </div>
                                <div class="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                                    <div class="sm:col-span-6">
                                        <label for="content" class="block text-sm font-medium leading-5 text-gray-700">
                                            Statusmelding
                                        </label>
                                        <div class="mt-1 rounded-md shadow-sm">
                                            <textarea id="content" name="content" rows="3" class="form-textarea block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5">{{ old('content') }}</textarea>
                                        </div>
                                        <p class="mt-2 text-sm text-gray-500">Skriv kort en forklaring på stengningen. F.eks.: Midlertidlig driftstans</p>
                                    </div>
                                </div>
                            </div>

                            <div class="mt-8 border-t border-gray-200 pt-8">
                                <div>
                                    <h3 class="text-lg leading-6 font-medium text-gray-900">
                                        Utløpstidspunkt
                                    </h3>
                                    <p class="mt-1 text-sm leading-5 text-gray-500">
                                        Statusmeldinger utløper automatisk etter ett oppgitt tidspunkt. Standard tid er 1 time.
                                    </p>
                                </div>
                                <div class="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                                    <div class="sm:col-span-2">
                                        <label for="expires_at_weeks" class="block text-sm font-medium leading-5 text-gray-700">
                                            Uker
                                        </label>
                                        <div class="mt-1 rounded-md shadow-sm">
                                            <input id="expires_at_weeks" name="expires_at_weeks" type="number" min="0" value="0" class="form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5">
                                        </div>
                                    </div>

                                    <div class="sm:col-span-2">
                                        <label for="expires_at_days" class="block text-sm font-medium leading-5 text-gray-700">
                                            Dager
                                        </label>
                                        <div class="mt-1 rounded-md shadow-sm">
                                            <input id="expires_at_days" name="expires_at_days" type="number" min="0" value="0" class="form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5">
                                        </div>
                                    </div>

                                    <div class="sm:col-span-2">
                                        <label for="expires_at_hours" class="block text-sm font-medium leading-5 text-gray-700">
                                            Timer
                                        </label>
                                        <div class="mt-1 rounded-md shadow-sm">
                                            <input id="expires_at_hours" name="expires_at_hours" type="number" min="0" value="1" class="form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5">
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="mt-8 border-t border-gray-200 pt-8">
                                <div>
                                    <h3 class="text-lg leading-6 font-medium text-gray-900">
                                        Hvordan skal attraksjonen vises
                                    </h3>
                                    <p class="mt-1 text-sm leading-5 text-gray-500">
                                        Velg om attraksjonen skal vises som stengt eller åpen, for øyeblikket står den som @if($attraction->open) åpen @else
                                            stengt @endif.
                                    </p>
                                </div>
                                <div class="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                                    <div class="sm:col-span-6">
                                        <label for="open" class="block text-sm font-medium leading-5 text-gray-700">
                                            Nåværende status
                                        </label>
                                        <div class="mt-1 rounded-md shadow-sm">
                                            <select id="open" name="open" class="form-select block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5">
                                                <option value="1" {{ (old("open") == "1" || $attraction->open == "0" ? "selected":"") }}>Åpen</option>
                                                <option value="0" {{ (old("open") == "0" || $attraction->open == "1" ? "selected":"") }}>Stengt</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div class="mt-8 border-t border-gray-200 pt-5">
                            <div class="flex justify-end">
                                <span class="ml-3 inline-flex rounded-md shadow-sm">
        <button type="submit" class="inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 active:bg-gray-900 focus:outline-none focus:border-gray-900 focus:shadow-outline-gray disabled:opacity-25 transition ease-in-out duration-150">
          Opprett ny statusmelding for {{ $attraction->name }}
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
