use cosmwasm_std::Decimal;

use mars_outpost::oracle::{PriceResponse, QueryMsg};

use osmo_bindings::{ArithmeticTwapToNowResponse, SpotPriceResponse, Swap};

use mars_oracle_osmosis::OsmosisPriceSource;

mod helpers;

#[test]
fn test_querying_price_fixed() {
    let mut deps = helpers::setup_test();

    helpers::set_price_source(
        deps.as_mut(),
        "uosmo",
        OsmosisPriceSource::Fixed {
            price: Decimal::one(),
        },
    );

    let res: PriceResponse = helpers::query(
        deps.as_ref(),
        QueryMsg::Price {
            denom: "uosmo".to_string(),
        },
    );
    assert_eq!(res.price, Decimal::one());
}

#[test]
fn test_querying_price_spot() {
    let mut deps = helpers::setup_test();

    helpers::set_price_source(
        deps.as_mut(),
        "umars",
        OsmosisPriceSource::Spot {
            pool_id: 89,
        },
    );

    deps.querier.set_spot_price(
        Swap {
            pool_id: 89,
            denom_in: "umars".to_string(),
            denom_out: "uosmo".to_string(),
        },
        SpotPriceResponse {
            price: Decimal::from_ratio(88888u128, 12345u128),
        },
    );

    let res: PriceResponse = helpers::query(
        deps.as_ref(),
        QueryMsg::Price {
            denom: "umars".to_string(),
        },
    );
    assert_eq!(res.price, Decimal::from_ratio(88888u128, 12345u128));
}

#[test]
fn test_querying_price_twap() {
    let mut deps = helpers::setup_test();

    helpers::set_price_source(
        deps.as_mut(),
        "umars",
        OsmosisPriceSource::Twap {
            pool_id: 89,
            window_size: 86400,
        },
    );

    deps.querier.set_twap_price(
        89,
        "uosmo",
        "umars",
        ArithmeticTwapToNowResponse {
            twap: Decimal::from_ratio(77777u128, 12345u128),
        },
    );

    let res: PriceResponse = helpers::query(
        deps.as_ref(),
        QueryMsg::Price {
            denom: "umars".to_string(),
        },
    );
    assert_eq!(res.price, Decimal::from_ratio(77777u128, 12345u128));
}

#[test]
fn test_querying_all_prices() {
    let mut deps = helpers::setup_test();

    helpers::set_price_source(
        deps.as_mut(),
        "uosmo",
        OsmosisPriceSource::Fixed {
            price: Decimal::one(),
        },
    );
    helpers::set_price_source(
        deps.as_mut(),
        "uatom",
        OsmosisPriceSource::Spot {
            pool_id: 1,
        },
    );
    helpers::set_price_source(
        deps.as_mut(),
        "umars",
        OsmosisPriceSource::Spot {
            pool_id: 89,
        },
    );

    deps.querier.set_spot_price(
        Swap {
            pool_id: 1,
            denom_in: "uatom".to_string(),
            denom_out: "uosmo".to_string(),
        },
        SpotPriceResponse {
            price: Decimal::from_ratio(77777u128, 12345u128),
        },
    );
    deps.querier.set_spot_price(
        Swap {
            pool_id: 89,
            denom_in: "umars".to_string(),
            denom_out: "uosmo".to_string(),
        },
        SpotPriceResponse {
            price: Decimal::from_ratio(88888u128, 12345u128),
        },
    );

    // NOTE: responses are ordered alphabetically by denom
    let res: Vec<PriceResponse> = helpers::query(
        deps.as_ref(),
        QueryMsg::Prices {
            start_after: None,
            limit: None,
        },
    );
    assert_eq!(
        res,
        vec![
            PriceResponse {
                denom: "uatom".to_string(),
                price: Decimal::from_ratio(77777u128, 12345u128),
            },
            PriceResponse {
                denom: "umars".to_string(),
                price: Decimal::from_ratio(88888u128, 12345u128),
            },
            PriceResponse {
                denom: "uosmo".to_string(),
                price: Decimal::one(),
            },
        ]
    );
}