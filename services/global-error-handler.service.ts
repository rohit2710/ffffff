
import { ErrorHandler, Inject, Injectable, Injector, NgZone } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
 
@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
    // constructor() { }
 
    // handleError(error: Error) {
    //  console.log(this);
     
    //     alert(error)    //need to display to end users
    // }

    
    constructor(@Inject(Injector) private readonly injector: Injector) {}

    handleError(error) {
        console.log(error);
        this.toastrService.error(error.errorMessage, null, { onActivateTick: true })
    }

    /**
     * Need to get ToastrService from injector rather than constructor injection to avoid cyclic dependency error
     * @returns {} 
     */
    private get toastrService(): ToastrService {
        return this.injector.get(ToastrService);
    }
}