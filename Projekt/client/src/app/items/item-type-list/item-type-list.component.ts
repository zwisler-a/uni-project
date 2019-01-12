import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AutoUnsubscribe } from 'src/app/util/autounsubscribe.decorator';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-item-type-list',
  templateUrl: './item-type-list.component.html',
  styleUrls: ['./item-type-list.component.scss']
})
@AutoUnsubscribe()
export class ItemTypeListComponent implements OnInit {
  paramsSub: any;
  page = 0;
  perPage = 0;
  types: { id: number; name: string }[];

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit() {
    this.paramsSub = this.route.params.subscribe(params => {
      this.page = params['page'];
      this.perPage = params['perPage'];
    });
    this.http.get('api/types').subscribe((res: any) => {
      this.types = res;
    });
  }
}
