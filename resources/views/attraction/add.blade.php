<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            Legg til ny attraksjon
        </h2>
    </x-slot>

    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-white overflow-hidden shadow-xl sm:rounded-lg">
                <div class="p-6 sm:px-20 bg-white border-b border-gray-200">
                    <form action="{{ route('addAttraction.post') }}" method="post">
                        <x-jet-validation-errors class="mb-4"/>
                        <div>
                            @csrf
                            <div class="pt-8">
                                <div>
                                    <h3 class="text-lg leading-6 font-medium text-gray-900">
                                        Attraksjonsinformasjon
                                    </h3>
                                    <p class="mt-1 text-sm leading-5 text-gray-500">
                                        Denne informasjonen vil vises til gjesten
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
                                        <label for="read_more"
                                               class="block text-sm font-medium leading-5 text-gray-700">
                                            Ekstern Lenke (Link f.eks attraksjonsinformasjon siden på TusenFryd.no)
                                        </label>
                                        <div class="mt-1 rounded-md shadow-sm">
                                            <input id="read_more" name="read_more" value="{{ old('read_more') }}"
                                                   type="url"
                                                   class="form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5">
                                        </div>
                                    </div>

                                    <div class="sm:col-span-6">
                                        <label for="opening_times_information"
                                               class="block text-sm font-medium leading-5 text-gray-700">
                                            Åpningstid informasjonstekst
                                        </label>
                                        <div class="mt-1 rounded-md shadow-sm">
                                            <textarea id="opening_times_information" name="opening_times_information"
                                                      rows="3"
                                                      class="form-textarea block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5">{{ old('opening_times_information') }}</textarea>
                                        </div>
                                        <p class="mt-2 text-sm text-gray-500">Beskriv åpningstiden til attraksjonen
                                            eller bare be de se en ekstern lenke.</p>
                                    </div>
                                </div>
                            </div>

                            <div class="mt-8 border-t border-gray-200 pt-8">
                                <div>
                                    <h3 class="text-lg leading-6 font-medium text-gray-900">
                                        Nåværende status
                                    </h3>
                                    <p class="mt-1 text-sm leading-5 text-gray-500">
                                        Velg om attraksjonen skal begynne som stengt eller åpen.
                                    </p>
                                </div>
                                <div class="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                                    <div class="sm:col-span-6">
                                        <label for="open" class="block text-sm font-medium leading-5 text-gray-700">
                                            Nåværende status
                                        </label>
                                        <div class="mt-1 rounded-md shadow-sm">
                                            <select id="open" name="open"
                                                    class="form-select block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5">
                                                <option value="1" {{ (old("open") == "1" ? "selected":"") }}>Åpen
                                                </option>
                                                <option value="0" {{ (old("open") == "0" ? "selected":"") }}>Stengt
                                                </option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="mt-8 border-t border-gray-200 pt-8">
                                <div>
                                    <h3 class="text-lg leading-6 font-medium text-gray-900">
                                        Avansert
                                    </h3>
                                    <p class="mt-1 text-sm leading-5 text-gray-500">
                                        Her er avanserte innstillinger. Kun bruk disse dersom du vet hva de gjør
                                    </p>
                                </div>
                                <div class="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                                    <div class="sm:col-span-6">
                                        <label for="sort_order"
                                               class="block text-sm font-medium leading-5 text-gray-700">
                                            Sorteringstall
                                        </label>
                                        <div class="mt-1 rounded-md shadow-sm">
                                            <input id="sort_order" type="number" min="0"
                                                   value="{{ old('sort_order') ?? "10" }}"
                                                   class="form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5">
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div class="mt-8 border-t border-gray-200 pt-5">
                            <div class="flex justify-end">
                                                                      <span class="inline-flex rounded-md shadow-sm">
        <a href="{{ route('dashboard') }}" role="button"
           class="py-2 px-4 border border-gray-300 rounded-md text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800 transition duration-150 ease-in-out">
          Gå tilbake til dashboard
        </a>
      </span>
                                <span class="ml-3 inline-flex rounded-md shadow-sm">
        <button type="submit"
                class="inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 active:bg-gray-900 focus:outline-none focus:border-gray-900 focus:shadow-outline-gray disabled:opacity-25 transition ease-in-out duration-150">
          Opprett ny attraksjon
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
