export default () => {
	if (Element && !Element.prototype.closest) {
		Element.prototype.closest = function(s: string) {
			const matches: NodeList = this.ownerDocument.querySelectorAll(s);

			let i: number | undefined;
			let el: Element = this;

			do {
				i = matches.length;
				while (--i >= 0 && matches.item(i) !== el) {}
			} while (i < 0 && (el = el.parentElement as Element));
			return el;
		};
	}
}
