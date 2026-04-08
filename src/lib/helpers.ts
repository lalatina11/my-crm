export function capitalizingText(text: string) {
	const char1 = text.charAt(0).toUpperCase();
	return char1 + text.slice(1, text.length).toLowerCase();
}

export function handleCopyToClipBoard(text: string) {
	navigator.clipboard.writeText(text);
}
