export const convertNumberToString = amount => {
  /* tslint:disable */
  const stringNumber = [
    ' không ',
    ' một ',
    ' hai ',
    ' ba ',
    ' bốn ',
    ' năm ',
    ' sáu ',
    ' bảy ',
    ' tám ',
    ' chín ',
  ];
  const money = ['', ' nghìn', ' triệu', ' tỷ', ' nghìn tỷ', ' triệu tỷ'];
  function readHundreds(hundreds) {
    let tram;
    let chuc;
    let donvi;
    let result = '';
    tram = parseInt(`${hundreds / 100}`);
    chuc = parseInt(`${(hundreds % 100) / 10}`);
    donvi = hundreds % 10;
    if (tram == 0 && chuc == 0 && donvi == 0) return '';
    if (tram != 0) {
      result += stringNumber[tram] + ' trăm ';
      if (chuc == 0 && donvi != 0) result += ' linh ';
    }
    if (chuc != 0 && chuc != 1) {
      result += stringNumber[chuc] + ' mươi';
      if (chuc == 0 && donvi != 0) result = result + ' linh ';
    }
    if (chuc == 1) result += ' mười ';
    switch (donvi) {
      case 1:
        if (chuc != 0 && chuc != 1) {
          result += ' mốt ';
        } else {
          result += stringNumber[donvi];
        }
        break;
      case 5:
        if (chuc == 0) {
          result += stringNumber[donvi];
        } else {
          result += ' lăm ';
        }
        break;
      default:
        if (donvi != 0) {
          result += stringNumber[donvi];
        }
        break;
    }
    return result;
  }

  function readMoneyWithText(amount) {
    let loop = 0;
    let i = 0;
    let number = 0;
    let result = '';
    let tmp = '';
    let position = [];
    if (amount < 0) return 'Số tiền âm !';
    if (amount == 0) return 'Không đồng !';
    if (amount > 0) {
      number = amount;
    } else {
      number = -amount;
    }
    if (amount > 8999999999999999) {
      return 'Số quá lớn!';
    }
    position[5] = Math.floor(number / 1000000000000000);
    if (isNaN(position[5])) position[5] = '0';
    number = number - parseFloat(position[5].toString()) * 1000000000000000;
    position[4] = Math.floor(number / 1000000000000);
    if (isNaN(position[4])) position[4] = '0';
    number = number - parseFloat(position[4].toString()) * 1000000000000;
    position[3] = Math.floor(number / 1000000000);
    if (isNaN(position[3])) position[3] = '0';
    number = number - parseFloat(position[3].toString()) * 1000000000;
    position[2] = parseInt(`${number / 1000000}`);
    if (isNaN(position[2])) position[2] = '0';
    position[1] = parseInt(`${(number % 1000000) / 1000}`);
    if (isNaN(position[1])) position[1] = '0';
    position[0] = parseInt(`${number % 1000}`);
    if (isNaN(position[0])) position[0] = '0';
    if (position[5] > 0) {
      loop = 5;
    } else if (position[4] > 0) {
      loop = 4;
    } else if (position[3] > 0) {
      loop = 3;
    } else if (position[2] > 0) {
      loop = 2;
    } else if (position[1] > 0) {
      loop = 1;
    } else {
      loop = 0;
    }
    for (i = loop; i >= 0; i--) {
      tmp = readHundreds(position[i]);
      result += tmp;
      if (position[i] > 0) result += money[i];
      if (i > 0 && tmp.length > 0) result += ',';
    }
    if (result.substring(result.length - 1) == ',') {
      result = result.substring(0, result.length - 1);
    }
    result = result.substring(1, 2).toUpperCase() + result.substring(2);
    return result;
  }
  return readMoneyWithText(amount);
  /* tslint:enable */
};
