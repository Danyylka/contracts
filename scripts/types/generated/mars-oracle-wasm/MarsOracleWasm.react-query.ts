// @ts-nocheck
/**
 * This file was automatically generated by @cosmwasm/ts-codegen@0.30.1.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run the @cosmwasm/ts-codegen generate command to regenerate this file.
 */

import { UseQueryOptions, useQuery, useMutation, UseMutationOptions } from '@tanstack/react-query'
import { ExecuteResult } from '@cosmjs/cosmwasm-stargate'
import { StdFee, Coin } from '@cosmjs/amino'
import {
  InstantiateMsg,
  WasmOracleCustomInitParams,
  ExecuteMsg,
  WasmPriceSourceForString,
  Decimal,
  Identifier,
  OwnerUpdate,
  WasmOracleCustomExecuteMsg,
  QueryMsg,
  ConfigResponse,
  PriceResponse,
  PriceSourceResponseForString,
  ArrayOfPriceSourceResponseForString,
  ArrayOfPriceResponse,
} from './MarsOracleWasm.types'
import { MarsOracleWasmQueryClient, MarsOracleWasmClient } from './MarsOracleWasm.client'
export const marsOracleWasmQueryKeys = {
  contract: [
    {
      contract: 'marsOracleWasm',
    },
  ] as const,
  address: (contractAddress: string | undefined) =>
    [{ ...marsOracleWasmQueryKeys.contract[0], address: contractAddress }] as const,
  config: (contractAddress: string | undefined, args?: Record<string, unknown>) =>
    [{ ...marsOracleWasmQueryKeys.address(contractAddress)[0], method: 'config', args }] as const,
  priceSource: (contractAddress: string | undefined, args?: Record<string, unknown>) =>
    [
      { ...marsOracleWasmQueryKeys.address(contractAddress)[0], method: 'price_source', args },
    ] as const,
  priceSources: (contractAddress: string | undefined, args?: Record<string, unknown>) =>
    [
      { ...marsOracleWasmQueryKeys.address(contractAddress)[0], method: 'price_sources', args },
    ] as const,
  price: (contractAddress: string | undefined, args?: Record<string, unknown>) =>
    [{ ...marsOracleWasmQueryKeys.address(contractAddress)[0], method: 'price', args }] as const,
  prices: (contractAddress: string | undefined, args?: Record<string, unknown>) =>
    [{ ...marsOracleWasmQueryKeys.address(contractAddress)[0], method: 'prices', args }] as const,
}
export interface MarsOracleWasmReactQuery<TResponse, TData = TResponse> {
  client: MarsOracleWasmQueryClient | undefined
  options?: Omit<
    UseQueryOptions<TResponse, Error, TData>,
    "'queryKey' | 'queryFn' | 'initialData'"
  > & {
    initialData?: undefined
  }
}
export interface MarsOracleWasmPricesQuery<TData>
  extends MarsOracleWasmReactQuery<ArrayOfPriceResponse, TData> {
  args: {
    limit?: number
    startAfter?: string
  }
}
export function useMarsOracleWasmPricesQuery<TData = ArrayOfPriceResponse>({
  client,
  args,
  options,
}: MarsOracleWasmPricesQuery<TData>) {
  return useQuery<ArrayOfPriceResponse, Error, TData>(
    marsOracleWasmQueryKeys.prices(client?.contractAddress, args),
    () =>
      client
        ? client.prices({
            limit: args.limit,
            startAfter: args.startAfter,
          })
        : Promise.reject(new Error('Invalid client')),
    { ...options, enabled: !!client && (options?.enabled != undefined ? options.enabled : true) },
  )
}
export interface MarsOracleWasmPriceQuery<TData>
  extends MarsOracleWasmReactQuery<PriceResponse, TData> {
  args: {
    denom: string
  }
}
export function useMarsOracleWasmPriceQuery<TData = PriceResponse>({
  client,
  args,
  options,
}: MarsOracleWasmPriceQuery<TData>) {
  return useQuery<PriceResponse, Error, TData>(
    marsOracleWasmQueryKeys.price(client?.contractAddress, args),
    () =>
      client
        ? client.price({
            denom: args.denom,
          })
        : Promise.reject(new Error('Invalid client')),
    { ...options, enabled: !!client && (options?.enabled != undefined ? options.enabled : true) },
  )
}
export interface MarsOracleWasmPriceSourcesQuery<TData>
  extends MarsOracleWasmReactQuery<ArrayOfPriceSourceResponseForString, TData> {
  args: {
    limit?: number
    startAfter?: string
  }
}
export function useMarsOracleWasmPriceSourcesQuery<TData = ArrayOfPriceSourceResponseForString>({
  client,
  args,
  options,
}: MarsOracleWasmPriceSourcesQuery<TData>) {
  return useQuery<ArrayOfPriceSourceResponseForString, Error, TData>(
    marsOracleWasmQueryKeys.priceSources(client?.contractAddress, args),
    () =>
      client
        ? client.priceSources({
            limit: args.limit,
            startAfter: args.startAfter,
          })
        : Promise.reject(new Error('Invalid client')),
    { ...options, enabled: !!client && (options?.enabled != undefined ? options.enabled : true) },
  )
}
export interface MarsOracleWasmPriceSourceQuery<TData>
  extends MarsOracleWasmReactQuery<PriceSourceResponseForString, TData> {
  args: {
    denom: string
  }
}
export function useMarsOracleWasmPriceSourceQuery<TData = PriceSourceResponseForString>({
  client,
  args,
  options,
}: MarsOracleWasmPriceSourceQuery<TData>) {
  return useQuery<PriceSourceResponseForString, Error, TData>(
    marsOracleWasmQueryKeys.priceSource(client?.contractAddress, args),
    () =>
      client
        ? client.priceSource({
            denom: args.denom,
          })
        : Promise.reject(new Error('Invalid client')),
    { ...options, enabled: !!client && (options?.enabled != undefined ? options.enabled : true) },
  )
}
export interface MarsOracleWasmConfigQuery<TData>
  extends MarsOracleWasmReactQuery<ConfigResponse, TData> {}
