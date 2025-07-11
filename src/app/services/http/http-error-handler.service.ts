import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class HttpErrorHandlerService {
  constructor(private snackBar: MatSnackBar) {}

  /**
   * Handle http error
   *
   * @param error
   *
   * @returns
   *
   * @remarks
   * Method for handling both client-side and server-side errors
   * Messages are displayed in the snackbar
   *
   * @beta
   */
  handleHttpError(error: HttpErrorResponse) {
    let errorMessage = 'An error has occurred.';
    if (error.error instanceof ErrorEvent) {
      //client-side error
      errorMessage =
        'Oops! There was an issue with your request. Please try again later.';
    } else {
      //server-side error
      errorMessage =
        'Sorry, this request cannot be processed. The service might be currenlty unavailable. Please try again later.';
    }

    this.openSnackBar(errorMessage, '');
  }

  private openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 5000,
      panelClass: 'error-snackbar',
    });
  }
}
