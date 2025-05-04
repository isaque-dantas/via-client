import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {baseApiUrl} from '../app.config';
import {Reports} from '../interfaces/reports';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {
  http = inject(HttpClient)

  get() {
    return this.http.get<Reports>(`${baseApiUrl}/reports`)
  }
}
