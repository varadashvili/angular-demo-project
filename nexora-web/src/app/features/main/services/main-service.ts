import {inject, Service, signal} from '@angular/core';
import {IPartnerInfo} from '../interfaces/IPartnerInfo';
import {ErrorService} from '../../../shared/services/error-service';
import {SpinnerService} from '../../../shared/components/spinner/spinner-service';
import {ContentApiService} from '../../../infrastructure/ContentApiService';

@Service()
export class MainService  {
  private apiService = inject(ContentApiService);
  private errorService = inject(ErrorService);
  private spinnerService = inject(SpinnerService);

  public partners = signal<IPartnerInfo[]>([]);

  public getPartners() {
    this.spinnerService.$spinnerStatusPublisher.next(true);

    this.apiService.getPartners().subscribe({
      next: (partners) => {
        this.partners.set(partners);
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
