import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appAlphanumeric]'
})
export class AlphanumericDirective {

  // Regular expression to match only alphabets and numbers
  private regex: RegExp = /^[a-zA-Z0-9-_]*$/;

  // Allow key codes for special keys
  private specialKeys: Array<string> = ['Backspace', 'Tab', 'End', 'Home', 'ArrowLeft', 'ArrowRight'];

  constructor(private el: ElementRef) {}

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    if (this.specialKeys.indexOf(event.key) !== -1) {
      // Allow special keys
      return;
    }

    // Test the input against the regular expression
    const inputValue: string = this.el.nativeElement.value + event.key;
    if (!this.regex.test(inputValue)) {
      // If the input does not match, prevent the key press
      event.preventDefault();
    }
  }
}
