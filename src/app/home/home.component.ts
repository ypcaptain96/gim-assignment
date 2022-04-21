import { Component, OnInit, ViewChild } from '@angular/core';
import { MapInfoWindow, MapMarker } from '@angular/google-maps';

import { TruckResponse } from '../shared/interfaces/trucks.interface';
import { AppService } from '../shared/services/app.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @ViewChild(MapInfoWindow) infoWindow?: MapInfoWindow;

  center: google.maps.LatLngLiteral = { lat: 28.7041, lng: 77.1025 };
  zoom: number = 7;
  markerOptions: google.maps.MarkerOptions = { draggable: false };
  markerPositions: any = [];

  constructor(private appService: AppService) { }

  ngOnInit(): void {
    this.appService.getTruckStands().subscribe((response: TruckResponse) => {
      console.log(response);
      this.markerPositions = response.data.filter(res => res.latitude != null && res.longitude != null).map((result) => {
        return {
          position: { lat: result.latitude, lng: result.longitude },
          text: result.name
        }
      });
    });
  }

  openInfoWindow(marker: MapMarker) {
    this.infoWindow?.open(marker);
  }

}
