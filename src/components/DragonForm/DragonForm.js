import React, { Component } from 'react'
import DragonAPI from '../../services/DragonAPI'
import { Link } from 'react-router-dom'
import Icon from '../../assets/img/dragon.svg'
import './Dragon.css'

class DragonForm extends Component {
  constructor (props) {
    super(props)
    this.state = {
      error: null
    }
  }
  
  createDragon = async (e) => {
    try {
      e.preventDefault()
      const formData = new FormData(e.target)
      const dragon = {
        'name': formData.get('name'),
        'type': formData.get('type'),
        'histories': formData.get('histories')
      }
      await DragonAPI.post(`/`, dragon)
      this.props.history.push('/')
    } catch (response) {
      this.setState({error: response.originalError.message})
    }
  }

  render () {
    const { error } = this.state

    if (error) {
      return <div className='text-center'>{error}</div>
    }

    return (
      <div className='container py-5'>
        <form onSubmit={this.createDragon} className='form-dragon'>
            <div className="container px-4 py-4">
              <div className="row mb-3">
                <div className="col text-center">
                  <img src={Icon} width='100'/>
                </div>
              </div>
              <div className="row justify-content-md-center">
              <div className="col-12 col-lg-8">
                  <div className="form-group">
                    <label>Name</label>
                    <input type="text" name="name" className="form-control mb-3" placeholder="Dragon Name"/>
                  </div>
                  <div className="form-group">
                    <label>Type</label>
                    <input type="text" name="type" className="form-control mb-3" placeholder="Dragon Type"/>
                  </div>
                  <div className="form-group">
                    <label>Histories</label>
                    <textarea name="histories" className="form-control" rows="10" placeholder="Dragon Histories"/>
                  </div>
                </div>                
                <div className="col-12 col-lg-8">
                  <button
                    className="btn btn-primary float-right mt-3"
                    title="Save Event">Salvar
                  </button>
                </div>
              </div>
            </div>
          </form>
      </div>
    )
  }
}

export default DragonForm