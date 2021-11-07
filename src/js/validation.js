/* eslint-disable no-unused-expressions */
export default class Valid {
  constructor() {
    this.maestro = document.querySelector('.maestro');
    this.mastercard = document.querySelector('.mastercard');
    this.visa = document.querySelector('.visa');
    this.world = document.querySelector('.world');
    this.button = document.querySelector('.button');
    this.input = document.querySelector('.input');
  }

  hidden() {
    this.maestro.hidden = true;
    this.mastercard.hidden = true;
    this.visa.hidden = true;
    this.world.hidden = true;
  }

  listner() {
    this.button.addEventListener('click', (e) => {
      e.preventDefault();
      this.hidden();
      this.test();
      this.input.value = '';
    });
  }

  test() {
    if (/^\d*$/.test(this.input.value) && this.input.value.length >= 13) {
      if (this.luhn()) {
        this.choice();
      } else (alert('Контрольное число не совпадает!'));
    } else { alert('Введены некоректные данные!'); }
  }

  choice() {
    if (/^4/.test(this.input.value)) {
      this.visa.hidden = false;
    } else if (/^5018/.test(this.input.value) || /^5020/.test(this.input.value) || /^5038/.test(this.input.value) || /^5893/.test(this.input.value) || /^6304/.test(this.input.value)
      || /^6759/.test(this.input.value) || /^6761/.test(this.input.value) || /^6762/.test(this.input.value) || /^6763/.test(this.input.value)) {
      this.maestro.hidden = false;
    } else if (/^2200/.test(this.input.value) || /^2201/.test(this.input.value) || /^2202/.test(this.input.value) || /^2203/.test(this.input.value) || /^2204/.test(this.input.value)) {
      this.world.hidden = false;
    } else if (/^51/.test(this.input.value) || /^52/.test(this.input.value) || /^53/.test(this.input.value) || /^54/.test(this.input.value) || /^55/.test(this.input.value)) {
      this.mastercard.hidden = false;
    }
  }

  luhn() {
    let sum = 0;
    for (let i = this.input.value.length - 2; i >= 0; i -= 2) {
      (this.input.value[i] * 2) > 9 ? (sum = sum + Number(this.input.value[i] * 2) - 9)
        : (sum += Number(this.input.value[i] * 2));
      (i - 1) >= 0 ? sum += Number(this.input.value[i - 1]) : sum;
    }
    if ((10 - (sum % 10)) === Number(this.input.value[this.input.value.length - 1])) {
      return true;
    } return false;
  }
}
