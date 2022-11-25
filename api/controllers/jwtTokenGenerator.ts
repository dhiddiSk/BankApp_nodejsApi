import * as jsonwt from 'jsonwebtoken'

const jwtTokenGen = function (payload) {
    const token = jsonwt.sign(payload, process.env.passportSecretCode!, { expiresIn: 3600 })
    return token
  }

export {jwtTokenGen}
