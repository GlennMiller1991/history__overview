export class StyleLoader {
    static async load(url: string): Promise<boolean> {
        return new Promise((res, rej) => {
            let link = document.createElement("link");
            link.type = "text/css";
            link.rel = "stylesheet";
            link.href = url;
            link.onload = function () {
                setTimeout(() => {
                    res(true)
                }, 500)
            };
            link.onerror = () => {
                document.head.removeChild(link)
                rej(false)
            }
            document.head.appendChild(link)
        })
    }
}