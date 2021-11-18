import { BodyComponent } from './components/home/body/body.component';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { Movies } from './models/movies';
import { MovieService } from './services/movie.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy{
  sticky = false;
  subs: Subscription[] = [];
  @ViewChild(BodyComponent) trending!: Movies;
  @ViewChild(BodyComponent) popular!: Movies;
  @ViewChild(BodyComponent) topRated!: Movies;
  @ViewChild(BodyComponent) originals!: Movies;
  @ViewChild(BodyComponent) nowPlaying!: Movies;
  
  title: String = "Netflix";

  sliderConfig = {
    slidesToShow: 9,
    slidesToScroll: 2,
    arrows: true,
    autoplay: false,
  };

  @ViewChild('stickHeader') header!: ElementRef;

  constructor(
    private movie: MovieService
    ){
      
  }

  ngOnInit(): void {
    this.subs.push(this.movie.getTrending().subscribe(data => {
      this.trending = data;
      //this.headerBGUrl = 'https://image.tmdb.org/t/p/original' + this.bodyComponent.trending.results[0].backdrop_path;
    }));
    this.subs.push(this.movie.getPopularMovies().subscribe(data => this.popular = data));
    this.subs.push(this.movie.getTopRated().subscribe(data => this.topRated = data));
    this.subs.push(this.movie.getOriginals().subscribe(data => this.originals = data));
    this.subs.push(this.movie.getNowPlaying().subscribe(data => this  .nowPlaying = data));
  }

  ngOnDestroy(): void{
    this.subs.map(s => s.unsubscribe())
  }
}

