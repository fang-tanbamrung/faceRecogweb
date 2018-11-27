import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Navbar from './components/Navbar/Navbar';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/imageLinkForm/imageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import 'tachyons';
import './App.css';



const initialState = {
  input:'',
  imageUrl:'',
  box:{},
  route:'signin',
  isSignin: false,
  user:{
    id:'',
    name:'',
    email:'',
    entries: 0 ,
    joined: ''
  }
}

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
    this.state = initialState;
  
    this.onButtonSubmit = this.onButtonSubmit.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.calculateFaceLocation = this.calculateFaceLocation.bind(this);
    this.displayFaceBox = this.displayFaceBox.bind(this);
    this.onRouteChange = this.onRouteChange.bind(this);
  }

  loadUser = (data) => {
    this.setState({user:{
      id:data.id,
      name:data.name,
      email:data.email,
      entries: data.entries ,
      joined: data.joined
    }
    })
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
      this.setState(initialState);
      // this.setState({isSignin:false})
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
    this.setState({imageUrl:this.state.input})
    // console.log(this.state.imageUrl);
    fetch('https://limitless-forest-85460.herokuapp.com/imageUrl',{
            method:'post',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({
              input:this.state.input
            })
          })
      .then(res => res.json())
      .then ((response) => {
        if(response) {
          fetch('https://limitless-forest-85460.herokuapp.com/image',{
            method:'put',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({
              id:this.state.user.id
            })
          })
            .then(res => res.json())
            .then(count => {
              this.setState(Object.assign(this.state.user,{entries:count}))
            })
        }
        this.displayFaceBox(this.calculateFaceLocation(response))})
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
          <Rank name = {this.state.user.name} entries = {this.state.user.entries} />
          <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
          <FaceRecognition box = {this.state.box} imageUrl={this.state.imageUrl}/>
          </div>
        :(route === 'register'
        ?<Register loadUser={this.loadUser} onRouteChange = {onRouteChange}/>
        :<Signin loadUser={this.loadUser} onRouteChange = {onRouteChange}/>
        )}
      </div>
    );
  }
}

export default App;
