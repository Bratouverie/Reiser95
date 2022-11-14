// Копировать текст
export const copyText = (text) => {
    navigator.clipboard.writeText(text);
    alert("Copied!");
}