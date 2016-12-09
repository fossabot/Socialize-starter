import React from 'react';

export default class LanguageSelect extends React.Component {
  changeLang(e) {
    const { changeLang } = this.props;
    changeLang(e.target.value);
    location.reload();
  }

  render() {
    if ( this.props.hide ) {
      return null;
    }

    const options = this.props.languages.map((lang) => {
      return <option key={lang.code} value={lang.code}>{lang.native}</option>;
    });

    return (<select className="browser-default" onChange={this.changeLang} value={this.props.currentLang}>
      {options}
    </select>);
  }
}

LanguageSelect.propTypes = {
  changeLang: React.PropTypes.func.isRequired,
  currentLang: React.PropTypes.string.isRequired,
  hide: React.PropTypes.bool.isRequired,
  languages: React.PropTypes.arrayOf( React.PropTypes.object ).isRequired,
};

LanguageSelect.defaultProps = {
  currentLang: 'en',
  hide: false,
};
