// @ts-nocheck
/**
 * This file was automatically generated by @cosmwasm/ts-codegen@0.16.5.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run the @cosmwasm/ts-codegen generate command to regenerate this file.
 */

import { CosmWasmClient, SigningCosmWasmClient, ExecuteResult } from '@cosmjs/cosmwasm-stargate'
import { Coin, StdFee } from '@cosmjs/amino'
import {
  InstantiateMsg,
  ExecuteMsg,
  Uint128,
  Addr,
  OwnerUpdate,
  QueryMsg,
  Decimal,
  AssetIncentiveResponse,
  AssetIncentive,
  ConfigResponse,
} from './MarsIncentives.types'
export interface MarsIncentivesReadOnlyInterface {
  contractAddress: string
  config: () => Promise<ConfigResponse>
  assetIncentive: ({ denom }: { denom: string }) => Promise<AssetIncentiveResponse>
  userUnclaimedRewards: ({ user }: { user: string }) => Promise<Uint128>
}
export class MarsIncentivesQueryClient implements MarsIncentivesReadOnlyInterface {
  client: CosmWasmClient
  contractAddress: string

  constructor(client: CosmWasmClient, contractAddress: string) {
    this.client = client
    this.contractAddress = contractAddress
    this.config = this.config.bind(this)
    this.assetIncentive = this.assetIncentive.bind(this)
    this.userUnclaimedRewards = this.userUnclaimedRewards.bind(this)
  }

  config = async (): Promise<ConfigResponse> => {
    return this.client.queryContractSmart(this.contractAddress, {
      config: {},
    })
  }
  assetIncentive = async ({ denom }: { denom: string }): Promise<AssetIncentiveResponse> => {
    return this.client.queryContractSmart(this.contractAddress, {
      asset_incentive: {
        denom,
      },
    })
  }
  userUnclaimedRewards = async ({ user }: { user: string }): Promise<Uint128> => {
    return this.client.queryContractSmart(this.contractAddress, {
      user_unclaimed_rewards: {
        user,
      },
    })
  }
}
export interface MarsIncentivesInterface extends MarsIncentivesReadOnlyInterface {
  contractAddress: string
  sender: string
  setAssetIncentive: (
    {
      denom,
      duration,
      emissionPerSecond,
      startTime,
    }: {
      denom: string
      duration?: number
      emissionPerSecond?: Uint128
      startTime?: number
    },
    fee?: number | StdFee | 'auto',
    memo?: string,
    funds?: Coin[],
  ) => Promise<ExecuteResult>
  balanceChange: (
    {
      denom,
      totalAmountScaledBefore,
      userAddr,
      userAmountScaledBefore,
    }: {
      denom: string
      totalAmountScaledBefore: Uint128
      userAddr: Addr
      userAmountScaledBefore: Uint128
    },
    fee?: number | StdFee | 'auto',
    memo?: string,
    funds?: Coin[],
  ) => Promise<ExecuteResult>
  claimRewards: (
    fee?: number | StdFee | 'auto',
    memo?: string,
    funds?: Coin[],
  ) => Promise<ExecuteResult>
  updateConfig: (
    {
      addressProvider,
      marsDenom,
    }: {
      addressProvider?: string
      marsDenom?: string
    },
    fee?: number | StdFee | 'auto',
    memo?: string,
    funds?: Coin[],
  ) => Promise<ExecuteResult>
  updateOwner: (
    fee?: number | StdFee | 'auto',
    memo?: string,
    funds?: Coin[],
  ) => Promise<ExecuteResult>
}
export class MarsIncentivesClient
  extends MarsIncentivesQueryClient
  implements MarsIncentivesInterface
{
  client: SigningCosmWasmClient
  sender: string
  contractAddress: string

  constructor(client: SigningCosmWasmClient, sender: string, contractAddress: string) {
    super(client, contractAddress)
    this.client = client
    this.sender = sender
    this.contractAddress = contractAddress
    this.setAssetIncentive = this.setAssetIncentive.bind(this)
    this.balanceChange = this.balanceChange.bind(this)
    this.claimRewards = this.claimRewards.bind(this)
    this.updateConfig = this.updateConfig.bind(this)
    this.updateOwner = this.updateOwner.bind(this)
  }

  setAssetIncentive = async (
    {
      denom,
      duration,
      emissionPerSecond,
      startTime,
    }: {
      denom: string
      duration?: number
      emissionPerSecond?: Uint128
      startTime?: number
    },
    fee: number | StdFee | 'auto' = 'auto',
    memo?: string,
    funds?: Coin[],
  ): Promise<ExecuteResult> => {
    return await this.client.execute(
      this.sender,
      this.contractAddress,
      {
        set_asset_incentive: {
          denom,
          duration,
          emission_per_second: emissionPerSecond,
          start_time: startTime,
        },
      },
      fee,
      memo,
      funds,
    )
  }
  balanceChange = async (
    {
      denom,
      totalAmountScaledBefore,
      userAddr,
      userAmountScaledBefore,
    }: {
      denom: string
      totalAmountScaledBefore: Uint128
      userAddr: Addr
      userAmountScaledBefore: Uint128
    },
    fee: number | StdFee | 'auto' = 'auto',
    memo?: string,
    funds?: Coin[],
  ): Promise<ExecuteResult> => {
    return await this.client.execute(
      this.sender,
      this.contractAddress,
      {
        balance_change: {
          denom,
          total_amount_scaled_before: totalAmountScaledBefore,
          user_addr: userAddr,
          user_amount_scaled_before: userAmountScaledBefore,
        },
      },
      fee,
      memo,
      funds,
    )
  }
  claimRewards = async (
    fee: number | StdFee | 'auto' = 'auto',
    memo?: string,
    funds?: Coin[],
  ): Promise<ExecuteResult> => {
    return await this.client.execute(
      this.sender,
      this.contractAddress,
      {
        claim_rewards: {},
      },
      fee,
      memo,
      funds,
    )
  }
  updateConfig = async (
    {
      addressProvider,
      marsDenom,
    }: {
      addressProvider?: string
      marsDenom?: string
    },
    fee: number | StdFee | 'auto' = 'auto',
    memo?: string,
    funds?: Coin[],
  ): Promise<ExecuteResult> => {
    return await this.client.execute(
      this.sender,
      this.contractAddress,
      {
        update_config: {
          address_provider: addressProvider,
          mars_denom: marsDenom,
        },
      },
      fee,
      memo,
      funds,
    )
  }
  updateOwner = async (
    fee: number | StdFee | 'auto' = 'auto',
    memo?: string,
    funds?: Coin[],
  ): Promise<ExecuteResult> => {
    return await this.client.execute(
      this.sender,
      this.contractAddress,
      {
        update_owner: {},
      },
      fee,
      memo,
      funds,
    )
  }
}
