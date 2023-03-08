// @ts-nocheck
/**
 * This file was automatically generated by @cosmwasm/ts-codegen@0.24.0.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run the @cosmwasm/ts-codegen generate command to regenerate this file.
 */

export type HealthContractBaseForString = string
export type Decimal = string
export type Uint128 = string
export type OracleBaseForString = string
export type RedBankBaseForString = string
export type SwapperBaseForString = string
export type ZapperBaseForString = string
export interface InstantiateMsg {
  allowed_coins: string[]
  health_contract: HealthContractBaseForString
  max_close_factor: Decimal
  max_unlocking_positions: Uint128
  oracle: OracleBaseForString
  owner: string
  red_bank: RedBankBaseForString
  swapper: SwapperBaseForString
  vault_configs: VaultInstantiateConfig[]
  zapper: ZapperBaseForString
}
export interface VaultInstantiateConfig {
  config: VaultConfig
  vault: VaultBaseForString
}
export interface VaultConfig {
  deposit_cap: Coin
  liquidation_threshold: Decimal
  max_ltv: Decimal
  whitelisted: boolean
}
export interface Coin {
  amount: Uint128
  denom: string
  [k: string]: unknown
}
export interface VaultBaseForString {
  address: string
}
export type ExecuteMsg =
  | {
      create_credit_account: {}
    }
  | {
      update_credit_account: {
        account_id: string
        actions: Action[]
      }
    }
  | {
      update_config: {
        updates: ConfigUpdates
      }
    }
  | {
      update_owner: OwnerUpdate
    }
  | {
      update_nft_config: {
        updates: NftConfigUpdates
      }
    }
  | {
      callback: CallbackMsg
    }
export type Action =
  | {
      deposit: Coin
    }
  | {
      withdraw: Coin
    }
  | {
      borrow: Coin
    }
  | {
      lend: Coin
    }
  | {
      reclaim: ActionCoin
    }
  | {
      repay: ActionCoin
    }
  | {
      enter_vault: {
        coin: ActionCoin
        vault: VaultBaseForString
      }
    }
  | {
      exit_vault: {
        amount: Uint128
        vault: VaultBaseForString
      }
    }
  | {
      request_vault_unlock: {
        amount: Uint128
        vault: VaultBaseForString
      }
    }
  | {
      exit_vault_unlocked: {
        id: number
        vault: VaultBaseForString
      }
    }
  | {
      liquidate_coin: {
        debt_coin: Coin
        liquidatee_account_id: string
        request_coin_denom: string
      }
    }
  | {
      liquidate_vault: {
        debt_coin: Coin
        liquidatee_account_id: string
        position_type: VaultPositionType
        request_vault: VaultBaseForString
      }
    }
  | {
      swap_exact_in: {
        coin_in: ActionCoin
        denom_out: string
        slippage: Decimal
      }
    }
  | {
      provide_liquidity: {
        coins_in: ActionCoin[]
        lp_token_out: string
        minimum_receive: Uint128
      }
    }
  | {
      withdraw_liquidity: {
        lp_token: ActionCoin
      }
    }
  | {
      refund_all_coin_balances: {}
    }
export type ActionAmount =
  | 'account_balance'
  | {
      exact: Uint128
    }
export type VaultPositionType = 'u_n_l_o_c_k_e_d' | 'l_o_c_k_e_d' | 'u_n_l_o_c_k_i_n_g'
export type OwnerUpdate =
  | {
      propose_new_owner: {
        proposed: string
      }
    }
  | 'clear_proposed'
  | 'accept_proposed'
  | 'abolish_owner_role'
export type CallbackMsg =
  | {
      withdraw: {
        account_id: string
        coin: Coin
        recipient: Addr
      }
    }
  | {
      borrow: {
        account_id: string
        coin: Coin
      }
    }
  | {
      repay: {
        account_id: string
        coin: ActionCoin
      }
    }
  | {
      lend: {
        account_id: string
        coin: Coin
      }
    }
  | {
      reclaim: {
        account_id: string
        coin: ActionCoin
      }
    }
  | {
      assert_max_ltv: {
        account_id: string
        prev_max_ltv_health_factor?: Decimal | null
      }
    }
  | {
      enter_vault: {
        account_id: string
        coin: ActionCoin
        vault: VaultBaseForAddr
      }
    }
  | {
      exit_vault: {
        account_id: string
        amount: Uint128
        vault: VaultBaseForAddr
      }
    }
  | {
      update_vault_coin_balance: {
        account_id: string
        previous_total_balance: Uint128
        vault: VaultBaseForAddr
      }
    }
  | {
      request_vault_unlock: {
        account_id: string
        amount: Uint128
        vault: VaultBaseForAddr
      }
    }
  | {
      exit_vault_unlocked: {
        account_id: string
        position_id: number
        vault: VaultBaseForAddr
      }
    }
  | {
      liquidate_coin: {
        debt_coin: Coin
        liquidatee_account_id: string
        liquidator_account_id: string
        request_coin_denom: string
      }
    }
  | {
      liquidate_vault: {
        debt_coin: Coin
        liquidatee_account_id: string
        liquidator_account_id: string
        position_type: VaultPositionType
        request_vault: VaultBaseForAddr
      }
    }
  | {
      swap_exact_in: {
        account_id: string
        coin_in: ActionCoin
        denom_out: string
        slippage: Decimal
      }
    }
  | {
      update_coin_balance: {
        account_id: string
        previous_balance: Coin
      }
    }
  | {
      provide_liquidity: {
        account_id: string
        coins_in: ActionCoin[]
        lp_token_out: string
        minimum_receive: Uint128
      }
    }
  | {
      withdraw_liquidity: {
        account_id: string
        lp_token: ActionCoin
      }
    }
  | {
      refund_all_coin_balances: {
        account_id: string
      }
    }
