import { Component, OnInit } from '@angular/core';
import { SerieDetailResponse } from '../../interfaces/serie-detail.interface';
import { TVShowService } from '../../services/tvshow.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-serie-details',
  templateUrl: './serie-details.component.html',
  styleUrl: './serie-details.component.css'
})
export class SerieDetailsComponent implements OnInit{

  serieId: string | null = '';
  serie: SerieDetailResponse | undefined;

  constructor(
    private serieService: TVShowService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.serieId = this.activatedRoute.snapshot.paramMap.get('id');

    this.serieService.getSerieById(parseInt(this.serieId!)).subscribe((response) => {
      this.serie = response;

    });
  }

}
