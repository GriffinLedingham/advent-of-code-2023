import { time, timeEnd } from "../../utils/time";

type SeedData = {
  id: number;
  soil: number;
  fertilizer: number;
  water: number;
  light: number;
  temperature: number;
  humidity: number;
  location: number;
};

enum MapKeys {
  "seedToSoil" = "seedToSoil",
  "soilToFertilizer" = "soilToFertilizer",
  "fertilizerToWater" = "fertilizerToWater",
  "waterToLight" = "waterToLight",
  "lightToTemperature" = "lightToTemperature",
  "temperatureToHumidity" = "temperatureToHumidity",
  "humidityToLocation" = "humidityToLocation",
}

const RawMapKeysLookup: Record<string, MapKeys> = {
  "seed-to-soil map:": MapKeys.seedToSoil,
  "soil-to-fertilizer map:": MapKeys.soilToFertilizer,
  "fertilizer-to-water map:": MapKeys.fertilizerToWater,
  "water-to-light map:": MapKeys.waterToLight,
  "light-to-temperature map:": MapKeys.lightToTemperature,
  "temperature-to-humidity map:": MapKeys.temperatureToHumidity,
  "humidity-to-location map:": MapKeys.humidityToLocation,
};

export const solve05_01 = (input: string) => {
  time("solve05_01");

  const lines = input.split("\n");

  const seeds = lines.shift()?.replace("seeds: ", "").split(" ").map(Number);

  if (!seeds) throw new Error(`Could not parse seeds from input: ${input}`);

  const ranges: Record<
    MapKeys,
    [{ source: [number, number]; dest: [number, number] }]
  > = {
    [MapKeys.seedToSoil]: [],
    [MapKeys.soilToFertilizer]: [],
    [MapKeys.fertilizerToWater]: [],
    [MapKeys.waterToLight]: [],
    [MapKeys.lightToTemperature]: [],
    [MapKeys.temperatureToHumidity]: [],
    [MapKeys.humidityToLocation]: [],
  } as any;

  const seedData: Record<number, SeedData> = seeds.reduce((acc, seed) => {
    acc[seed] = {
      id: seed,
      soil: null,
      fertilizer: null,
      water: null,
      light: null,
      temperature: null,
      humidity: null,
      location: null,
    };

    return acc;
  }, {} as any);

  let currHashKey: MapKeys = null as unknown as MapKeys;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (!line.length) {
      currHashKey = RawMapKeysLookup[lines[i + 1]];
      i++;
      continue;
    }

    const [startIndexDest, startIndexSource, numItems] = line.split(" ");

    if (!currHashKey)
      throw new Error(`Could not find currHashKey for line: ${line}`);

    ranges[currHashKey].push({
      source: [
        parseInt(startIndexSource),
        parseInt(startIndexSource) + parseInt(numItems) - 1,
      ],
      dest: [
        parseInt(startIndexDest),
        parseInt(startIndexDest) + parseInt(numItems) - 1,
      ],
    });

    // Map the seeds to the all other props
    for (let seed of Object.values(seedData)) {
      const soilData = ranges[MapKeys.seedToSoil].find(
        (map) => map.source[0] <= seed.id && map.source[1] >= seed.id
      );
      seed.soil = soilData
        ? (seed.soil = seed.id - soilData.source[0] + soilData.dest[0])
        : seed.id;

      const fertilizerData = ranges[MapKeys.soilToFertilizer].find(
        (map) => map.source[0] <= seed.soil && map.source[1] >= seed.soil
      );
      seed.fertilizer = fertilizerData
        ? (seed.fertilizer =
            seed.soil - fertilizerData.source[0] + fertilizerData.dest[0])
        : seed.soil;

      const waterData = ranges[MapKeys.fertilizerToWater].find(
        (map) =>
          map.source[0] <= seed.fertilizer && map.source[1] >= seed.fertilizer
      );
      seed.water = waterData
        ? (seed.water =
            seed.fertilizer - waterData.source[0] + waterData.dest[0])
        : seed.fertilizer;

      const lightData = ranges[MapKeys.waterToLight].find(
        (map) => map.source[0] <= seed.water && map.source[1] >= seed.water
      );
      seed.light = lightData
        ? (seed.light = seed.water - lightData.source[0] + lightData.dest[0])
        : seed.water;

      const temperatureData = ranges[MapKeys.lightToTemperature].find(
        (map) => map.source[0] <= seed.light && map.source[1] >= seed.light
      );
      seed.temperature = temperatureData
        ? (seed.temperature =
            seed.light - temperatureData.source[0] + temperatureData.dest[0])
        : seed.light;

      const humidityData = ranges[MapKeys.temperatureToHumidity].find(
        (map) =>
          map.source[0] <= seed.temperature && map.source[1] >= seed.temperature
      );
      seed.humidity = humidityData
        ? (seed.humidity =
            seed.temperature - humidityData.source[0] + humidityData.dest[0])
        : seed.temperature;

      const locationData = ranges[MapKeys.humidityToLocation].find(
        (map) =>
          map.source[0] <= seed.humidity && map.source[1] >= seed.humidity
      );
      seed.location = locationData
        ? (seed.location =
            seed.humidity - locationData.source[0] + locationData.dest[0])
        : seed.humidity;
    }
  }

  // Get the lowest location of the initial seeds
  const lowestLocation = Math.min(
    ...Object.values(seedData).map((seed) => seed.location)
  );

  timeEnd("solve05_01");

  return lowestLocation;
};
