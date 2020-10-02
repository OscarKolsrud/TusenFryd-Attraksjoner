<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            Oppdater statusmelding for {{ $attraction->name }}
        </h2>
    </x-slot>

    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-white overflow-hidden shadow-xl sm:rounded-lg">
                <div class="p-6 sm:px-20 bg-white border-b border-gray-200">
                    <form action="{{ route('serviceMessage.edit.put', ['attraction' => $attraction->slug, 'servicemessage' => $servicemessage->id]) }}" method="post">
                        <x-jet-validation-errors class="mb-4" />
                        <div>
                            @csrf
                            @method('PUT')
                            <div class="pt-8">
                                <div>
                                    {{-- Show a warning if the servicemessage has expired --}}
                                @if(\Carbon\Carbon::parse($servicemessage->expires_at)->isPast())
                                    <div class="rounded-md bg-red-50 mb-3 p-4">
                                        <div class="flex">
                                            <div class="flex-shrink-0">
                                                <!-- Heroicon name: exclamation -->
                                                <svg class="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                                                </svg>
                                            </div>
                                            <div class="ml-3">
                                                <h3 class="text-sm leading-5 font-medium text-red-700">
                                                    Denne statusmeldingen er utløpt! Du kan legge til mer tid under.
                                                </h3>
                                            </div>
                                        </div>
                                    </div>
                                    @endif

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
                                            <textarea id="content" name="content" rows="3" class="form-textarea block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5">{{ old('content') ?? $servicemessage->content }}</textarea>
                                        </div>
                                        <p class="mt-2 text-sm text-gray-500">Skriv kort en forklaring på stengningen. F.eks.: Midlertidlig driftstans</p>
                                    </div>
                                </div>
                            </div>
                            <div class="mt-8 border-t border-gray-200 pt-8">
                                <div>
                                    <h3 class="text-lg leading-6 font-medium text-gray-900">
                                        Nåværende status
                                    </h3>
                                    <p class="mt-1 text-sm leading-5 text-gray-500">
                                        Velg om attraksjonen skal settes som åpen eller stengt. Attraksjonen er for øyeblikket markert som @if($attraction->open == 1) Åpen. @else Stengt. @endif
                                    </p>
                                </div>
                                <div class="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                                    <div class="sm:col-span-6">
                                        <label for="open" class="block text-sm font-medium leading-5 text-gray-700">
                                            Nåværende status
                                        </label>
                                        <div class="mt-1 rounded-md shadow-sm">
                                            <select id="open" name="open" class="form-select block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5">
                                                <option value="1" {{ (old("open") == "1" || $attraction->open == "1" ? "selected":"") }}>Åpen</option>
                                                <option value="0" {{ (old("open") == "0" || $attraction->open == "0" ? "selected":"") }}>Stengt</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="mt-8 border-t border-gray-200 pt-8">
                                <div>
                                    <h3 class="text-lg leading-6 font-medium text-gray-900">
                                        Legg til tid på utløp
                                    </h3>
                                    <p class="mt-1 text-sm leading-5 text-gray-500">
                                        Statusmeldinger utløper automatisk etter ett oppgitt tidspunkt. Her kan du legge til mer tid. Denne meldingen utløper: {{ \Carbon\Carbon::parse($servicemessage->expires_at)->setTimezone('Europe/Oslo')->format('H:i d.m.Y') }}
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
                                            <input id="expires_at_hours" name="expires_at_hours" type="number" min="0" value="0" class="form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5">
                                        </div>
                                    </div>

                                    <div class="sm:col-span-3">
                                        <div class="relative flex items-start">
                                            <div class="flex items-center h-5">
                                                <input id="expire_now" name="expire_now" value="1" type="checkbox" class="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out">
                                            </div>
                                            <div class="ml-3 text-sm leading-5">
                                                <label for="expire_now" class="font-medium text-gray-700">Utløp nå</label>
                                                <p class="text-gray-500">Huk av denne boksen for å utløpe statusmeldingen nå</p>
                                            </div>
                                        </div>
                                    </div>
                            </div>
                        </div>
                        <div class="mt-8 border-t border-gray-200 pt-5">
                            <div class="flex justify-end">
                                      <span class="inline-flex rounded-md shadow-sm">
        <a href="{{ route('serviceMessage.list.get', $attraction->slug) }}" role="button" class="py-2 px-4 border border-gray-300 rounded-md text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800 transition duration-150 ease-in-out">
          Gå tilbake til oversikt
        </a>
      </span>
                                <span class="ml-3 inline-flex rounded-md shadow-sm">
        <button type="submit" class="inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 active:bg-gray-900 focus:outline-none focus:border-gray-900 focus:shadow-outline-gray disabled:opacity-25 transition ease-in-out duration-150">
          Oppdater statusmelding for {{ $attraction->name }}
        </button>
      </span>
                            </div>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    </div>

    @if(!\Carbon\Carbon::parse($servicemessage->expires_at)->isPast())
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-white overflow-hidden shadow-xl sm:rounded-lg">
                <div class="p-6 sm:px-20 bg-white border-b border-gray-200">
                    <div class="flex justify-center">
                        <form id="deleteMessage" action="{{ route('serviceMessage.edit.delete', ['attraction' => $attraction->slug, 'servicemessage' => $servicemessage->id]) }}" method="post">
                            @csrf
                            @method('DELETE')
                            <input type="submit" value="Slett statusmelding" class="inline-flex items-center justify-center px-4 py-2 bg-red-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-red-500 focus:outline-none focus:border-red-700 focus:shadow-outline-red active:bg-red-600 transition ease-in-out duration-150">
                        </form>
                    </div>
                </div>
            </div>
        </div>
    @endif
</x-app-layout>
