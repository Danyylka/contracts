#[cfg(not(feature = "library"))]
use cosmwasm_std::entry_point;
use cosmwasm_std::{to_binary, Binary, Deps, DepsMut, Env, MessageInfo, Response, StdResult};
use mars_red_bank_types::red_bank;

use crate::{
    execute::{borrow, deposit, repay, update_asset, withdraw},
    msg::InstantiateMsg,
    query::{query_collateral, query_debt, query_market},
    state::COIN_MARKET_INFO,
};

#[cfg_attr(not(feature = "library"), entry_point)]
pub fn instantiate(
    deps: DepsMut,
    _env: Env,
    _info: MessageInfo,
    msg: InstantiateMsg,
) -> StdResult<Response> {
    for item in msg.coins {
        COIN_MARKET_INFO.save(deps.storage, item.denom.clone(), &item)?;
    }
    Ok(Response::default())
}

#[cfg_attr(not(feature = "library"), entry_point)]
pub fn execute(
    deps: DepsMut,
    _env: Env,
    info: MessageInfo,
    msg: red_bank::ExecuteMsg,
) -> StdResult<Response> {
    match msg {
        red_bank::ExecuteMsg::Borrow {
            denom,
            amount,
            ..
        } => borrow(deps, info, denom, amount),
        red_bank::ExecuteMsg::Repay {
            ..
        } => repay(deps, info),
        red_bank::ExecuteMsg::Deposit {
            ..
        } => deposit(deps, info),
        red_bank::ExecuteMsg::Withdraw {
            denom,
            amount,
            ..
        } => withdraw(deps, info, &denom, &amount),
        red_bank::ExecuteMsg::UpdateAsset {
            denom,
            params,
        } => update_asset(deps, &denom, params),
        _ => unimplemented!("Msg not supported!"),
    }
}

#[cfg_attr(not(feature = "library"), entry_point)]
pub fn query(deps: Deps, _env: Env, msg: red_bank::QueryMsg) -> StdResult<Binary> {
    match msg {
        red_bank::QueryMsg::UserDebt {
            user,
            denom,
        } => to_binary(&query_debt(deps, user, denom)?),
        red_bank::QueryMsg::Market {
            denom,
        } => to_binary(&query_market(deps, denom)?),
        red_bank::QueryMsg::UserCollateral {
            user,
            denom,
        } => to_binary(&query_collateral(deps, user, denom)?),
        _ => unimplemented!("Query not supported!"),
    }
}
