import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { map, switchMap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class WeatherService {
  constructor(private http: HttpClient) { }

  // Get current weather + 7-day forecast by city name
  getByCity(city: string) {
    return this.http.get<any>(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${environment.openWeatherKey}`
    ).pipe(
      switchMap((current: any) =>
        this.http.get<any>(
          `https://api.openweathermap.org/data/2.5/onecall?lat=${current.coord.lat}&lon=${current.coord.lon}&exclude=minutely,hourly&units=metric&appid=${environment.openWeatherKey}`
        ).pipe(
          map((forecast: any) => ({
            current: { city: city, temp: current.main.temp },
            forecast: forecast.daily.slice(0, 7).map((d: any, i: number) => ({
              day: `Day ${i + 1}`,
              temp: d.temp.day
            }))
          }))
        )
      )
    );
  }
}
