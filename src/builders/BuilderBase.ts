function base64Encode(str: string) {
    // 检测是否在Node.js环境中
    if (typeof window === "undefined") {
        // Node.js中使用Buffer进行编码
        return Buffer.from(str).toString('base64');
    } else {
        // 浏览器中使用btoa进行编码
        return btoa(str);
    }
}

export abstract class BuilderBase {
    private _args = '';

    constructor(private readonly _piplineName: string) {
    }

    protected appendArgs = (...args: any[]) => {
        for (const arg of args) {
            if (arg){
                this._args += '/' + String(arg);    
            }
        }

        return this;
    }

    protected appendBase64Args = (...args: string[]) => {
        for (const arg of args) {
            this.appendArgs(base64Encode(arg));
        }

        return this;
    }

    build = () => {
        return this._piplineName + this._args;
    }
}