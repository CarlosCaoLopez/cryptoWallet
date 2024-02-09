// const Migrations = artifacts.require("Migrations"); //Importamos el contrato Migrations (el binario compilado)
// const DaiTokenMock = artifacts.require("DaiTokenMock"); //Importamos el contrato DaiTokenMock (el binario compilado)

// module.exports = async function(deployer) {
//   await deployer.deploy(Migrations);
//   await deployer.deploy(DaiTokenMock);

//   const tokenMock = await DaiTokenMock.deployed();

//   //Minteamos 1000 Dai Tokens al deployer

//   await tokenMock.mint(
//     "0xD556761C40C4A0E1170C32291056BEe7A163EE96",
//     "1000000000000000000000"
//   );
// };

//imports
const { ethers } = require("hardhat"); //Importamos la versionn wrapped por hardhat, así hardhat conoce los diferentes contrtos

//async main
async function main() {
  const MigrationsFactory = await ethers.getContractFactory("Migrations");
  const DaiTokenMockFactory = await ethers.getContractFactory("DaiTokenMock");

  ///////////////////////DEPLOYEAMOS Migrations a la blockchain de hardhat///////////////
  console.log("Deploying contract Migrations...");
  const Migrations = await MigrationsFactory.deploy();
  // await Migrations.deployed() REMOVED ON ETHERS VERSION 6 OR HIGHER

  console.log(`Deployed to: ${Migrations.target}`);

  ///////////////////////FIN DEPLOYEAMOS Migrations a la blockchain de hardhat///////////////

  ///////////////////////DEPLOYEAMOS DaiTokenMock a la blockchain de hardhat///////////////

  console.log("Deploying contract DaiTokenMock...");
  const DaiTokenMock = await DaiTokenMockFactory.deploy();

  // await Migrations.deployed() REMOVED ON ETHERS VERSION 6 OR HIGHER

  console.log(`Deployed to: ${DaiTokenMock.target}`);

  /////////////////////Fin del deploy DaiTokenMock///////////////////

  const mintResponse = await DaiTokenMock.mint(
    "0x5D1F8d8768DbD46cb77977D692102A680e1ce127",
    "1000000000000000000000"
  );

  // const balance = await DaiTokenMock.balanceOf(
  //   "0x764E10aFC25ca891dc7e5bDD805C38b35e290EA9"
  // );
  // console.log(`BalanceOf: ${balance}`);
}

//main
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
