<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            Redigeringslogg {{ $attraction->name }}
        </h2>
    </x-slot>

    @foreach ($audits as $audit)
        @if ($loop->first)
            <div class="py-12">
                <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div class="flex flex-col">
                        <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                                <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                                    <table class="min-w-full divide-y divide-gray-200">
                                        <thead>
                                        <tr>
                                            <th class="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                                Før
                                            </th>
                                            <th class="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                                Nå
                                            </th>
                                            <th class="px-6 py-3 bg-gray-50"></th>
                                        </tr>
                                        </thead>
                                        <tbody class="bg-white divide-y divide-gray-200">
                                        @endif
                                        <tr>
                                            <td class="px-6 py-4 whitespace-no-wrap">
                                                <div class="flex items-center">
                                                    <div>
                                                        <div class="text-sm leading-5 font-medium text-gray-900">
                                                            @forelse($audit->old_values as $key => $value)
                                                                <span class="font-bold">{{ $key }}: </span><span>{{ $value }}</span><br>
                                                            @empty
                                                                Ingen
                                                            @endforelse
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td class="px-6 py-4 whitespace-no-wrap">
                                                <div class="flex items-center">
                                                    <div>
                                                        <div class="text-sm leading-5 font-medium text-gray-900">
                                                            @forelse($audit->new_values as $key => $value)
                                                                <span class="font-bold">{{ $key }}: </span><span>{{ $value }}</span><br>
                                                            @empty
                                                                Ingen
                                                            @endforelse
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td class="px-6 py-4 whitespace-no-wrap text-right text-sm leading-5 font-medium">
                                                <div>
                                                    <div class="text-sm leading-5 font-medium text-gray-900">
                                                        {{ \Carbon\Carbon::parse($audit->created_at)->setTimezone('Europe/Oslo')->format('H:i d.m.Y') }}
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                        @if ($loop->last)
                                        </tbody>
                                    </table>
                                    <br>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        @endif
    @endforeach

    <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div class="bg-white overflow-hidden shadow-xl sm:rounded-lg">
            <div class="p-6 sm:px-20 bg-white border-b border-gray-200">
                <div class="flex justify-center">
                    <a href="{{ route('editAttraction.get', $attraction->slug) }}" role="button" class="py-2 px-4 border border-gray-300 rounded-md text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800 transition duration-150 ease-in-out">Tilbake til redigering</a>
                </div>
            </div>
        </div>
    </div>

</x-app-layout>
