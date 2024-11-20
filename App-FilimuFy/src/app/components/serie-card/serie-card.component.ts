import { Component, Input, OnInit } from '@angular/core';
import { SerieDetailResponse } from '../../interfaces/serie-detail.interface';
import { TVShowService } from '../../services/tvshow.service';
import { Pais } from '../../interfaces/contentRatingsCertifications.interfaces';

@Component({
  selector: 'app-serie-card',
  templateUrl: './serie-card.component.html',
  styleUrl: './serie-card.component.css'
})
export class SerieCardComponent implements OnInit{

  @Input() serieId: number | undefined;
  serieDetalle: SerieDetailResponse | undefined;
  paisesList: Pais[] = [];
  imgPlaceholderPelSer = 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/800px-No-Image-Placeholder.svg.png';

  constructor(private tvShowService: TVShowService) { }

  ngOnInit(): void {
    this.tvShowService.getSerieById(this.serieId!).subscribe(resp => {
      this.serieDetalle = resp;
    });

    this.tvShowService.getCertificationById(this.serieId!).subscribe(resp => {
      this.paisesList = resp.results;
    });
  }

  getCertification() {
    let esp;

    if (this.paisesList.find(pais => pais.iso_3166_1 === 'ES')) {
      esp = this.paisesList.find(pais => pais.iso_3166_1 === 'ES');
      return '+'+esp!.rating;
    } else {
      return 'N/A';
    }
  }

}
