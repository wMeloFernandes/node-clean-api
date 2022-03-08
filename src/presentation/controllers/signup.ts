export class SignUpController {
  handle (httpRequest: any): any {
    if (!httpRequest.body.name) {
      return {
        statudCode: 400,
        body: new Error('Missing param: name')
      }
    }

    return {
      statudCode: 400,
      body: new Error('Missing param: email')
    }
  }
}
