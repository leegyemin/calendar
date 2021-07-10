let color,
  letters = '0123456789ABCDEF'.split('');

const _AddDigitToColor = limit => {
  color += letters[Math.round(Math.random() * limit)];
};
export const GetRandomColor = () => {
  color = '#';
  _AddDigitToColor(5);
  for (let i = 0; i < 5; i++) {
    _AddDigitToColor(15);
  }
  return color;
};
