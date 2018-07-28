# light-redux-loading
a light scale of redux loading


![loadingbar](https://raw.githubusercontent.com/eddy0/dailyReact/master/006-redux-loading/loading.gif)

## npm
```
yarn add light-redux-loading
```

## core
```
import {
    LoadingBar
    showLoading,
    hideLoading,
    loadingReducer } from 'light-redux-loading'

```


## useage

#### component
```
import {LoadingBar} from 'light-redux-loading'

export default class Header extends React.Component {
  render() {
    return (
      <header>
        <LoadingBar />
      </header>
    )
  }
}
```

#### reducers

```
import { combineReducers } from 'redux'
import { loadingReducer } from 'light-redux-loading'

const reducer = combineReducers({
  loading: loadingReducer,
})
```

#### action

```
import { showLoading, hideLoading } from 'light-redux-loading'

const handleInitalAction = () => {
    return (dispatch) => {

        dispatch(showLoading())

        API().fetchData()
        .then((data) => {
            dispatch(handleInitaldata(data))

            dispatch(hideLoading())
        })
    }
}

```
