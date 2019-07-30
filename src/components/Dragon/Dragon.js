import React, { Component } from 'react'
import DragonAPI from '../../services/DragonAPI'
import { Link } from 'react-router-dom'
import Icon from '../../assets/img/dragon.svg'
import './Dragon.css'

class Dragon extends Component {
  constructor (props) {
    super(props)
    this.state = {
      dragon: null,
      isLoading: true,
      error: null
    }
  }

  componentDidMount() {
    this.getDragon()
  }

  getDragon = async () => {
    try {
      const response = await DragonAPI.get(`/${this.props.match.params.id}`)
      this.setState({dragon: response.data, isLoading: false})
    } catch (response) {
      this.setState({error: response.originalError.message})
    }
  }

  updateDragon = async (e) => {
    try {
      e.preventDefault()
      const formData = new FormData(e.target)
      const dragon = {
        'name': formData.get('name'),
        'type': formData.get('type')
      }
      await DragonAPI.put(`/${this.props.match.params.id}`, dragon)
      this.props.history.push('/')
    } catch (response) {
      this.setState({error: response.originalError.message})
    }
  }

  deleteDragon = async (e) => {
    try {
      e.preventDefault()
      await DragonAPI.delete(`/${this.props.match.params.id}`)
      this.props.history.push('/')
    } catch (response) {
      this.setState({error: response.originalError.message})
    }
  }

  render () {
    const { dragon, isLoading, error } = this.state
    if (isLoading) {
      return <div>Loading</div>
    }

    if (error) {
      return <div className='text-center'>{error}</div>
    }

    return (
      <div className='container py-5'>
        <form onSubmit={this.updateDragon} className='form-dragon'>
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
                    <input type="text" name="name" className="form-control mb-3" placeholder="Dragon Name" defaultValue={dragon.name}/>
                  </div>
                  <div className="form-group">
                    <label>Type</label>
                    <input type="text" name="type" className="form-control mb-3" placeholder="Dragon Type" defaultValue={dragon.type}/>
                  </div>
                  <div className="form-group">
                    <label>Histories</label>
                    <textarea name="histories" className="form-control" rows="10" placeholder="Dragon Histories" defaultValue={dragon.histories}/>
                  </div>
                  <small className="form-text text-muted">Created at: {dragon.createdAt}</small>
                </div>                
                <div className="col-12 col-lg-8">
                  <button
                    className="btn btn-danger mt-3"
                    title="Delete Dragon"
                    onClick={(e) => this.deleteDragon(e)}>Delete
                  </button>
                  <button
                    className="btn btn-primary float-right mt-3"
                    title="Save Dragon">Save
                  </button>
                </div>
              </div>
            </div>
          </form>
      </div>
    )
  }
}

export default Dragon