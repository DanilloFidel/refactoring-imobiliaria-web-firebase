export default function switchScroll(hidden?: string): void{
    document.body.style.overflow = hidden || "visible"
}
