import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SpinnerService } from './spinner.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {
  color = 'warn';
  isLoading: BehaviorSubject<boolean> = this.spinnerService.isLoading;
  
  constructor(private spinnerService: SpinnerService) {

  }

  ngOnInit(): void {
  }

}
