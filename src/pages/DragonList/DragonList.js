import React, { Component } from 'react';
import DragonAPI from '../../services/DragonAPI'
import { Link } from 'react-router-dom'
import Icon from '../../assets/img/dragon.svg'
import './DragonList.css'

class DragonList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      dragons: []
    }
  }

  componentDidMount() {
    this.getDragons()
  }

  getDragons = async () => {
    try {
      const response = await DragonAPI.get('/')
      console.log(response);
      this.setState({dragons: response.data})
    } catch (response) {
      this.setState({error: response.originalError.message})
    }
  }

  render () {
    const { dragons } = this.state
    return (
      <div className='container py-5'>
        <h1 className='h3 mb-0 font-weight-normal text-white'>Dragons List</h1>
        <Link 
            to={`/dragon/add`} 
            className='btn btn-primary mt-2 mb-5'
          >Add Dragon</Link>
        <div className='row'>
          { 
            dragons.length > 0 && dragons.map((dragon, key) => (
              <div key={key} className='col-12 col-sm-4 col-lg-2 mb-5 text-center'>
                <Link 
                  to={`/dragon/${dragon.id}`} 
                  className='dragon-icon'
                >
                  <img src={Icon} width='100'/>
                  <h6 className='mt-2'>{dragon.name}</h6>
                </Link>
              </div>
          ))
          }
        </div>
      </div>
    )
  }
}

export default DragonList