import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MapInfoWindow, MapMarker } from '@angular/google-maps';
import { Subject, takeUntil } from 'rxjs';

import { TruckData, TruckMarker } from '../../shared/interfaces/trucks.interface';
import { AppService } from '../../shared/services/app.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  @ViewChild(MapInfoWindow) infoWindow?: MapInfoWindow;
  private destroyed$ = new Subject<boolean>();

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

  clusterStyles = Array(5).fill(this.clusterStyleOption); // 5 different sizes of clustering is possible within google maps.

  constructor(private appService: AppService) { }

  ngOnInit(): void {
    this.appService.getTruckStands()
      .pipe(takeUntil(this.destroyed$))
      .subscribe({
        next: (response: TruckData[]) => {
          this.markerPositions = response
            .map((result: TruckData) => {
              return {
                position: { lat: result.latitude, lng: result.longitude },
                text: result.name,
                label: {  // Adds default label with 1 marked on it to detonate only a single address is present
                  text: '1',
                  fontWeight: '600',
                  fontSize: '12',
                  color: 'white',
                },
              }
            });
          this.appService.isLoading.next(false);
        },
        error: (error) => {
          console.error(error);
        }
      }
      );

  }

  openInfoWindow(marker: MapMarker) {
    this.infoWindow?.open(marker);
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

}
