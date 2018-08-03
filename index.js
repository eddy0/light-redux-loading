import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

const LOADINGBAR_SHOW = 'LOADINGBAR_SHOW'
const LOADINGBAR_HIDE = 'LOADINGBAR_HIDE'

const showLoading = () => {
    return {
        type: LOADINGBAR_SHOW,
        loading: true,
    }
}

const hideLoading = () => {
    return {
        type: LOADINGBAR_HIDE,
        loading: false,
    }
}

const loadingReducer = (state = false, action) => {
    switch(action.type) {
        case LOADINGBAR_SHOW:
            return action.loading
        case LOADINGBAR_HIDE:
            return action.loading
        default:
            return state
    }
}


class LoadingBar extends React.Component {

    static defaultProps = {
        loading: false,
    }

    initState = {
        percent: 0,
        status: 'hide',
        duration: 3000,
        opacity: 0,
        maxLoading: 95,
        updateTime: 200,
    }

    componentWillMount() {
        this.setState(() => ({
            ...this.initState,
        }))
    }

    componentDidMount() {
        if(this.props.loading) {
            this.start()
        }
    }

    componentDidUpdate() {
        if(this.props.loading) {
            this.start()
        } else if(!this.props.loading && this.state.status === 'show') {
            this.stop()
        }
    }

    stop = () => {
        window.setTimeout(() => {
            this.setState((prevState) => {
                return {
                    percent: 100,
                    duration: 100,
                }
            })
        }, 10)

        window.setTimeout(() => {
            this.setState(() => ({
                ...this.initState,
            }))
        }, 200)
    }

    start = () => {
        this.interval = window.setTimeout(() => {
            this.setState((prevState) => {
                let {percent, maxLoading} = prevState
                if(percent <= maxLoading) {
                    return {
                        percent: maxLoading,
                        status: 'show',
                        opacity: 1,
                    }
                }
            })
        }, 10)
    }

    style() {
        let transition = this.state.status === 'show'
            ? `transform ${this.state.duration}ms ease-in-out`
            : ''

        let t = {
            opacity: this.state.opacity,
            width: '100%',
            transform: `scaleX(${this.state.percent / 100})`,
            willChange: 'transform, opacity',
            height: 3,
            position: 'fixed',
            backgroundColor: 'red',
            // transition: `transform ${this.state.duration}ms ease-in-out`,
            transition: `${transition}`,
            transformOrigin: 'left',
        }
        return t
    }

    render() {
        return (
            <div style={this.style()} />
        )
    }
}

LoadingBar.propTypes = {
    loading: PropTypes.bool.isRequired,
}

const mapStateToProps = ({loading}) => {
    return {
        loading,
    }
}

const ConnectedLoadingBar = connect(mapStateToProps)(LoadingBar)

export {
    ConnectedLoadingBar as default,
    showLoading,
    hideLoading,
    loadingReducer,
}
