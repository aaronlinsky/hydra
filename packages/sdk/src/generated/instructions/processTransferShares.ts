/**
 * This code was GENERATED using the solita package.
 * Please DO NOT EDIT THIS FILE, instead rerun solita to update it or write a wrapper to add functionality.
 *
 * See: https://github.com/metaplex-foundation/solita
 */

import * as beet from "@metaplex-foundation/beet";
import * as web3 from "@solana/web3.js";

/**
 * @category Instructions
 * @category ProcessTransferShares
 * @category generated
 */
export type ProcessTransferSharesInstructionArgs = {
  shares: beet.bignum;
};
/**
 * @category Instructions
 * @category ProcessTransferShares
 * @category generated
 */
const processTransferSharesStruct = new beet.BeetArgsStruct<
  ProcessTransferSharesInstructionArgs & {
    instructionDiscriminator: number[] /* size: 8 */;
  }
>(
  [
    ["instructionDiscriminator", beet.uniformFixedSizeArray(beet.u8, 8)],
    ["shares", beet.u64],
  ],
  "ProcessTransferSharesInstructionArgs"
);
/**
 * Accounts required by the _processTransferShares_ instruction
 * @category Instructions
 * @category ProcessTransferShares
 * @category generated
 */
export type ProcessTransferSharesInstructionAccounts = {
  authority: web3.PublicKey;
  member: web3.PublicKey;
  membershipKey: web3.PublicKey;
  fanout: web3.PublicKey;
  fromMembershipAccount: web3.PublicKey;
  toMembershipAccount: web3.PublicKey;
};

const processTransferSharesInstructionDiscriminator = [
  195, 175, 36, 50, 101, 22, 28, 87,
];

/**
 * Creates a _ProcessTransferShares_ instruction.
 *
 * @param accounts that will be accessed while the instruction is processed
 * @param args to provide as instruction data to the program
 *
 * @category Instructions
 * @category ProcessTransferShares
 * @category generated
 */
export function createProcessTransferSharesInstruction(
  accounts: ProcessTransferSharesInstructionAccounts,
  args: ProcessTransferSharesInstructionArgs
) {
  const {
    authority,
    member,
    membershipKey,
    fanout,
    fromMembershipAccount,
    toMembershipAccount,
  } = accounts;

  const [data] = processTransferSharesStruct.serialize({
    instructionDiscriminator: processTransferSharesInstructionDiscriminator,
    ...args,
  });
  const keys: web3.AccountMeta[] = [
    {
      pubkey: authority,
      isWritable: false,
      isSigner: true,
    },
    {
      pubkey: member,
      isWritable: false,
      isSigner: false,
    },
    {
      pubkey: membershipKey,
      isWritable: false,
      isSigner: false,
    },
    {
      pubkey: fanout,
      isWritable: true,
      isSigner: false,
    },
    {
      pubkey: fromMembershipAccount,
      isWritable: false,
      isSigner: false,
    },
    {
      pubkey: toMembershipAccount,
      isWritable: false,
      isSigner: false,
    },
  ];

  const ix = new web3.TransactionInstruction({
    programId: new web3.PublicKey(
      "hyDQ4Nz1eYyegS6JfenyKwKzYxRsCWCriYSAjtzP4Vg"
    ),
    keys,
    data,
  });
  return ix;
}
