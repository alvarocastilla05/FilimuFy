import { Component, Input, OnInit } from '@angular/core';
import { SerieDetailResponse } from '../../interfaces/serie-detail.interface';
import { TVShowService } from '../../services/tvshow.service';

@Component({
  selector: 'app-serie-card',
  templateUrl: './serie-card.component.html',
  styleUrl: './serie-card.component.css'
})
export class SerieCardComponent implements OnInit{

  @Input() serieId: number | undefined;
  serieDetalle: SerieDetailResponse | undefined;

  constructor(private tvShowService: TVShowService) { }

  ngOnInit(): void {
    this.tvShowService.getSerieById(this.serieId!).subscribe(resp => {
      this.serieDetalle = resp;
    });
  }
}
