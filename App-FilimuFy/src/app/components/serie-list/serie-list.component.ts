import { Component, OnInit } from '@angular/core';
import { TVShow } from '../../interfaces/tv.interface';
import { TVShowService } from '../../services/tvshow.service';

@Component({
  selector: 'app-serie-list',
  templateUrl: './serie-list.component.html',
  styleUrl: './serie-list.component.css'
})
export class SerieListComponent implements OnInit{

  listaSeries: TVShow[] = [];

  constructor(private tvShowService: TVShowService) { }
  
  ngOnInit(): void {
    this.tvShowService.getSeries()
      .subscribe(resp => {
        this.listaSeries = resp.results;
      });
  }
}
