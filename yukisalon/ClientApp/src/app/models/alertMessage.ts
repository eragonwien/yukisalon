export class AlertMessage {
  type: string;
  message: string;
  timeout?: number;
  dismissible: boolean;
  header?: string;

  constructor(type: string, message: string, timeout: number = 10000, header?: string, dismissible: boolean = true) {
    this.type = type;
    this.message = message;
    this.timeout = timeout;
    this.header = header;
    this.dismissible = dismissible;
  }
  
}