pub mod constants;
pub mod error;
pub mod instructions;
pub mod state;

use anchor_lang::prelude::*;

pub use constants::*;
pub use instructions::*;
pub use state::*;

declare_id!("EZRJHdTRAi9zhifVXGyqrGwTSxc4hxAoePugbAQCASB7");

#[program]
pub mod escrow {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        initialize::handler(ctx)
    }

    pub fn make_offer(
        ctx: Context<MakeOffer>,
        id: u64,
        token_mint_amount_a: u64,
        token_mint_amount_b: u64,
    ) -> Result<()> {
        make_offer::process(ctx, id, token_mint_amount_a, token_mint_amount_b)?;
        // make_offer::send_user_tokens_to_vault(&ctx, token_mint_amount_a)?;
        // make_offer::store_offer_params(ctx, id, token_mint_amount_b);

        Ok(())
    }
    pub fn take_offer(context: Context<TakeOffer>) -> Result<()> {
        take_offer::withdraw_and_close_vault(&context)?;
        take_offer::send_wanted_tokens_to_maker(context)?;
        
        Ok(())
    }
}
