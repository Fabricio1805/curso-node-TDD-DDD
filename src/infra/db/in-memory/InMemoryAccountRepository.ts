import { AddAccountRepository } from '../../../data/protocols/add-account-repository';
import { AccountModel } from '../../../domain/models/account';
import { AddAccountModel } from '../../../domain/usecases/add-account';

export class InMemoryAccountRepository implements AddAccountRepository {
  private accounts: AccountModel[] = [];

  async add(accountData: AddAccountModel): Promise<AccountModel> {
    const newAccount: AccountModel = {
      id: 'b8fd94ed-202d-4557-9e73-1b9f5edf967c', 
      name: accountData.name,
      email: accountData.email,
      password: accountData.password,
    };

    this.accounts.push(newAccount);

    return newAccount;
  }
}
