# Tachyon Sigma Pass

Build completed: QmQu6r7uSpkvtzLwogbKytm2eXqgpPE3WT3wcgEC3aCo5i

Deployed to https://thegraph.com/explorer/subgraph/anudit/tachyon-sigma-pass

Subgraph endpoints:
Queries (HTTP):     https://api.thegraph.com/subgraphs/name/anudit/tachyon-sigma-pass
Subscriptions (WS): wss://api.thegraph.com/subgraphs/name/anudit/tachyon-sigma-pass


## Examples

### Get Passes
```
{
  passes(first: 100, orderBy: tokenId, orderDirection: desc) {
    owner
    tokenId
    mintedOn
    txnHash
    tokenURI
    metadata {
      id
      name
      description
      image
      animation_url
      attributes
    }
  }
}
```
