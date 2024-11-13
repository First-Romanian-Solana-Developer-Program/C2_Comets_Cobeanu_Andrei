pub mod constants;
pub mod error;
pub mod instructions;
pub mod state;

use anchor_lang::prelude::*;

pub use constants::*;
pub use instructions::*;
pub use state::*;

declare_id!("6eEMuMVDiHCCQDwV5ChY7Vo7GuYMXLdJ97WCZh5Beu1j");

#[program]
pub mod escrow {
    use instruction::MakeOffer;

    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        initialize::handler(ctx)
    }

    pub fn make_offer(ctx: Context<MakeOffer>) -> Result<()> {
        Ok(())
    }
}
