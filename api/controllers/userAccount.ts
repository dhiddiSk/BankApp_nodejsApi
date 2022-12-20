import { v4 as uuidv4 } from 'uuid'

const userAccountNumberGeneration = function (): string {
  const userAccountUUID = uuidv4()
  return userAccountUUID
}

export { userAccountNumberGeneration }
