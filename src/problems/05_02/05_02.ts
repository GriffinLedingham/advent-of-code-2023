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

// BRUTE FORCE BABY - 10m 45s to run this thing to completion... lol
export const solve05_02 = (input: string) => {
  time("solve05_02");

  const lines = input.split("\n");

  // way too many seeds to map, just keep track of valid seed ID ranges
  const seedIdRanges: number[][] = [];
  const seeds = lines
    .shift()
    ?.replace("seeds: ", "")
    .match(/(\d+\s\d+)/g)
    ?.reduce((acc, seedPair) => {
      const [startNum, len] = seedPair.split(" ");
      seedIdRanges.push([
        parseInt(startNum),
        parseInt(startNum) + parseInt(len),
      ]);
      return [...acc, parseInt(startNum) + parseInt(len)];
    }, [] as number[]);

  if (!seeds) throw new Error(`Could not parse seeds from input: ${input}`);

  // get max seed ID, so we know what to brute force up to
  const maxSeed = Math.max(...seeds);

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

  // build out the ranges of mappings for each set of id's
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
  }

  let lowestLocation = Infinity;

  // Map the seeds to the all other props - BRUTE FORCE BABY
  for (let seed = 0; seed <= maxSeed; seed++) {
    // check if seed is in range of valid seed ID's
    if (!seedIdRanges.find((range) => range[0] <= seed && range[1] >= seed))
      continue;

    const soilData = ranges[MapKeys.seedToSoil].find(
      (map) => map.source[0] <= seed && map.source[1] >= seed
    );
    const soilId = soilData
      ? seed - soilData.source[0] + soilData.dest[0]
      : seed;

    const fertilizerData = ranges[MapKeys.soilToFertilizer].find(
      (map) => map.source[0] <= soilId && map.source[1] >= soilId
    );
    const fertId = fertilizerData
      ? soilId - fertilizerData.source[0] + fertilizerData.dest[0]
      : soilId;

    const waterData = ranges[MapKeys.fertilizerToWater].find(
      (map) => map.source[0] <= fertId && map.source[1] >= fertId
    );
    const waterId = waterData
      ? fertId - waterData.source[0] + waterData.dest[0]
      : fertId;

    const lightData = ranges[MapKeys.waterToLight].find(
      (map) => map.source[0] <= waterId && map.source[1] >= waterId
    );
    const lightId = lightData
      ? waterId - lightData.source[0] + lightData.dest[0]
      : waterId;

    const temperatureData = ranges[MapKeys.lightToTemperature].find(
      (map) => map.source[0] <= lightId && map.source[1] >= lightId
    );
    const tempId = temperatureData
      ? lightId - temperatureData.source[0] + temperatureData.dest[0]
      : lightId;

    const humidityData = ranges[MapKeys.temperatureToHumidity].find(
      (map) => map.source[0] <= tempId && map.source[1] >= tempId
    );
    const humId = humidityData
      ? tempId - humidityData.source[0] + humidityData.dest[0]
      : tempId;

    const locationData = ranges[MapKeys.humidityToLocation].find(
      (map) => map.source[0] <= humId && map.source[1] >= humId
    );
    const locationId = locationData
      ? humId - locationData.source[0] + locationData.dest[0]
      : humId;

    if (locationId < lowestLocation) {
      lowestLocation = locationId;
    }
  }

  timeEnd("solve05_02");

  return lowestLocation;
};
