import { BuilderBase, ExifBuilder, ImageAveBuilder, ImageInfoBuilder, ImageMogr2Builder, ImageSlimBuilder, ImageView2Builder, TextWatermarkBuilder } from "./builders";

export class CosImageBuilder {
    private readonly _piplines = Array<BuilderBase>();

    private readonly _createPipline = <T extends BuilderBase>(builder: T) => {
        return (configure?: (builder: T) => void) => {
            configure?.(builder);

            this._piplines.push(builder);
            return this;
        }
    }

    /**
     * 图片处理
     */
    imageMogr2 = this._createPipline(new ImageMogr2Builder());

    /**
     * 快速缩略模板
     */
    imageView2 = this._createPipline(new ImageView2Builder());

    /**
     * 文字水印
     */
    textWatermark = this._createPipline(new TextWatermarkBuilder());

    /**
     * 极智压缩
     */
    imageSlim = this._createPipline(new ImageSlimBuilder());

    /**
     * 获取图片基本信息
     */
    imageInfo = this._createPipline(new ImageInfoBuilder());

    /**
     * 获取图片 EXIF
     */
    exif = this._createPipline(new ExifBuilder());

    /**
     * 获取图片主色调
     */
    imageAve = this._createPipline(new ImageAveBuilder());

    /**
     * 构建 URL
     */
    build = () => {
        return this._piplines.map(x => x.build()).join('|');
    }
}