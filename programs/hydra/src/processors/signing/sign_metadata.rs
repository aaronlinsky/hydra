use crate::error::ErrorCode;
use crate::state::Fanout;
use crate::utils::validation::assert_owned_by;
use anchor_lang::prelude::*;

use spl_token::solana_program::program::invoke_signed;

#[derive(Accounts)]
pub struct SignMetadata<'info> {
    #[account(mut)]
    pub authority: Signer<'info>,
    #[account(
    seeds = [b"fanout-config", fanout.name.as_bytes()],
    has_one = authority,
    bump
    )]
    pub fanout: Account<'info, Fanout>,
    #[account(
    constraint = fanout.account_key == holding_account.key(),
    seeds = [b"fanout-native-account", fanout.key().as_ref()],
    bump
    )]
    pub holding_account: UncheckedAccount<'info>,
    pub metadata: UncheckedAccount<'info>,
}

pub fn sign_metadata(ctx: Context<SignMetadata>) -> ProgramResult {
    let metadata = ctx.accounts.metadata.to_account_info();
    let holding_account = &ctx.accounts.holding_account;
    assert_owned_by(&metadata, &mpl_token_metadata::id())?;
    let meta_data = &metadata.try_borrow_data()?;
    if meta_data[0] != mpl_token_metadata::state::Key::MetadataV1 as u8 {
        return Err(ErrorCode::InvalidMetadata.into());
    }
    let ix = mpl_token_metadata::instruction::sign_metadata(
        mpl_token_metadata::id(),
        metadata.key(),
        holding_account.key(),
    );
    invoke_signed(
        &ix,
        &[metadata.to_owned(), holding_account.to_account_info()],
        &[&[
            "fanout-native-account".as_bytes(),
            ctx.accounts.fanout.key().as_ref(),
            &[*ctx.bumps.get("holding_account").unwrap()],
        ]],
    )
}
