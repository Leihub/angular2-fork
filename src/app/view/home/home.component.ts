import { Http } from '@angular/http';
import { Component, OnInit } from '@angular/core';
import { HeroService } from '../../service/hero.service';
import { StorageService } from '../../service/storage.service';
import { ApiService } from '../../service/api.service';

@Component({
  selector: 'app-home-component',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less'],
  providers: [HeroService, StorageService, ApiService]
})
export class HomeComponent implements OnInit {
  appInfo;
  res;
  constructor(
    private HeroService: HeroService,
    private http: Http,
    private storage: StorageService,
    private api: ApiService
  ) { };
  testGet(): Promise<any> {
    return this.http.get('/api/app/info/11?sign=beb790d872f5b20202c7d4e98119c54d&timeout=5000')
      .toPromise()
      .then(res => {
        return res.json();
      });
  };
  ngOnInit() {
    this.appInfo = [];
    this.api.ajax({
      method: 'get',
      url: '/api/app/info/11',
      options: {
        timeout: 5000,
        sign: 'beb790d872f5b20202c7d4e98119c54d'
      }
    });
    // this.testGet()
    //   .then(res => {
    //     if (res.success) {
    //       for (const key in res.content) {
    //         if (res.content.hasOwnProperty(key)) {
    //           this.appInfo.push(res.content[key]);
    //         }
    //       }
    //       this.storage.put({
    //         type: 'local',
    //         key: 'appinfo',
    //         data: res.content
    //       });
    //     }
    //   });

  }

}
