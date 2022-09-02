# Changelog

## v1.0.0-rc0

This section documents the API changes compared to the Terra Classic deployment, found in the [`mars-core`](https://github.com/mars-protocol/mars-core) repository. This section is **not comprehensive**, as the changes are numerous. Changelog for later version start here should be made comprehensive.

* ([#55](https://github.com/mars-protocol/outposts/issues/27)) Red Bank: the option for the liquidator to request receiving the underlying asset is removed. Now the liquidator always receives collateral shares. To withdraw the underlying asset, dispatch another `ExecuteMsg::Withdraw`.

```diff
pub struct ExecuteMsg {
    Liquidate {
        collateral_denom: String,
        user_address: String,
-       receive_ma_token: bool,
    },
}
```

* ([#53](https://github.com/mars-protocol/outposts/pull/53)) Red Bank: Several unnecessary parameters in the execute message are removed:

```diff
pub struct ExecuteMsg {
    Deposit {
-       denom: String,
        on_behalf_of: Option<String>,
    },
    Repay {
-       denom: String,
        on_behalf_of: Option<String>,
    },
    Liquidate {
        collateral_denom: String,
-       debt_denom: String,
        user_address: String,
        receive_ma_token: bool, // NOTE: this params is removed as well in PR #55
    },
}
```

* ([#46](https://github.com/mars-protocol/outposts/pull/46)) Red Bank: the dynamic interest rate model is removed. The `InterestRateModel` struct is simplified:

```diff
- pub enum InterestRateModel {
-     Dynamic {
-         params: DynamicInterestRateModelParams,
-         state: DynamicInterestRateModelState,
-     },
-     Linear {
-         params: LinearInterestRateModelParams,
-     },
- }
+ pub struct InterestRateModel {
+     pub optimal_utilization_rate: Decimal,
+     pub base: Decimal,
+     pub slope_1: Decimal,
+     pub slope_2: Decimal,
+ }
```

The `Market` struct is updated accordingly. Note that this struct is the response type is the response type for the `market` and `markets` queries methods:

```diff
  pub struct Market {
-     pub interest_rate_model: red_bank::InterestRateModel, # old
+     pub interest_rate_model: InterestRateModel,           # new
  }
```

The `InitOrUpdateAssetParams` struct, which is used in `init_asset` and `update_asset` execute messages, is updated accordingly:

```diff
  pub struct InitOrUpdateAssetParams {
-     pub interest_rate_model_params: Option<InterestRateModelParams>,
+     pub interest_rate_model: Option<InterestRateModel>,
  }
```