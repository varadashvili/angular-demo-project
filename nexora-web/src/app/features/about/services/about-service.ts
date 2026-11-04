import {inject, Service, signal} from '@angular/core';
import {ContentApiService} from '../../../infrastructure/ContentApiService';
import {ErrorService} from '../../../shared/services/error-service';
import {SpinnerService} from '../../../shared/components/spinner/spinner-service';
import {IMission} from '../interfaces/IMission';
import {IFounder} from '../interfaces/IFounder';

@Service()
export class AboutService {
  private apiService = inject(ContentApiService);
  private errorService = inject(ErrorService);
  private spinnerService = inject(SpinnerService);

  public missions = signal<IMission[]>([]);
  public founders = signal<IFounder[]>([]);

  public getMissions() {
    this.spinnerService.$spinnerStatusPublisher.next(true);

    this.apiService.getMissions().subscribe({
      next: (missions) => {
        this.missions.set(missions);
      },
      error: (error) => {
        this.errorService.displayErrorMessage(error);
      },
      complete: () => {
        this.spinnerService.$spinnerStatusPublisher.next(false);
      }
    });
  }

  public getFounders(){
    this.spinnerService.$spinnerStatusPublisher.next(true);

    this.apiService.getFounders().subscribe({
      next: (founders) => {
        this.founders.set(founders);
      },
      error: (error) => {
        this.errorService.displayErrorMessage(error);
      },
      complete: () => {
        this.spinnerService.$spinnerStatusPublisher.next(false);
      }
    });
  }
}