export type Addr = string
export interface ActionCoin {
  amount: ActionAmount
  denom: string
}
export interface ConfigUpdates {
  account_nft?: string | null
  allowed_coins?: string[] | null
  health_contract?: HealthContractBaseForString | null
  max_close_factor?: Decimal | null
  max_unlocking_positions?: Uint128 | null
  oracle?: OracleBaseForString | null
  swapper?: SwapperBaseForString | null
  vault_configs?: VaultInstantiateConfig[] | null
  zapper?: ZapperBaseForString | null
}
export interface NftConfigUpdates {
  health_contract_addr?: string | null
  max_value_for_burn?: Uint128 | null
  proposed_new_minter?: string | null
}
export interface VaultBaseForAddr {
  address: Addr
}
export type QueryMsg =
  | {
      config: {}
    }
  | {
      vault_config: {
        vault: VaultBaseForString
      }
    }
  | {
      vaults_config: {
        limit?: number | null
        start_after?: VaultBaseForString | null
      }
    }
  | {
      vault_utilization: {
        vault: VaultBaseForString
      }
    }
  | {
      allowed_coins: {
        limit?: number | null
        start_after?: string | null
      }
    }
  | {
      positions: {
        account_id: string
      }
    }
  | {
      all_coin_balances: {
        limit?: number | null
        start_after?: [string, string] | null
      }
    }
  | {
      all_debt_shares: {
        limit?: number | null
        start_after?: [string, string] | null
      }
    }
  | {
      total_debt_shares: string
    }
  | {
      all_total_debt_shares: {
        limit?: number | null
        start_after?: string | null
      }
    }
  | {
      all_lent_shares: {
        limit?: number | null
        start_after?: [string, string] | null
      }
    }
  | {
      total_lent_shares: string
    }
  | {
      all_total_lent_shares: {
        limit?: number | null
        start_after?: string | null
      }
    }
  | {
      all_vault_positions: {
        limit?: number | null
        start_after?: [string, string] | null
      }
    }
  | {
      total_vault_coin_balance: {
        vault: VaultBaseForString
      }
    }
  | {
      all_total_vault_coin_balances: {
        limit?: number | null
        start_after?: VaultBaseForString | null
      }
    }
  | {
      estimate_provide_liquidity: {
        coins_in: Coin[]
        lp_token_out: string
      }
    }
  | {
      estimate_withdraw_liquidity: {
        lp_token: Coin
      }
    }
  | {
      vault_position_value: {
        vault_position: VaultPosition
      }
    }
export type VaultPositionAmount =
  | {
      unlocked: VaultAmount
    }
  | {
      locking: LockingVaultAmount
    }
export type VaultAmount = string
export type VaultAmount1 = string
export type UnlockingPositions = VaultUnlockingPosition[]
export interface VaultPosition {
  amount: VaultPositionAmount
  vault: VaultBaseForAddr
}
export interface LockingVaultAmount {
  locked: VaultAmount1
  unlocking: UnlockingPositions
}
export interface VaultUnlockingPosition {
  coin: Coin
  id: number
}
export type ArrayOfCoinBalanceResponseItem = CoinBalanceResponseItem[]
export interface CoinBalanceResponseItem {
  account_id: string
  amount: Uint128
  denom: string
}
export type ArrayOfSharesResponseItem = SharesResponseItem[]
export interface SharesResponseItem {
  account_id: string
  denom: string
  shares: Uint128
}
export type ArrayOfDebtShares = DebtShares[]
export interface DebtShares {
  denom: string
  shares: Uint128
}
export type ArrayOfLentShares = LentShares[]
export interface LentShares {
  denom: string
  shares: Uint128
}
export type ArrayOfVaultWithBalance = VaultWithBalance[]
export interface VaultWithBalance {
  balance: Uint128
  vault: VaultBaseForAddr
}
export type ArrayOfVaultPositionResponseItem = VaultPositionResponseItem[]
export interface VaultPositionResponseItem {
  account_id: string
  position: VaultPosition
}
export type ArrayOfString = string[]
export interface ConfigResponse {
  account_nft?: string | null
  health_contract: string
  max_close_factor: Decimal
  max_unlocking_positions: Uint128
  oracle: string
  owner?: string | null
  proposed_new_owner?: string | null
  red_bank: string
  swapper: string
  zapper: string
}
export type ArrayOfCoin = Coin[]
export interface Positions {
  account_id: string
  debts: DebtAmount[]
  deposits: Coin[]
  lends: LentAmount[]
  vaults: VaultPosition[]
}
export interface DebtAmount {
  amount: Uint128
  denom: string
  shares: Uint128
}
export interface LentAmount {
  amount: Uint128
  denom: string
  shares: Uint128
}
export interface VaultConfigResponse {
  config: VaultConfig
  vault: VaultBaseForString
}
export interface VaultPositionValue {
  base_coin: CoinValue
  vault_coin: CoinValue
}
export interface CoinValue {
  amount: Uint128
  denom: string
  value: Uint128
}
export interface VaultUtilizationResponse {
  utilization: Coin
  vault: VaultBaseForString
}
export type ArrayOfVaultConfigResponse = VaultConfigResponse[]
