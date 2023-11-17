import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PredectiveModuleService {

  constructor(){
    let predective =  localStorage.getItem('predective')
    if(predective==null || predective ==undefined){


    localStorage.setItem('predective','false')
    }
  }

  private enterPredectiveModule() {
    
    localStorage.setItem('predective','true')
  }

  private exitPredectiveModule() {

    localStorage.setItem('predective','false')
  }

  public changeModule() {
    let predective = localStorage.getItem('predective')
    if (predective=='true') {
      this.exitPredectiveModule();
    } else {
      this.enterPredectiveModule();
    }
  }

  public getUrl() {
    let predective = localStorage.getItem('predective')
    if(predective=='true'){
      return 'http://localhost:8000/api/v1/test'
    }
    return 'http://localhost:8000/api/v1/'
  }

  public getColorTheme() {
    let predective = localStorage.getItem('predective')
    if(predective=='true'){

      return 'predectible-theme'
    }
    return ''
  }
}