<?php

namespace Database\Seeders;

use App\Models\Attraction;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class AttractionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $attractions = [
            [
                "name" => "SpinSpider",
                "read_more" => "https://www.tusenfryd.no/se-og-gjore/attraksjoner/spinspider",
                "open" => 1,
                "opening_times" => "Ikke tilgjengelig",
                "sort_order" => 1
            ],
            [
                "name" => "SpeedMonster",
                "read_more" => "https://www.tusenfryd.no/se-og-gjore/attraksjoner/speedmonster",
                "open" => 1,
                "opening_times" => "Ikke tilgjengelig",
                "sort_order" => 2
            ],
            [
                "name" => "ThunderCoaster",
                "read_more" => "https://www.tusenfryd.no/se-og-gjore/attraksjoner/thundercoaster",
                "open" => 1,
                "opening_times" => "Ikke tilgjengelig",
                "sort_order" => 3
            ],
            [
                "name" => "Nightmare",
                "read_more" => "https://www.tusenfryd.no/se-og-gjore/attraksjoner/nightmare",
                "open" => 1,
                "opening_times" => "Ikke tilgjengelig",
                "sort_order" => 4
            ],
            [
                "name" => "SkyCoaster",
                "read_more" => "https://www.tusenfryd.no/se-og-gjore/attraksjoner/skycoaster",
                "open" => 1,
                "opening_times" => "Ikke tilgjengelig",
                "sort_order" => 10
            ],
            [
                "name" => "SpaceShot",
                "read_more" => "https://www.tusenfryd.no/se-og-gjore/attraksjoner/spaceshot",
                "open" => 1,
                "opening_times" => "Ikke tilgjengelig",
                "sort_order" => 5
            ],
            [
                "name" => "SuperSplash",
                "read_more" => "https://www.tusenfryd.no/se-og-gjore/attraksjoner/supersplash",
                "open" => 1,
                "opening_times" => "Ikke tilgjengelig",
                "sort_order" => 6
            ],
            [
                "name" => "Ragnarok",
                "read_more" => "https://www.tusenfryd.no/se-og-gjore/attraksjoner/ragnarok",
                "open" => 1,
                "opening_times" => "Ikke tilgjengelig",
                "sort_order" => 7
            ],
            [
                "name" => "Thors Hammer",
                "read_more" => "https://www.tusenfryd.no/se-og-gjore/attraksjoner/thors-hammer",
                "open" => 1,
                "opening_times" => "Ikke tilgjengelig",
                "sort_order" => 8
            ],
            [
                "name" => "Tømmerstupet",
                "read_more" => "https://www.tusenfryd.no/se-og-gjore/attraksjoner/tommerstupet",
                "open" => 1,
                "opening_times" => "Ikke tilgjengelig",
                "sort_order" => 9
            ],
            [
                "name" => "Badefrydelven",
                "read_more" => "https://www.tusenfryd.no/se-og-gjore/attraksjoner/badefrydelven",
                "open" => 0,
                "opening_times" => "Ikke tilgjengelig",
                "sort_order" => 21
            ],
            [
                "name" => "Froskehoppet",
                "read_more" => "https://www.tusenfryd.no/se-og-gjore/attraksjoner/froskehoppet",
                "open" => 1,
                "opening_times" => "Ikke tilgjengelig",
                "sort_order" => 10
            ],
            [
                "name" => "Kanofarten",
                "read_more" => "https://www.tusenfryd.no/se-og-gjore/attraksjoner/kanofarten",
                "open" => 1,
                "opening_times" => "Ikke tilgjengelig",
                "sort_order" => 10
            ],
            [
                "name" => "Loopen",
                "read_more" => "https://www.tusenfryd.no/se-og-gjore/attraksjoner/loopen",
                "open" => 1,
                "opening_times" => "Ikke tilgjengelig",
                "sort_order" => 10
            ],
            [
                "name" => "Marihøna",
                "read_more" => "https://www.tusenfryd.no/se-og-gjore/attraksjoner/marihona",
                "open" => 1,
                "opening_times" => "Ikke tilgjengelig",
                "sort_order" => 10
            ],
            [
                "name" => "Store Radiobiler",
                "read_more" => "https://www.tusenfryd.no/se-og-gjore/attraksjoner/store-radiobiler",
                "open" => 1,
                "opening_times" => "Ikke tilgjengelig",
                "sort_order" => 10
            ],
            [
                "name" => "Stubbesnurr",
                "read_more" => "https://www.tusenfryd.no/se-og-gjore/attraksjoner/stubbesnurr",
                "open" => 1,
                "opening_times" => "Ikke tilgjengelig",
                "sort_order" => 10
            ],
            [
                "name" => "Sverre",
                "read_more" => "https://www.tusenfryd.no/se-og-gjore/attraksjoner/sverre",
                "open" => 1,
                "opening_times" => "Ikke tilgjengelig",
                "sort_order" => 10
            ],
            [
                "name" => "TrafikkFryd",
                "read_more" => "https://www.tusenfryd.no/se-og-gjore/attraksjoner/trafikkfryd",
                "open" => 1,
                "opening_times" => "Ikke tilgjengelig",
                "sort_order" => 10
            ],
            [
                "name" => "Trippelsklia",
                "read_more" => "https://www.tusenfryd.no/se-og-gjore/attraksjoner/trippelsklia",
                "open" => 1,
                "opening_times" => "Ikke tilgjengelig",
                "sort_order" => 22
            ],
            [
                "name" => "Western-expressen",
                "read_more" => "https://www.tusenfryd.no/se-og-gjore/attraksjoner/western-expressen",
                "open" => 1,
                "opening_times" => "Ikke tilgjengelig",
                "sort_order" => 10
            ],
            [
                "name" => "Steampunk Hunters",
                "read_more" => "https://www.tusenfryd.no/se-og-gjore/attraksjoner/steampunk-hunters",
                "open" => 1,
                "opening_times" => "Ikke tilgjengelig",
                "sort_order" => 10
            ],
            [
                "name" => "Sommerfuglene",
                "read_more" => "https://www.tusenfryd.no/se-og-gjore/attraksjoner/sommerfuglene",
                "open" => 1,
                "opening_times" => "Ikke tilgjengelig",
                "sort_order" => 10
            ],
            [
                "name" => "Ballongferden",
                "read_more" => "https://www.tusenfryd.no/se-og-gjore/attraksjoner/ballongferden",
                "open" => 1,
                "opening_times" => "Ikke tilgjengelig",
                "sort_order" => 10
            ],
            [
                "name" => "Bestefars Bil",
                "read_more" => "https://www.tusenfryd.no/se-og-gjore/attraksjoner/bestefars-bil",
                "open" => 1,
                "opening_times" => "Ikke tilgjengelig",
                "sort_order" => 10
            ],
            [
                "name" => "Den Aller Minste",
                "read_more" => "https://www.tusenfryd.no/se-og-gjore/attraksjoner/den-aller-minste",
                "open" => 1,
                "opening_times" => "Ikke tilgjengelig",
                "sort_order" => 10
            ],
            [
                "name" => "MC-Hopp",
                "read_more" => "https://www.tusenfryd.no/se-og-gjore/attraksjoner/mc-hopp",
                "open" => 1,
                "opening_times" => "Ikke tilgjengelig",
                "sort_order" => 10
            ],
            [
                "name" => "Små Radiobiler",
                "read_more" => "https://www.tusenfryd.no/se-og-gjore/attraksjoner/sma-radiobiler",
                "open" => 1,
                "opening_times" => "Ikke tilgjengelig",
                "sort_order" => 10
            ],
            [
                "name" => "Badefryd",
                "read_more" => "https://www.tusenfryd.no/se-og-gjore/attraksjoner/badefryd-vart-badeland",
                "open" => 1,
                "opening_times" => "Ikke tilgjengelig",
                "sort_order" => 20
            ],
            [
                "name" => "Finkarusellen",
                "read_more" => "https://www.tusenfryd.no/se-og-gjore/attraksjoner/finkarusellen",
                "open" => 1,
                "opening_times" => "Ikke tilgjengelig",
                "sort_order" => 10
            ],
        ];

        //Loop through and add each attraction
        foreach ($attractions as $attraction) {
            Attraction::create([
                'name' => $attraction['name'],
                'slug' => Str::lower(Str::random(5)) . "-" . Str::of($attraction['name'])->slug('-'),
                'read_more' => $attraction['read_more'],
                'open' => $attraction['open'],
                'opening_times_information' => $attraction['opening_times'],
                'sort_order' => $attraction['sort_order']
            ]);
        }
    }
}
