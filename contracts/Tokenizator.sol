pragma solidity ^0.4.18;

import "zeppelin-solidity/contracts/token/ERC721/ERC721Token.sol";
import "zeppelin-solidity/contracts/math/SafeMath.sol";

/**
 * @title Tokenizator
 * @dev A ERC721 contract with token metadata, allows the creation of one token
   per day by any address.
 */
contract Tokenizator is ERC721Token {
  using SafeMath for uint256;

  struct TokenMetadata {
    bytes32 name;
    uint256 creationTimestamp;
    address creator;
    string description;
    string base64Image;
  }

  uint256 public lockTimestamp;

  mapping(uint256 => TokenMetadata) public tokenMetadata;

  function Tokenizator() {
    lockTimestamp = now;
  }

  /**
  * @dev Public fuction to create a token, it creates only 1 token per hour
  * @param _name bytes32 Name of the token
  * @param _description string Description of the token
  * @param _base64Image string image in base64
  */
  function createToken(
    bytes32 _name, string _description, string _base64Image
  ) public {
    require(now > lockTimestamp);
    lockTimestamp = lockTimestamp.add(1 days);
    uint256 _tokenId = totalSupply().add(1);
    _mint(msg.sender, _tokenId);
    addTokenMetadata(_tokenId, _name, _description, _base64Image);
  }

  /**
  * @dev Internal function to add a the metadata of a token
  * @param _tokenId uint256 ID of the token to be added to the tokens list of the given address
  * @param _name bytes32 Name of the token
  * @param _description string Description of the token
  * @param _base64Image string image in base64
  */
  function addTokenMetadata(
    uint256 _tokenId, bytes32 _name, string _description, string _base64Image
  ) private {
    tokenMetadata[_tokenId] = TokenMetadata(
      _name, now, msg.sender, _description, _base64Image
    );
  }

  /**
  * @dev Burns a specific token
  * @param _tokenId uint256 ID of the token being burned by the msg.sender
  */
  function _burn(uint256 _tokenId) onlyOwnerOf(_tokenId) internal {
    delete tokenMetadata[_tokenId];
    super._burn(_tokenId);
  }
}
