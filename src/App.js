import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './components/header';
import CardSection from './containers/CardSection';
import StorageService from './utils/localStorageService';

const _instanceStorage = new StorageService(); //Instancia del storageService.
class App extends Component {
  constructor() {
    super();

    this.state = {
      title: "",
      img: "",
      data: [],
    }

    this.handleOnChangeInput = this.handleOnChangeInput.bind(this);
    this.handleOnClick = this.handleOnClick.bind(this);
  }

  componentDidMount() {
    // En este ciclo de vida es el indicado para saber si tengo o no datos en el localStorage.
    // Traer datos, condicionar, si tengo actualizar el estado.

    var arrStr = localStorage.getItem('memes');

    if (arrStr != null) {
      var arrMeme = JSON.parse(arrStr);
      for (var i = 0; i < arrMeme.length; i++) {
        var sondiv = document.createElement("div");
        sondiv.setAttribute("class", "card");
        var sonimg = document.createElement("img");
        sonimg.setAttribute("src", arrMeme[i].img);
        sonimg.setAttribute("alt", arrMeme[i].title);
        sonimg.setAttribute("class", "card-figure");
        var sonh3 = document.createElement("h3");
        sonh3.innerHTML = arrMeme[i].title;
        sondiv.appendChild(sonimg);
        sondiv.appendChild(sonh3);
        document.getElementsByClassName("card-list")[0].appendChild(sondiv);
      }
    } else {
      var arrMeme = [];
    }
  }

  handleOnChangeInput(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleOnClick() {
    const { data, title, img } = this.state;

    const addData = [...data, {
      title,
      img
    }];

    this.setState({
      data: addData
    })

    //Aquí se debería setear el localStorage.
    var arrStr = localStorage.getItem('memes');

    if (arrStr != null) {
      var arrMeme = JSON.parse(arrStr);
    }else{
      var arrMeme = [];  
    }

    arrMeme.push(this.state);
    
    var cStr = JSON.stringify(arrMeme);
    
    localStorage.setItem("memes", cStr);
  }

  render() {
    return (
      <div className="wrapper">
        <div className="container-header">
          <Header title="MemeApp" />
          <nav className="nav-app">
            <input type="text" onChange={this.handleOnChangeInput} placeholder="Ingrese un title" name="title" value={this.state.title} />
            <input type="text" onChange={this.handleOnChangeInput} placeholder="Ingrese una url" name="img" value={this.state.img} />
            <button onClick={this.handleOnClick}> Agregar </button>
          </nav>
        </div>

        <CardSection data={this.state.data} />
      </div>
    )
  }
}

export default App;
