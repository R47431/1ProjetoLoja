import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidacoesService {


  constructor() { }

  isCampoInvalido(campoFormControl: FormControl): boolean {
    return campoFormControl.invalid && campoFormControl.touched;
  }

  isCampoNumerico(campoFormControl: FormControl): boolean {
    const valorCampo = campoFormControl.value;
    return campoFormControl.invalid && campoFormControl.touched && !/^\d+$/.test(valorCampo);
  }
}
