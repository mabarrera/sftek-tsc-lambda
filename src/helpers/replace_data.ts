export const replaceSpecialChars = (text:string) => {
  const replaceText = replaceSpace(text);
  const chars = replaceText.split('');
  const from = 'áéíóúñ';
  const to = 'aeioun';
  chars.map( (char,index) => {
    const i = from.indexOf(char);
    chars[index] = i !== -1 ? to[i] : char
  })
  return chars.join('')
}

export const replaceSpace = (text:string) => {
  const chars = text.split('');
  for(const [i, char] of chars.entries()){
    chars[i] = char == ' ' ? '_' : char;
  }
  return chars.join('')
}