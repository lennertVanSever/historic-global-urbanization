import { mapRange } from './utils/remapping.js';

export class Color {
  constructor(weight) {
    this.weight = weight;
  }

  getValue() {
    const red = 255;
    let green = 255;
    let blue = 255;
    if (this.weight > 0) {
      blue = Math.round(mapRange(this.weight, 0, 0.5, 255, 0));
      if (blue < 0) {
        blue = 0;
      }
    }
    if (this.weight > 0.5) {
      green = Math.round(mapRange(this.weight, 0, 1, 255, 0));
    }
    return this.rgbToHex(red, green, blue);
  }

  componentToHex(c) {
    const hex = c.toString(16);
    return hex.length === 1 ? `0${hex}` : hex;
  }

  rgbToHex(r, g, b) {
    return `#${this.componentToHex(r)}${this.componentToHex(
      g
    )}${this.componentToHex(b)}`;
  }
}
