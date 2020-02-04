export interface Tx {
  readonly type: string;
  readonly value: unknown;
}
export interface StdTx {
  readonly msg: ReadonlyArray<Msg>;
  readonly fee: StdFee;
  readonly signatures: ReadonlyArray<StdSignature>;
  readonly memo: string | undefined;
}
export declare type AminoTx = Tx & {
  readonly value: StdTx;
};
export declare function isAminoStdTx(txValue: unknown): txValue is StdTx;
interface MsgTemplate {
  readonly type: string;
  readonly value: object;
}
export interface ValueSend {
  /** Bech32 account address */
  readonly from_address: string;
  /** Bech32 account address */
  readonly to_address: string;
  readonly amount: ReadonlyArray<Coin>;
}
export interface MsgSend extends MsgTemplate {
  readonly type: "cosmos-sdk/MsgSend";
  readonly value: ValueSend;
}
export interface ValueStoreCode {
  /** Bech32 account address */
  readonly sender: string;
  /** Base64 encoded Wasm */
  readonly wasm_byte_code: string;
  /** A valid URI reference to the contract's source code, optional */
  readonly source?: string;
  /** A docker tag, optional */
  readonly builder?: string;
}
export interface MsgStoreCode extends MsgTemplate {
  readonly type: "wasm/store-code";
  readonly value: ValueStoreCode;
}
export declare type Msg = MsgSend | MsgStoreCode | MsgTemplate;
export declare function isMsgSend(msg: Msg): msg is MsgSend;
export declare function isMsgStoreCode(msg: Msg): msg is MsgStoreCode;
export interface StdFee {
  readonly amount: ReadonlyArray<Coin>;
  readonly gas: string;
}
export interface Coin {
  readonly denom: string;
  readonly amount: string;
}
export interface StdSignature {
  readonly pub_key: PubKey;
  readonly signature: string;
}
export interface PubKey {
  readonly type: string;
  readonly value: string;
}
export declare type AccountPubKey = string;
export interface BaseAccount {
  /** Bech32 account address */
  readonly address: string;
  readonly coins: ReadonlyArray<Coin>;
  readonly public_key: AccountPubKey;
  readonly account_number: number;
  readonly sequence: number;
}
/** The data we need from BaseAccount to create a nonce */
export declare type NonceInfo = Pick<BaseAccount, "account_number" | "sequence">;
export {};