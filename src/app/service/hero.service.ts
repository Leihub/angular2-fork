import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Hero } from '../class/hero';

@Injectable()
export class HeroService {
  private heroesUrl = 'http://appbuilder.doboyu.com/api/app/info/11?sign=beb790d872f5b20202c7d4e98119c54d&timeout=5000';  // URL to web api
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
  
  constructor(private http: Http) { }

  getHeroes(): Promise<Hero[]> {
    return this.http.get(this.heroesUrl)
            .toPromise()
            .then(response => response.json().data as Hero[])
            .catch(this.handleError);
  };
  getHeroesSlowly(): Promise<Hero[]> {
    return new Promise<Hero[]>(resolve =>
      setTimeout(resolve, 1000)
    ) // delay 2 seconds
    .then(() => this.getHeroes());
  };
  getHero(id: number): Promise<Hero>{
    return this.getHeroes()
    .then(heroes => heroes.find(hero => hero.id === id));
  }
}