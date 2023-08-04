import { AccountModel } from '../../../domain/models/account';
import { AddAccount, AddAccountModel } from '../../../domain/usecases/add-account';

export class DbAddAccount implements AddAccount {
  add(account: AddAccountModel): Promise<AccountModel> {
    
  }
  
}