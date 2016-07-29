import React, { Component } from 'react';
import { transform } from 'babel-core';
import { Grid, Row, Col } from '@teachers/tpt-ui';
import transformLegacyDecorators from 'babel-plugin-transform-decorators-legacy';
import es2015 from 'babel-preset-es2015';
import stage0 from 'babel-preset-stage-0';
import react from 'babel-preset-react';
import CodeMirror from 'react-codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/jsx/jsx';
import './CodePlayground.scss';

class CodePreview extends Component {
  constructor(...args) {
    super(...args);
    const { code } = this.props;
    this.state = {
      compiledCode: this.compileCode(code)
    };
  }

  componentWillReceiveProps({ code }) {
    this.setState({
      compiledCode: this.compileCode(code)
    });
  }

  compileCode(code) {
    return transform(code, {
      presets: [es2015, stage0, react],
      plugins: [transformLegacyDecorators]
    }).code;
  }

  render() {
    const { component, ...compProps } = this.props;
    const { compiledCode } = this.state;

    // gotta get location data here since the iframe's host is a data url
    const vendorSrc = `${location.href.split('/').slice(0, -1).join('/')}/vendor.js`;
    const { protocol } = location;

    const htmlContent = `
      <script src="${vendorSrc}"></script>
      <div id="main"></div>
      <script>

        // overwriting fetch so we can force all requests to go to placeholder api
        var _fetch = fetch;
        var fetch = function () {
          var urlParts = arguments[0].split('/');
          urlParts[0] = '${protocol}';
          urlParts[2] = 'jsonplaceholder.typicode.com';
          arguments[0] = urlParts.join('/');
          return _fetch.apply(this, arguments);
        };

        // overwriting require so we can use global vendor libs
        var require = function (module) {
          return window[{
            refry: 'Refry',
            react: 'React',
            'react-dom': 'ReactDOM'
          }[module]];
        };

        ${compiledCode}

        // finally rendering our component wrapped in a ConnectProvider
        ReactDOM.render(
          React.createElement(Refry.ConnectProvider, {
            children: React.createElement(${component}, ${JSON.stringify(compProps)})
          }),
          document.getElementById('main')
        );
      </script>
    `;

    return (
      <iframe src={ `data:text/html;charset=utf-8,${escape(htmlContent)}` } />
    );
  }
}

class CodePlayground extends Component {
  constructor(...args) {
    super(...args);
    const { children } = this.props;
    this.state = { code: children };
  }

  handleChange(code) {
    this.setState({ code });
  }

  render() {
    const { code } = this.state;
    const { noPreview } = this.props;
    return (
      <div className="CodePlayground">
        <Grid>
          <Row className="center-xs">
            <Col md={8}>
              <div className="CodePlayground__editor">
                <CodeMirror
                  value={ code }
                  onChange={ this.handleChange.bind(this) }
                  options={ {
                    viewportMargin: Infinity,
                    mode: 'jsx',
                    theme: 'neat',
                    indentWithTabs: false,
                    indentUnit: 2,
                    readOnly: noPreview
                  } }
                />
              </div>
            </Col>
            { !noPreview &&
              <Col md={4}>
                <div className="CodePlayground__iframe">
                  <p>Preview:</p>
                  <CodePreview code={ code } { ...this.props } />
                </div>
              </Col> }
          </Row>
        </Grid>
      </div>
    );
  }
}

export default CodePlayground;
