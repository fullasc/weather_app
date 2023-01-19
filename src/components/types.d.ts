export type LocationType = {
  id: string
  state: string | string[]
  city: string | string[]
  coords: {
    lat: LocationQueryValue | LocationQueryValue[]
    lng: LocationQueryValue | LocationQueryValue[]
  }
  weather?: {
    main: wdata
    description: string
    icon: string
  }
}

export type MapboxFeature = {
  id: string
  place_type: string
  place_name: string
  text: string
  geometry: {
    coordinates: number[]
  }
}

export type MapboxGeocodeResponse = {
  features: MapboxFeature[]
}

type wdata = {
  clouds: number
  currentTime: number
  dew_point: number
  dt: number
  feels_like: number
  humidity: number
  pop: number
  pressure: number
  sunrise: number
  sunset: number
  temp: number
  uvi: number
  visibility: number
  wind_deg: number
  wind_gust: number
  wind_speed: number
  temp_max: number
  temp_min: number
  weather: {
    description: string
    icon: string
    id: number
  }[]
}

export type WeatherData = {
  daily: any[]
  hourly: wdata[]
  lat: number
  lon: number
  minutely: any[]
  timezone: string
  timezone_offset: number
  currentTime: number
  current: wdata
}
