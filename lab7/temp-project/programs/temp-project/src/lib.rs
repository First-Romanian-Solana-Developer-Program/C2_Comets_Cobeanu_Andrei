use anchor_lang::prelude::*;

declare_id!("HGwSkZstK9Qu2yvadx4E8yjuTEbLkCoWoP7jDVtk1QX9");

#[program]
pub mod temp_project {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("Greetings from: {:?}", ctx.program_id);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
