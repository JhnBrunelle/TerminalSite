export default function() {
  this.transition(
    this.hasClass('liquid-dialog-container'),
    this.toValue(true),
    this.use('to-up'),
    this.reverse('to-down')
  );
}
