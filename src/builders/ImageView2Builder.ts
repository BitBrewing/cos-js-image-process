import { ImageFormat } from "../interfaces";
import { BuilderBase } from "./BuilderBase";

export class ImageView2Builder extends BuilderBase {
    constructor() {
        super('imageView2');
    }

    private readonly _thumbnai = (index: number, w?: number, h?: number) => {
        this.appendArgs(index);

        if (w) {
            this.appendArgs('w').appendArgs(w);
        }
        if (h) {
            this.appendArgs('h').appendArgs(h);
        }

        return this;
    }

    /**
     * 限定缩略图的长边最多为&lt;LongEdge&gt;，短边最多为&lt;ShortEdge&gt;，进行等比缩放，不裁剪。如果只指定w参数则表示限定长边（短边自适应），只指定h参数则表示限定短边（长边自适应）
     * 
     * 当图片长宽相同时，默认长边为图片的高。
     */
    thumbnai0 = (longEdge?: number, shortEdge?: number) => {
        return this._thumbnai(0, longEdge, shortEdge);
    }

    /**
     * 限定缩略图的宽高最小值。该操作会将图像等比缩放直至某一边达到设定最小值，之后将另一边居中裁剪至设定值。若只指定一边，则表示宽高相等的正方形。
     * 
     * 例如，原图大小为1000x500，将参数设定为?imageView2/1/w/500/h/400 后，图像会先等比缩放至800x400，之后左右各裁剪150，得到500x400大小的图像。
     */
    thumbnai1 = (width?: number, height?: number) => {
        return this._thumbnai(1, width, height);
    }

    /**
     * 限定缩略图的宽高最大值。该操作会将图像等比缩放至宽高都小于设定最大值。
     * 
     * 例如，原图大小为 1000x500，将参数设定为?imageView2/2/w/500/h/400后，图像会等比缩放至500x250。如果只指定一边，则另一边自适应。
     */
    thumbnai2 = (width?: number, height?: number) => {
        return this._thumbnai(2, width, height);
    }

    /**
     * 限定缩略图的宽高最小值。该操作会将图像等比缩放至宽高都大于设定最小值。
     * 
     * 例如，原图大小为 1000x500，将参数设定为?imageView2/3/w/500/h/400后，图像会等比缩放至800x400。如果只指定一边，则另一边设为相同值。
     */
    thumbnai3 = (width?: number, height?: number) => {
        return this._thumbnai(3, width, height);
    }

    /**
     * 限定缩略图的长边和短边的最小值分别为 LongEdge 和 ShortEdge，进行等比压缩；如果只指定一边，代表另外一边为同样的值 。
     * 
     * 当图片长宽相同时，默认长边为图片的高。
     */
    thumbnai4 = (longEdge?: number, shortEdge?: number) => {
        return this._thumbnai(4, longEdge, shortEdge);
    }

    /**
     * 限定缩略图的长边和短边的最大值分别为 LongEdge 和 ShortEdge，进行等比压缩，居中裁剪；如果只指定一边，则表示宽高相等的正方形；缩放后其中一边多余的部分会被裁剪掉。
     * 
     * 当图片长宽相同时，默认长边为图片的高。
     */
    thumbnai5 = (longEdge?: number, shortEdge?: number) => {
        return this._thumbnai(5, longEdge, shortEdge);
    }

    /**
     * 目标缩略图的图片格式，Format 可为：jpg，bmp，gif，png，webp，缺省为原图格式。
     */
    format = (value: ImageFormat) => {
        return this.appendArgs('format', value);
    }

    /**
     * 图片质量，取值范围0 - 100，默认值为原图质量；取原图质量和指定质量的最小值。
     * 
     * @param force 表示强制使用指定值
     */
    quality = (value: number, force?: boolean) => {
        return this.appendArgs('q', value + (force ? '!' : ''));
    }

    /**
     * 图片的相对质量，取值范围0 - 100，数值以原图质量为标准。例如原图质量为80，将 rquality 设置为80后，得到处理结果图的图片质量为64（80x80%）。
     */
    rquality = (value: number) => {
        return this.appendArgs('rq', value);
    }

    /**
     * 图片的最低质量，取值范围0 - 100，设置结果图的质量参数最小值。
     * 
     * 例如，原图质量为85，将 lquality 设置为80后，处理结果图的图片质量为85 。
     * 
     * 例如，原图质量为60，将 lquality 设置为80后，处理结果图的图片质量会被提升至80。
     */
    lquality = (value: number) => {
        return this.appendArgs('lq', value);
    }

    /**
     * 当处理参数中携带此参数时，针对文件过大、文件格式有误等外部因素导致的处理失败的场景，会直接返回原图而不报错。
     */
    ignoreError = () => {
        return this.appendArgs('ignore-error', 1);
    }
}