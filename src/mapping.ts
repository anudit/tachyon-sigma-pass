import {
  Contract,
  Transfer,
} from "../generated/Contract/Contract"
import { Metadata, Pass } from "../generated/schema"
import { ipfs, JSONValue,  json, JSONValueKind } from "@graphprotocol/graph-ts"

export function handleTransfer(event: Transfer): void {
  let entity = Pass.load(event.params.tokenId.toString());
  if (entity === null) {
    entity = new Pass(event.params.tokenId.toString());
  }
  entity.tokenId = event.params.tokenId;
  entity.owner = event.params.to.toHexString();
  entity.mintedOn = event.block.timestamp;
  entity.txnHash = event.transaction.hash;

  const contract = Contract.bind(event.address);

  let tokenURI = contract.tokenURI(event.params.tokenId);
  entity.tokenURI = tokenURI;

  let hash = tokenURI.replaceAll('ipfs://', '');
  let data = ipfs.cat(hash);

  if (data) {
    entity.tokenURIRaw = data;

    let jsonData = json.fromBytes(data).toObject();
    if (jsonData) {

      const metaDataEntity = new Metadata(event.params.tokenId.toString());
      metaDataEntity.passPointed = event.params.tokenId.toString();

      const name = jsonData.get("name");
      if (name) metaDataEntity.name = name.toString();

      const description = jsonData.get("description");
      if (description) metaDataEntity.description = description.toString();

      const image = jsonData.get("image");
      if (image) metaDataEntity.image = image.toString();

      const animation_url = jsonData.get("animation_url");
      if (animation_url) metaDataEntity.animation_url = animation_url.toString();

      let attributes = jsonData.get("attributes");
      if (attributes) {
        let attrs = attributes.toArray();
        let attrsParsed: string[] = [];

        for (let index = 0; index < attrs.length; index++) {
          let item = attrs[index].toObject();

          let t = item.get('value');
          if (t) {
            attrsParsed.push(t.toString());
          }
        }

        metaDataEntity.attributes = attrsParsed;
      }

      metaDataEntity.save();
    }

  };

  entity.save();
}
