import React, { Component } from "react";
import canaLogo from "../cana-logo.png";
import "./App.css";
import Web3 from "web3"; //Para conectarnos a la blockchain
import DaiTokenMock from "../abi/DaiTokenMock.json";

class App extends Component {
  //El objeto state de React almacena datos que pueden variar con el teimpo y
  //cuando detecta aun cambio, se encarga de re-redenrizar para mantener la interfaz gráfica actualizada
  constructor(props) {
    super(props);
    this.state = {
      //Dentro del objeto state de react vamos a guardar todaas estas variables
      account: "",
      daiTokenMock: null,
      balance: 0,
      transactions: [],
    };

    this.transfer = this.transfer.bind(this); //Hacemos que el método transfer que hemos creado abajo sea un método de la clase APP
  }

  async componentWillMount() {
    //Función para conectarnos a la blockchain
    await this.loadWeb3();
    await this.loadBlockchainData(); //Función para cargar información de la blockchain: conectarse al smart contracts, crear transacciones...
  }

  async loadWeb3() {
    //Codigo especificado en los docs de metamask para conectar la app a la blockchain
    if (window.ethereum) {
      //Comprueba si la variable window.ethereum está definida. MetaMask inyecta esta variable en el ámbito global del navegador. Si está presente, significa que MetaMask está instalado y disponible.
      window.web3 = new Web3(window.ethereum); //Crea una instancia de la clase Web3 utilizando el proveedor Ethereum proporcionado por MetaMask.
      await window.ethereum.enable(); //Pide al usuario que habilite la conexión con la aplicación. Esto es necesario para que la aplicación pueda interactuar con la cuenta de MetaMask del usuario.
    } else if (window.web3) {
      //Si no hay window.ethereum pero existe window.web3, significa que MetaMask no está instalado, pero hay algún otro proveedor web3 (como en versiones anteriores de MetaMask).
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert(
        "Non-Ethereum browser detected. You should consider trying Metmask"
      );
    }
  }

  // Función para interactuar con la blockchain
  async loadBlockchainData() {
    const web3 = window.web3; //la variable global window es un objeto que hace referencia a la ventana del navegador en sí
    const accounts = await web3.eth.getAccounts(); //Obtenemos las cuentas conectadaas con metamask
    this.setState({ account: accounts[0] }); //Actualizamos el objeto de react state (ver docs de react)
    const daiTokenAddress = "0x0D09aC50acF85B9e1dD6Fd536a66d1484625CbA4"; //Dirección donde se desplegó el contrato. Puede ser una real
    const daiTokenMock = new web3.eth.Contract(
      DaiTokenMock.abi,
      daiTokenAddress
    ); //Accedemos al atributo abi del DaiTokenMock.json
    this.setState({ daiTokenMock: daiTokenMock });
    const balance = await daiTokenMock.methods
      .balanceOf(this.state.account)
      .call(); //con .call() hacemos que se ejecute la función

    this.setState({
      //Guardamos el balance de la cuenta
      balance: window.web3.utils.fromWei(balance.toString(), "Ether"),
    });
    const transactions = await daiTokenMock.getPastEvents("Transfer", {
      fromBlock: 0,
      toBlock: "latest",
      filter: { from: this.state.account },
    }); //Cada vez que se hace una transferencia de un ERC20 token se emite un evento. Podemos ver el log de estos gracias a esta función.
    this.setState({
      //Guardamos las trasnsaccines de la cuenta
      transactions: transactions,
    });
  }

  transfer(recipient, amount) {
    //Función para que el smart contract ejecute el trasnfer
    this.state.daiTokenMock.methods
      .transfer(recipient, amount)
      .send({ from: this.state.account });
  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
          <a
            className="navbar-brand col-sm-3 col-md-2 mr-0"
            href="http://www.dappuniversity.com/bootcamp"
            target="_blank"
            rel="noopener noreferrer"
          >
            Dapp University
          </a>
        </nav>
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex text-center">
              <div
                className="content mr-auto ml-auto"
                style={{ width: "400px" }}
              >
                <a
                  href="http://www.dappuniversity.com/bootcamp"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={canaLogo} width="150" />
                </a>
                <h1>{this.state.balance} DAI</h1>
                <form
                  onSubmit={(event) => {
                    //TODO: Handle submit
                    event.preventDefault();
                    const recipient = this.recipient.value; //this hace referncia a la venta? y recipient es el id del objeto creado abajo para llenar el campo
                    const amount = window.web3.utils.toWei(
                      this.amount.value,
                      "Ether"
                    );
                    this.transfer(recipient, amount);
                  }}
                >
                  <div className="form-group mr-sm-2">
                    <input
                      id="recipient"
                      type="text"
                      ref={(input) => {
                        this.recipient = input;
                      }}
                      className="form-control"
                      placeholder="Recipient Address"
                      required
                    />
                  </div>

                  <div className="form-group mr-sm-2">
                    <input
                      id="amount"
                      type="text"
                      ref={(input) => {
                        this.amount = input;
                      }}
                      className="form-control"
                      placeholder="Amount"
                      required
                    />
                  </div>

                  <button type="submit" className="btn btn-primary btn-block">
                    Send
                  </button>
                </form>
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">Recipient</th>
                      <th scope="col">value</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.transactions.map((tx, key) => {
                      return (
                        <tr key={key}>
                          <td>{tx.returnValues.to}</td>
                          <td>
                            {window.web3.utils.fromWei(
                              tx.returnValues.value.toString(),
                              "Ether"
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