export function useMarsOracleWasmConfigQuery<TData = ConfigResponse>({
  client,
  options,
}: MarsOracleWasmConfigQuery<TData>) {
  return useQuery<ConfigResponse, Error, TData>(
    marsOracleWasmQueryKeys.config(client?.contractAddress),
    () => (client ? client.config() : Promise.reject(new Error('Invalid client'))),
    { ...options, enabled: !!client && (options?.enabled != undefined ? options.enabled : true) },
  )
}
export interface MarsOracleWasmCustomMutation {
  client: MarsOracleWasmClient
  msg: WasmOracleCustomExecuteMsg
  args?: {
    fee?: number | StdFee | 'auto'
    memo?: string
    funds?: Coin[]
  }
}
export function useMarsOracleWasmCustomMutation(
  options?: Omit<
    UseMutationOptions<ExecuteResult, Error, MarsOracleWasmCustomMutation>,
    'mutationFn'
  >,
) {
  return useMutation<ExecuteResult, Error, MarsOracleWasmCustomMutation>(
    ({ client, msg, args: { fee, memo, funds } = {} }) => client.custom(msg, fee, memo, funds),
    options,
  )
}
export interface MarsOracleWasmUpdateConfigMutation {
  client: MarsOracleWasmClient
  msg: {
    baseDenom?: string
  }
  args?: {
    fee?: number | StdFee | 'auto'
    memo?: string
    funds?: Coin[]
  }
}
export function useMarsOracleWasmUpdateConfigMutation(
  options?: Omit<
    UseMutationOptions<ExecuteResult, Error, MarsOracleWasmUpdateConfigMutation>,
    'mutationFn'
  >,
) {
  return useMutation<ExecuteResult, Error, MarsOracleWasmUpdateConfigMutation>(
    ({ client, msg, args: { fee, memo, funds } = {} }) =>
      client.updateConfig(msg, fee, memo, funds),
    options,
  )
}
export interface MarsOracleWasmUpdateOwnerMutation {
  client: MarsOracleWasmClient
  msg: OwnerUpdate
  args?: {
    fee?: number | StdFee | 'auto'
    memo?: string
    funds?: Coin[]
  }
}
export function useMarsOracleWasmUpdateOwnerMutation(
  options?: Omit<
    UseMutationOptions<ExecuteResult, Error, MarsOracleWasmUpdateOwnerMutation>,
    'mutationFn'
  >,
) {
  return useMutation<ExecuteResult, Error, MarsOracleWasmUpdateOwnerMutation>(
    ({ client, msg, args: { fee, memo, funds } = {} }) => client.updateOwner(msg, fee, memo, funds),
    options,
  )
}
export interface MarsOracleWasmRemovePriceSourceMutation {
  client: MarsOracleWasmClient
  msg: {
    denom: string
  }
  args?: {
    fee?: number | StdFee | 'auto'
    memo?: string
    funds?: Coin[]
  }
}
export function useMarsOracleWasmRemovePriceSourceMutation(
  options?: Omit<
    UseMutationOptions<ExecuteResult, Error, MarsOracleWasmRemovePriceSourceMutation>,
    'mutationFn'
  >,
) {
  return useMutation<ExecuteResult, Error, MarsOracleWasmRemovePriceSourceMutation>(
    ({ client, msg, args: { fee, memo, funds } = {} }) =>
      client.removePriceSource(msg, fee, memo, funds),
    options,
  )
}
export interface MarsOracleWasmSetPriceSourceMutation {
  client: MarsOracleWasmClient
  msg: {
    denom: string
    priceSource: WasmPriceSourceForString
  }
  args?: {
    fee?: number | StdFee | 'auto'
    memo?: string
    funds?: Coin[]
  }
}
export function useMarsOracleWasmSetPriceSourceMutation(
  options?: Omit<
    UseMutationOptions<ExecuteResult, Error, MarsOracleWasmSetPriceSourceMutation>,
    'mutationFn'
  >,
) {
  return useMutation<ExecuteResult, Error, MarsOracleWasmSetPriceSourceMutation>(
    ({ client, msg, args: { fee, memo, funds } = {} }) =>
      client.setPriceSource(msg, fee, memo, funds),
    options,
  )
}
