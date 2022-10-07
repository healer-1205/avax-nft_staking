// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract RewardToken is ERC20 {
  constructor() ERC20("RewardToken", "RTK") {
    _mint(msg.sender, 10000 * 10**decimals());
  }

  function decimals() public pure override returns (uint8) {
    return 6;
  }
}
