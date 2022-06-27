import {
  Contract,
  Transfer,
} from "../generated/Contract/Contract"
import { Pass } from "../generated/schema"
import { log } from "@graphprotocol/graph-ts"

export function handleTransfer(event: Transfer): void {
  let entity = Pass.load(event.params.to.toHexString());
  log.info('Loaded pass', []);
  if (entity === null) {
    entity = new Pass(event.params.to.toHexString());
  }

  log.info('Got nft: {}, {}', [event.params.tokenId.toString(), event.transaction.hash.toHexString()])

  entity.tokenId = event.params.tokenId;
  entity.id = event.params.to.toHexString();
  entity.mintedOn = event.block.timestamp;
  entity.txnHash = event.transaction.hash;

  // const contract = Contract.bind(event.address);
  // let tokenUriResp = contract.try_tokenURI(event.params.tokenId);
  // if(tokenUriResp.reverted == false){
  //   entity.tokenURI = tokenUriResp.value;
  // }

  entity.save();
}
