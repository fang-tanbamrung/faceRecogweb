import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import Navbar from './components/Navbar/Navbar';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/imageLinkForm/imageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import 'tachyons';
import './App.css';

const app = new Clarifai.App({
  apiKey:'cb125f3832884dbaaae49e4458cc803a'
});

const particlesOption = {
  particles: {
    number:{
      value:100,
      density:{
        enable:true,
        value_area:800
      }
    },
    line_linked: {
      shadow: {
        enable: true,
        color: "#3CA9D1",
        blur: 5
      }
    }
  }
}

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      input:'',
      imageUrl:'',
      box:{},
      route:'signin',
      isSignin: false
    };
    this.onButtonSubmit = this.onButtonSubmit.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.calculateFaceLocation = this.calculateFaceLocation.bind(this);
    this.displayFaceBox = this.displayFaceBox.bind(this);
    this.onRouteChange = this.onRouteChange.bind(this);
  }

  calculateFaceLocation = (data) =>{
    const clarifais = data.outputs[0].data.regions.map(item => {
      return(item.region_info.bounding_box)
    })
    // console.log('clarifais',clarifais);
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    const clarifaiFace = clarifais.map(item => {
      return {
        left:item.left_col * width,
        top:item.top_row * height,
        right:width - (item.right_col * width),
        bottom:height - (item.bottom_row * height)
      }
      
    });
    // console.log('cal',clarifaiFace);
    return (clarifaiFace);
  }

  onRouteChange = (route) => {
    if(route === 'home'){
      this.setState({isSignin:true})
    }else{
      this.setState({isSignin:false})
    }
    this.setState({route:route})
  }

  displayFaceBox = (box) => {
    // console.log('Appbox',box);
    this.setState({box: box})
  }

  onInputChange(event){
    // console.log(event.target.value)
    this.setState({input:event.target.value});

  }

  onButtonSubmit(){
    this.setState(state => ({imageUrl:state.input}));
    console.log(this.state.imageUrl);
    app.models
      .predict (Clarifai.FACE_DETECT_MODEL, this.state.input)
      // .then(console.log)
      .then ((response) => this.displayFaceBox(this.calculateFaceLocation(response)))
      .catch ((err) => console.log(err));
  }

  render() {
    const {isSignin,route} = this.state;
    const {onRouteChange} = this;
    return (
      <div className='tc App'>
        <Particles params={particlesOption} className='particles'/>
        <Navbar isSignin = {isSignin} onRouteChange = {onRouteChange} className='ba bw2' />
        {route === 'home'?
          <div><Logo />
          <Rank/>
          <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
          <FaceRecognition box = {this.state.box} imageUrl={this.state.imageUrl}/>
          </div>
        :(route === 'register'
        ?<Register onRouteChange = {onRouteChange}/>
        :<Signin onRouteChange = {onRouteChange}/>
        )}
      </div>
    );
  }
}

export default App;
