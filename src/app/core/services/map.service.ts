import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class MapService {
  constructor(private http: HttpClient) { }

  geocode(query: string) {
    const headers = new HttpHeaders().set('User-Agent', 'simbiotik-angular-test/1.0');
    return this.http.get(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`,
      { headers }
    );
  }

  route(start: [number, number], end: [number, number]) {
    const url = `https://router.project-osrm.org/route/v1/driving/${start[0]},${start[1]};${end[0]},${end[1]}?overview=full&geometries=geojson`;
    return this.http.get(url);
  }
}
