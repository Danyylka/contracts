extern crate core;

use crate::helpers::{
    assert_err, get_position, get_token_id, mock_app, mock_create_credit_account,
    setup_credit_manager,
};
use cosmwasm_std::Addr;
use credit_manager::error::ContractError::NotTokenOwner;
use cw_multi_test::Executor;
use rover::msg::ExecuteMsg::UpdateCreditAccount;

pub mod helpers;

#[test]
fn test_dispatch_only_allowed_for_token_owner() {
    let mut app = mock_app();
    let owner = Addr::unchecked("owner");
    let contract_addr = setup_credit_manager(&mut app, &owner, vec![]);

    let user = Addr::unchecked("user");
    let res = mock_create_credit_account(&mut app, &contract_addr, &user).unwrap();
    let token_id = get_token_id(res);

    let bad_guy = Addr::unchecked("bad_guy");
    let res = app.execute_contract(
        bad_guy.clone(),
        contract_addr.clone(),
        &UpdateCreditAccount {
            token_id: token_id.clone(),
            actions: vec![],
        },
        &[],
    );

    assert_err(
        res,
        NotTokenOwner {
            user: bad_guy.into(),
            token_id,
        },
    )
}

#[test]
fn test_nothing_happens_if_no_actions_are_passed() {
    let mut app = mock_app();
    let owner = Addr::unchecked("owner");
    let contract_addr = setup_credit_manager(&mut app, &owner, vec![]);

    let user = Addr::unchecked("user");
    let res = mock_create_credit_account(&mut app, &contract_addr, &user).unwrap();
    let token_id = get_token_id(res);

    let res = get_position(&app, &contract_addr, &token_id);
    assert_eq!(res.assets.len(), 0);

    app.execute_contract(
        user.clone(),
        contract_addr.clone(),
        &UpdateCreditAccount {
            token_id: token_id.clone(),
            actions: vec![],
        },
        &[],
    )
    .unwrap();

    let res = get_position(&app, &contract_addr, &token_id);
    assert_eq!(res.assets.len(), 0);
}
