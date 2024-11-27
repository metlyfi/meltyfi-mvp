// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol";

contract LogoCollection is ERC1155, ERC1155Burnable, Ownable, ERC1155Supply {
    string private constant BASE_URI = "https://ipfs.io/ipfs/QmW7sq2pgiNMry7Syp3DEHSScSFKsfwVsGbQk394iuUQzF";

    constructor() 
        ERC1155(BASE_URI) 
        ERC1155Burnable() 
        Ownable(msg.sender) 
        ERC1155Supply() 
    {}

    function mint(address account, uint256 id, uint256 amount, bytes memory data)
        public
        onlyOwner
    {
        _mint(account, id, amount, data);
    }

    function mintBatch(address to, uint256[] memory ids, uint256[] memory amounts, bytes memory data)
        public
        onlyOwner
    {
        _mintBatch(to, ids, amounts, data);
    }

    function _update(address from, address to, uint256[] memory ids, uint256[] memory amounts)
        internal
        override(ERC1155, ERC1155Supply)
    {
        super._update(from, to, ids, amounts);
    }
}