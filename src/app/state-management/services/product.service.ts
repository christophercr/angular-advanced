import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of, throwError, timer} from 'rxjs';
import {catchError, map, mergeMap, retryWhen} from 'rxjs/operators';
import {Product} from '../entities/product.intf';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = 'http://localhost:5000';
  private retryCount = 3;
  private retryDelay = 2000;

  constructor(private http: HttpClient) {
  }

  getProducts(): Observable<Product[]> {
    const targetUrl = this.baseUrl + '/products/';

    return this.http.get(targetUrl).pipe(
      map((response: Product[]) => {
        return response;
      }),
      retryWhen((errors: Observable<any>) => {
        let retries = 0;
        return errors.pipe(
          mergeMap((error) => {
            if (retries < this.retryCount) {
              retries++;
              return timer(this.retryDelay);
            } else {
              return throwError(error);
            }
          })
        );
      }),
      catchError((error) => {
        console.warn('Http call failed:' + targetUrl + ' Error: ' + error);
        return of([]); // return an empty array instead of an error
      })
    );
  }

  getProductDetails(id): Observable<object> {
    const targetUrl = this.baseUrl + '/product-details/' + id;

    return this.http.get(targetUrl).pipe(
      map((response: { id: string, details: string[] }) => {
        return response.details;
      }),
      retryWhen((errors: Observable<any>) => {
        let retries = 0;
        return errors.pipe(
          mergeMap((error) => {
            if (retries < this.retryCount) {
              retries++;
              return timer(this.retryDelay);
            } else {
              return throwError(error);
            }
          })
        );
      }),
      catchError((error) => {
        console.warn('Http call failed:' + targetUrl + ' Error: ' + error);
        return of([]); // return an empty array instead of an error
      })
    );
  }
}
