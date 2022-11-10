//as Korean font is creating issue, we are only using Robot font
const fontSelector = (fontName) =>{

  if(fontName == 'regular')
    return 'Roboto-Regular';
  else if(fontName == 'medium')
    return 'Roboto-Medium';
  else if(fontName == 'bold')
    return 'Roboto-Bold';
  else if(fontName == 'light')
    return 'Roboto-Light';

}
module.exports = fontSelector;
