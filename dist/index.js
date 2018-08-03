'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.loadingReducer = exports.hideLoading = exports.showLoading = exports.default = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LOADINGBAR_SHOW = 'LOADINGBAR_SHOW';
var LOADINGBAR_HIDE = 'LOADINGBAR_HIDE';

var showLoading = function showLoading() {
    return {
        type: LOADINGBAR_SHOW,
        loading: true
    };
};

var hideLoading = function hideLoading() {
    return {
        type: LOADINGBAR_HIDE,
        loading: false
    };
};

var loadingReducer = function loadingReducer() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    var action = arguments[1];

    switch (action.type) {
        case LOADINGBAR_SHOW:
            return action.loading;
        case LOADINGBAR_HIDE:
            return action.loading;
        default:
            return state;
    }
};

var LoadingBar = function (_React$Component) {
    _inherits(LoadingBar, _React$Component);

    function LoadingBar() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, LoadingBar);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = LoadingBar.__proto__ || Object.getPrototypeOf(LoadingBar)).call.apply(_ref, [this].concat(args))), _this), _this.initState = {
            percent: 0,
            status: 'hide',
            duration: 3000,
            opacity: 0,
            maxLoading: 95,
            updateTime: 200
        }, _this.stop = function () {
            window.setTimeout(function () {
                _this.setState(function (prevState) {
                    return {
                        percent: 100,
                        duration: 100
                    };
                });
            }, 10);

            window.setTimeout(function () {
                _this.setState(function () {
                    return _extends({}, _this.initState);
                });
            }, 200);
        }, _this.start = function () {
            _this.interval = window.setTimeout(function () {
                _this.setState(function (prevState) {
                    var percent = prevState.percent,
                        maxLoading = prevState.maxLoading;

                    if (percent <= maxLoading) {
                        return {
                            percent: maxLoading,
                            status: 'show',
                            opacity: 1
                        };
                    }
                });
            }, 10);
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(LoadingBar, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            var _this2 = this;

            this.setState(function () {
                return _extends({}, _this2.initState);
            });
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            if (this.props.loading) {
                this.start();
            }
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
            if (this.props.loading) {
                this.start();
            } else if (!this.props.loading && this.state.status === 'show') {
                this.stop();
            }
        }
    }, {
        key: 'style',
        value: function style() {
            var transition = this.state.status === 'show' ? 'transform ' + this.state.duration + 'ms ease-in-out' : '';

            var t = {
                opacity: this.state.opacity,
                width: '100%',
                transform: 'scaleX(' + this.state.percent / 100 + ')',
                willChange: 'transform, opacity',
                height: 3,
                position: 'fixed',
                backgroundColor: 'red',
                // transition: `transform ${this.state.duration}ms ease-in-out`,
                transition: '' + transition,
                transformOrigin: 'left'
            };
            return t;
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement('div', { style: this.style() });
        }
    }]);

    return LoadingBar;
}(_react2.default.Component);

LoadingBar.defaultProps = {
    loading: false
};


LoadingBar.propTypes = {
    loading: _propTypes2.default.bool.isRequired
};

var mapStateToProps = function mapStateToProps(_ref2) {
    var loading = _ref2.loading;

    return {
        loading: loading
    };
};

var ConnectedLoadingBar = (0, _reactRedux.connect)(mapStateToProps)(LoadingBar);

exports.default = ConnectedLoadingBar;
exports.showLoading = showLoading;
exports.hideLoading = hideLoading;
exports.loadingReducer = loadingReducer;
