import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, switchMap } from 'rxjs';
import { WeatherService } from 'src/app/core/services/weather.service';
@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html'
})
export class WeatherComponent implements OnInit {
  city = new FormControl('Bengaluru');
  current: any;
  forecast: any[] = [];
  loading = false;
  error: string | null = null;

  constructor(private weather: WeatherService) { }

  ngOnInit() {
    this.city.valueChanges.pipe(
      debounceTime(500),
      switchMap(val => { this.loading = true; return this.weather.getByCity(val); })
    ).subscribe({
      next: res => { this.loading = false; this.current = res.current; this.forecast = res.forecast; },
      error: () => { this.loading = false; this.error = 'Failed to load'; }
    });

    this.weather.getByCity('Bengaluru').subscribe(res => {
      this.current = res.current; this.forecast = res.forecast;
    });
  }
}
