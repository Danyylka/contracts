use cosmwasm_std::testing::mock_env;
use cosmwasm_std::{to_binary, CosmosMsg, SubMsg, Uint128, WasmMsg};

use mars_rewards_collector_osmosis::contract::entry::execute;
use mars_rewards_collector_osmosis::msg::ExecuteMsg;
use mars_testing::mock_info;

mod helpers;

#[test]
fn test_withdrawing_from_red_bank() {
    let mut deps = helpers::setup_test();

    // anyone can execute a withdrawal
    let res = execute(
        deps.as_mut(),
        mock_env(),
        mock_info("jake"),
        ExecuteMsg::WithdrawFromRedBank {
            denom: "uatom".to_string(),
            amount: Some(Uint128::new(42069)),
        },
    )
    .unwrap();

    assert_eq!(res.messages.len(), 1);
    assert_eq!(
        res.messages[0],
        SubMsg::new(CosmosMsg::Wasm(WasmMsg::Execute {
            contract_addr: "red_bank".to_string(),
            msg: to_binary(&mars_outpost::red_bank::ExecuteMsg::Withdraw {
                denom: "uatom".to_string(),
                amount: Some(Uint128::new(42069)),
                recipient: None
            })
            .unwrap(),
            funds: vec![]
        }))
    )
}