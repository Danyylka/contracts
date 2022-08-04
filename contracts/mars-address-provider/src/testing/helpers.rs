use cosmwasm_std::testing::{
    mock_dependencies_with_balance, mock_env, mock_info, MockApi, MockQuerier, MockStorage,
};
use cosmwasm_std::{from_binary, Deps, OwnedDeps};

use mars_outpost::address_provider::{InstantiateMsg, QueryMsg};

use crate::contract::{instantiate, query};

pub(super) fn th_setup() -> OwnedDeps<MockStorage, MockApi, MockQuerier> {
    let mut deps = mock_dependencies_with_balance(&[]);

    instantiate(
        deps.as_mut(),
        mock_env(),
        mock_info("deployer", &[]),
        InstantiateMsg {
            owner: "owner".to_string(),
            prefix: "osmo".to_string(),
        },
    )
    .unwrap();

    deps
}

pub(super) fn th_query<T: serde::de::DeserializeOwned>(deps: Deps, msg: QueryMsg) -> T {
    from_binary(&query(deps, mock_env(), msg).unwrap()).unwrap()
}