import { Component, AfterViewInit } from '@angular/core';
// import * as L from 'leaflet';
import { MapService } from 'src/app/core/services/map.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html'
})
export class MapComponent implements AfterViewInit {
  // map!: L.Map;
  // from: any; to: any;
  // polyline: any;

  // constructor(private mapService: MapService) { }

  ngAfterViewInit() {
    // this.map = L.map('map').setView([12.97, 77.59], 12);
    // L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(this.map);
  }

  search(query: string, type: 'from' | 'to') {
    // this.mapService.geocode(query).subscribe((res: any) => {
    //   if (res.length) {
    //     const lat = +res[0].lat, lon = +res[0].lon;
    //     const marker = L.marker([lat, lon]).addTo(this.map);
    //     if (type === 'from') this.from = { lat, lon }; else this.to = { lat, lon };
    //     if (this.from && this.to) this.drawRoute();
    //   }
    // });
  }

  // drawRoute() {
  //   this.mapService.route([this.from.lon, this.from.lat], [this.to.lon, this.to.lat])
  //     .subscribe((res: any) => {
  //       const coords = res.routes[0].geometry.coordinates.map((c: any) => [c[1], c[0]]);
  //       if (this.polyline) this.map.removeLayer(this.polyline);
  //       this.polyline = L.polyline(coords, { color: 'blue' }).addTo(this.map);
  //       this.map.fitBounds(this.polyline.getBounds());
  //     });
  // }
}
