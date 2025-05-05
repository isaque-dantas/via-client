import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {baseApiUrl} from '../app.config';
import {VowelReadingResult} from '../interfaces/vowel-reading-result';

@Injectable({
  providedIn: 'root'
})
export class VowelReaderService {
  http = inject(HttpClient)

  post(value: string | null) {
    return this.http.post<VowelReadingResult>(`${baseApiUrl}/vowel_reader`, {string: value})
  }
}
