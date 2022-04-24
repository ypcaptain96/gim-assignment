import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/shared/services/app.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit {
  loading: boolean = false;

  constructor(private appService: AppService) {
    this.appService.isLoading.subscribe((res: boolean) => {
      this.loading = res;
    });
  }

  ngOnInit() {
  }

}
