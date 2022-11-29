import * as jsonwt from 'jsonwebtoken'
import { jwtTokenPayloadType } from '../services/typeServices'

const jwtTokenGen = function (payload: jwtTokenPayloadType) {
    const token = jsonwt.sign(payload, process.env.passportSecretCode!, { expiresIn: 3600 })
    return token
  }

export {jwtTokenGen}
