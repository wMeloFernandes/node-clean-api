import { HttpRequest, HttpReponse } from './http'

export interface Controller {
  handle: (httpRequest: HttpRequest) => Promise<HttpReponse>
}
