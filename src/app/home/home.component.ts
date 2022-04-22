import { Component, OnInit, ViewChild } from '@angular/core';
import { MapInfoWindow, MapMarker } from '@angular/google-maps';

import { TruckData, TruckMarker, TruckResponse } from '../shared/interfaces/trucks.interface';
import { AppService } from '../shared/services/app.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @ViewChild(MapInfoWindow) infoWindow?: MapInfoWindow;

  center: google.maps.LatLngLiteral = { lat: 23.8423489, lng: 90.3590594 };
  zoom: number = 7;
  markerOptions: google.maps.MarkerOptions = { draggable: false, optimized: true };
  markerPositions: TruckMarker[] = [];
  clusterStyleOption = {
    url: 'assets/mapIcon.png',
    height: 53,
    width: 53,
    anchorText: [9, -13],
    fontWeight: '600',
    textSize: 12,
    textColor: 'white',
  };

  clusterStyles = Array(5).fill(this.clusterStyleOption);

  constructor(private appService: AppService) { }

  ngOnInit(): void {
    this.appService.getTruckStands().subscribe((response: TruckResponse) => {
      this.markerPositions = response.data.filter((res: TruckData) => res.latitude != null && res.longitude != null)
        .map((result: TruckData) => {
          return {
            position: { lat: result.latitude, lng: result.longitude },
            text: result.name,
            label: {
              text: '1',
              fontWeight: '600',
              fontSize: '12',
              color: 'white',
            },
          }
        });
    });
  }

  openInfoWindow(marker: MapMarker) {
    this.infoWindow?.open(marker);
  }

}
