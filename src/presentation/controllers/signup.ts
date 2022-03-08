export class SignUpController {
  handle (httpRequest: any): any {
    return {
      statudCode: 400,
      body: new Error('Missing param: name')
    }
  }
}
