import { UserReg } from '../models/userInfo'
import * as bcrypt from 'bcrypt'

const userRegistration = async function (req, res) {
  const newUser = new UserReg({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    userName: req.body.userName
  })
  const salt = await bcrypt.genSalt(10)
  const hashpassword = await bcrypt.hash(newUser.password, salt)
  newUser.password = hashpassword
  const userSignup = await newUser.save()

  const payloadForJwt = {
    id: userSignup.id,
    name: userSignup.name,
    email: userSignup.email
  }

  const jwtToken = await jwtTokenGen(payloadForJwt)
  res.status(200).json({
    success: true,
    token: jwtToken
  })
}

// const userLogin = function (req, res) {
//   const password = req.body.password
//   const email = req.body.email
//   UserReg
//     .findOne({ email })
//     .then((user) => {
//       if (user) {
//         bcrypt
//           .compare(password, user.password)
//           .then((correctPassword) => {
//             if (!correctPassword) {
//               return res.status(401).json({ message: 'User login failure' })
//             }

//             const payload = {
//               id: user.id,
//               name: user.name,
//               email: user.email
//             }

//             // Generate jwt token and send it back to client
//             jsonwt.sign(payload, secret, { expiresIn: 3600 }, (_err, token) => {
//               res.json({
//                 success: true,
//                 token
//               })
//             })
//           })
//           .catch((error) => {
//             console.log(`Error with passwords: ${error}`)
//           })
//       } else {
//         return res.status(404).json({ message: "Email doesn't exists" })
//       }
//     })
//     .catch((error) => {
//       console.log(`Error while userLogin: ${error}`)
//     })
// }

export { userRegistration }//, userLogin }
