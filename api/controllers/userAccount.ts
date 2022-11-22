import { v4 as uuidv4 } from 'uuid'

const userAccountNumberGeneration = function (): string {
  const userAccounUUID = uuidv4()
  return userAccounUUID
}

export { userAccountNumberGeneration }
