import {EventEmitter, Injectable} from '@angular/core';
import {Alert} from '../interfaces/alert';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  alertCreatedEmitter = new EventEmitter<Alert>()
  alertRemovedEmitter = new EventEmitter<number>()
  private maxAlertId = 1
  private timeForAutoRemovingAlertInMs = 7500

  subscribe(fn: (alert: Alert) => any) {
    this.alertCreatedEmitter.subscribe(fn)
  }

  remove(id: number) {
    this.alertRemovedEmitter.emit(id)
  }

  private sendAlert(alert: Alert): Alert {
    alert = {...alert, id: this.maxAlertId++}
    this.alertCreatedEmitter.emit(alert)

    setTimeout(
      ()=> this.alertRemovedEmitter.emit(alert.id),
      this.timeForAutoRemovingAlertInMs
    )

    return alert
  }

  error(message: string): Alert {
    const alert: Alert = {body: message, type: "error"}
    return this.sendAlert(alert)
  }

  success(message: string): Alert {
    const alert: Alert = {body: message, type: "success"}
    return this.sendAlert(alert)
  }

  info(message: string): Alert {
    const alert: Alert = {body: message, type: "info"}
    return this.sendAlert(alert)
  }

  warning(message: string): Alert {
    const alert: Alert = {body: message, type: "warning"}
    return this.sendAlert(alert)
  }
}
