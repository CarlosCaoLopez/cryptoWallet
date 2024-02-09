require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    ganache: {
      url: "http://localhost:7545", // La URL de Ganache
    },
  },
  solidity: "0.5.0",
};
