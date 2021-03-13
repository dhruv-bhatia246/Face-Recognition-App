import './App.css';
import React from 'react';
import Navigation from './Components/Navigation/Navigation';
import Logo from './Components/Logo/Logo';
import Imagelinkform from './Components/ImageLink/ImageLink';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition.js';
import Rank from './Components/Rank/Rank';
import Particles from 'react-particles-js';
import Signin from './Components/Signin/Signin';
import Register from './Components/Register/Register';

const particlesOptions = {
  particles: {
    number: {
      value: 100,
      density: {
        enable: true,
        value_area: 800
      }
    },
    polygon: {
      enable: true,
      type: 'inside',
      move: {
        radius: 100
      },
    }
  }
}

const initialState = {
  input: '',
  imageUrl: '',
  box: {},
  route: 'signin',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    password: '',
    entries: 0,
    joined: ''
  }
};

class App extends React.Component {
  constructor() {
    super();
    this.state = initialState;
  }

  loadUser = (data) => {
    this.setState({user: {
        id: data.id,
        name: data.name,
        email: data.email,
        password: data.password,
        entries: data.entries,
        joined: data.joined
    }})
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = image.width;
    const height = image.height;
    return {
      topRow: clarifaiFace.top_row * height,
      bottomRow: height - (clarifaiFace.bottom_row * height),
      leftCol: clarifaiFace.left_col * width,
      rightCol: width - (clarifaiFace.right_col * width),
    }
  }

  displayBox = (box) => {
    this.setState({ box: box });
  }

  onURLchange = (event) => {
    this.setState({ input: event.target.value });
  }

  onRouteChange = (route) => {
    if (route === 'register' || route === 'signin')
      this.setState(initialState)
    else if (route === 'home')
      this.setState({ isSignedIn: true });
    this.setState({ route: route });
  }

  onSubmit = () => {
    this.setState({ imageUrl: this.state.input });
    fetch('https://dhruv-face-detection-app.herokuapp.com/imageurl',{
      method: 'post',
      headers : {'Content-Type': 'application/json'},
      body: JSON.stringify({
        input: this.state.input
      })
    })
      .then(response => response.json())
      .then(response =>{ 
        if(response) {
        fetch('https://dhruv-face-detection-app.herokuapp.com/image',{
          method: 'put',
          headers : {'Content-Type': 'application/json'},
          body: JSON.stringify({
            id: this.state.user.id
        })
      })
      .then(response => response.json())
      .then(count => {
        this.setState(Object.assign(this.state.user, {entries:count}))
      })
      .catch(err => response.json(err))
    }
        this.displayBox(this.calculateFaceLocation(response))})
      .catch(err => console.log(err))

  }
  render() {
    const { isSignedIn, box, route, imageUrl } = this.state;
    return (
      <div className="App">
        <Particles className='particles'
          params={particlesOptions} />
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} route={route} />
        {(route === 'home') ?
          <div>
            <Logo />
            <Rank name={this.state.user.name} entries={this.state.user.entries}/> 
            <Imagelinkform
              onURLchange={this.onURLchange}
              onSubmit={this.onSubmit}
            />
            <FaceRecognition box={this.state.box} imageUrl={imageUrl} />
          </div>

          : (
            this.state.route === 'signin'
              ? <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange} /> 
              : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
          )
        }
      </div>
    );
  }
}

export default App;
