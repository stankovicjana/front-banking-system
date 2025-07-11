import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiCallService {
  private apiUrl: string = '';

  constructor(private http: HttpClient) {}

  /**
   * GET request
   *
   * @param path
   *
   * @returns Observable
   *
   * @remarks
   * Sends GET request to API
   *
   * @beta
   */
  get(path: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${path}`);
  }

  /**
   * GET request
   *
   * @param path
   * @param id
   *
   * @returns Observable
   *
   * @remarks
   * Sends GET request to API with additional id parameter
   *
   * @beta
   */
  getById(path: string, id: any): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${path}/${id}`);
  }

  /**
   * GET request
   *
   * @param path
   * @param paramKey
   * @param param
   *
   * @returns Observable
   *
   * @remarks
   * Sends GET request to API with additional query parameters
   *
   * @beta
   */
  getObjectQuery(path: string, paramKey: string, param: any): Observable<any> {
    const params = new HttpParams().set(paramKey, param);
    return this.http.get<any>(`${this.apiUrl}/${path}`, { params });
  }

  /**
   * GET request
   *
   * @param path
   *
   * @returns Observable
   *
   * @remarks
   * Sends GET request to API in order to retrieve single json object
   *
   * @beta
   */
  getObject(path: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${path}`);
  }

  /**
   * POST request
   *
   * @param path
   * @param data
   *
   * @returns Observable
   *
   * @remarks
   * Sends POST request to API
   *
   * @beta
   */
  create(path: string, data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${path}`, data);
  }

  /**
   * PUT request
   *
   * @param path
   * @param data
   * @param id
   *
   * @returns Observable
   *
   * @remarks
   * Sends PUT request to API
   *
   * @beta
   */
  update(path: string, id: number, data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${path}/${id}`, data);
  }

  /**
   * DELETE request
   *
   * @param path
   * @param id
   *
   * @returns any
   *
   * @remarks
   * Sends DELETE request to API
   *
   * @beta
   */
  delete(path: string, id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${path}/${id}`);
  }
}
