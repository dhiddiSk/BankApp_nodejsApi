import {v4 as uuidv4} from 'uuid';

const userAccountNumberGeneration = function(){
    let userAccounUUID = uuidv4();
    return  userAccounUUID;
}