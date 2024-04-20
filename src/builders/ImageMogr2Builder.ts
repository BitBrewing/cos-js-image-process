import { ImageAdvancedFormat, ImageFormat, ImageGravity, ImageThumbnailOptions } from "../interfaces";
import { BuilderBase } from "./BuilderBase";

export class ImageMogr2Builder extends BuilderBase {
    constructor() {
        super('imageMogr2');
    }

    /**
     * 图片缩放
     * @see https://cloud.tencent.com/document/product/436/44880#.E5.A4.84.E7.90.86.E5.8F.82.E6.95.B0.E8.AF.B4.E6.98.8E
     */
    thumbnail = (value: string, options?: ImageThumbnailOptions) => {
        this.appendArgs('thumbnail', value);

        if (options) {
            if (options.pad) {
                this.appendArgs('pad', 1);
            }
            if (options.color) {
                this.appendArgs('color').appendBase64Args(options.color);
            }
        }
        return this;
    }

    /**
     * 缩放裁剪
     * @see https://cloud.tencent.com/document/product/436/44881#.E5.A4.84.E7.90.86.E5.8F.82.E6.95.B0.E8.AF.B4.E6.98.8E
     * 
     * @param gravity 图片裁剪的锚点位置，默认为左上顶点 northwest
     */
    crop = (width?: number, height?: number, gravity?: ImageGravity) => {
        this.appendArgs('crop');
        if (width){
            this.appendArgs(width);
        }
        this.appendArgs('x');
        if (height){
            this.appendArgs(height);
        }

        if (gravity){
            this.appendArgs('gravity', gravity);
        }

        return this;
    }

    /**
     * 自定义裁剪
     * @see https://cloud.tencent.com/document/product/436/44881#.E5.A4.84.E7.90.86.E5.8F.82.E6.95.B0.E8.AF.B4.E6.98.8E
     * @param width 指定目标图片的宽为 width。
     * @param height 指定目标图片的高为 height。
     * @param dx 相对于图片左上顶点水平向右偏移 dx。
     * @param dy 相对于图片左上顶点水平向下偏移 dy。
     * @param gravity 图片裁剪的锚点位置，默认为左上顶点 northwest
     * @returns 
     */
    cut = (width: number, height: number, dx: number, dy: number, gravity?: ImageGravity) => {
        this.appendArgs('cut', `${width}x${height}x${dx}x${dy}`);
        if (gravity){
            this.appendArgs('gravity', gravity);
        }

        return this;
    }

    /**
     * 内切圆裁剪功能，radius 是内切圆的半径，取值范围为大于0且小于原图最小边一半的整数。内切圆的圆心为图片的中心。
     * @see https://cloud.tencent.com/document/product/436/44881#.E5.A4.84.E7.90.86.E5.8F.82.E6.95.B0.E8.AF.B4.E6.98.8E
     */
    iradius = (value: number) => {
        return this.appendArgs('iradius', value);
    }

    /**
     * 圆角裁剪功能，radius 为图片圆角边缘的半径，取值范围为大于0且小于原图最小边一半的整数。圆角与原图边缘相切。
     * @see https://cloud.tencent.com/document/product/436/44881#.E5.A4.84.E7.90.86.E5.8F.82.E6.95.B0.E8.AF.B4.E6.98.8E
     */
    rradius = (value: number) => {
        return this.appendArgs('rradius', value);
    }

    /**
     * 基于图片中的人脸位置进行缩放裁剪。目标图片的宽度为 Width、高度为 Height。
     * @see https://cloud.tencent.com/document/product/436/44881#.E5.A4.84.E7.90.86.E5.8F.82.E6.95.B0.E8.AF.B4.E6.98.8E
     */
    scrop = (width: number, height: number) => {
        return this.appendArgs('scrop', `${width}x${height}`);
    }

    /**
     * 基于指定的图片宽高比范围进行裁剪
     * 
     * MinRatio 表示最小宽高比，MaxRatio 表示最大宽高比，值均为1-10000的整数。MinRatio 和 MaxRatio 的计算方式为 100 x 宽/高，值 1 表示宽高比为1:100，值100表示宽高比为1:1。
     * 
     * 如果原图宽高比小于最小宽高比，则对图片按照最小宽高比进行宽不变的居中裁剪；
     * 
     * 如果原图宽高比大于最大宽高比，则对图片按照最大宽高比进行高不变的居中裁剪。
     * 
     * @see https://cloud.tencent.com/document/product/436/44881#.E5.A4.84.E7.90.86.E5.8F.82.E6.95.B0.E8.AF.B4.E6.98.8E
     */
    rcrop = (minRatio: number, maxRatio: number) => {
        return this.appendArgs('rcrop', `${minRatio}x${maxRatio}`);
    }

    /**
     * 水平方向索引切割
     * @param width 指定在水平方向切割出的每块区域的长度，值为像素，取值范围：大于0且不超过图片宽度的正整数。
     * @param index 被切割后的图片区域索引值，默认值为0，表示取第一块。
     */
    indexcropWidth = (width: number, index: number = 0) => {
        return this.appendArgs('indexcrop')
            .appendArgs('width', width)
            .appendArgs('index', index);
    }

    /**
     * 垂直方向索引切割
     * @param height 指定在垂直方向切割出的每块区域的长度，值为像素，取值范围：大于0且不超过图片高度的正整数。
     * @param index 被切割后的图片区域索引值，默认值为0，表示取第一块。
     */
    indexcropHeight = (height: number, index: number = 0) => {
        return this.appendArgs('indexcrop')
            .appendArgs('height', height)
            .appendArgs('index', index);
    }

    /**
     * 格式转换（如需转换为avif、tpg、heif，请先开通 图片高级压缩 服务。）
     * @see https://cloud.tencent.com/document/product/436/44883#.E5.A4.84.E7.90.86.E5.8F.82.E6.95.B0.E8.AF.B4.E6.98.8E
     */
    format = (value: ImageFormat | ImageAdvancedFormat) => {
        return this.appendArgs('format', value);
    }

    /**
     * 图片的绝对质量，取值范围0 - 100，默认值为原图质量；取原图质量和指定质量的最小值。
     * @see https://cloud.tencent.com/document/product/436/44884#.E5.A4.84.E7.90.86.E5.8F.82.E6.95.B0.E8.AF.B4.E6.98.8E
     * 
     * @param force 表示强制使用指定值
     */
    quality = (value: number, force?: boolean) => {
        return this.appendArgs('quality', value + (force ? '!' : ''));
    }

    /**
     * 图片的相对质量，取值范围0 - 100，数值以原图质量为标准。例如原图质量为80，将 rquality 设置为80后，得到处理结果图的图片质量为64（80x80%）。
     * @see https://cloud.tencent.com/document/product/436/44884#.E5.A4.84.E7.90.86.E5.8F.82.E6.95.B0.E8.AF.B4.E6.98.8E
     */
    rquality = (value: number) => {
        return this.appendArgs('rquality', value);
    }

    /**
     * 图片的最低质量，取值范围0 - 100，设置结果图的质量参数最小值。
     * 
     * 例如原图质量为85，将 lquality 设置为80后，处理结果图的图片质量为85。
     * 
     * 例如原图质量为60，将 lquality 设置为80后，处理结果图的图片质量会被提升至80。
     * 
     * @see https://cloud.tencent.com/document/product/436/44884#.E5.A4.84.E7.90.86.E5.8F.82.E6.95.B0.E8.AF.B4.E6.98.8E
     */
    lquality = (value: number) => {
        return this.appendArgs('lquality', value);
    }

    /**
     * 输出为渐进式 jpg 格式。
     * 
     * 该参数仅在输出图片格式为 jpg 格式时有效。如果输出非 jpg 图片格式，会忽略该参数。
     * @see https://cloud.tencent.com/document/product/436/86579#.E5.A4.84.E7.90.86.E5.8F.82.E6.95.B0.E8.AF.B4.E6.98.8E
     */
    interlace = () => {
        return this.appendArgs('interlace', 1);
    }

    /**
     * 普通旋转：图片顺时针旋转角度，取值范围0 - 360，默认不旋转。
     * @see https://cloud.tencent.com/document/product/436/44885#.E5.A4.84.E7.90.86.E5.8F.82.E6.95.B0.E8.AF.B4.E6.98.8E
     */
    rotate = (value: number) => {
        return this.appendArgs('rotate', value);
    }

    /**
     * 自适应旋转：根据原图 EXIF 信息将图片自适应旋转回正。
     * @see https://cloud.tencent.com/document/product/436/44885#.E5.A4.84.E7.90.86.E5.8F.82.E6.95.B0.E8.AF.B4.E6.98.8E
     */
    autoOrient = () => {
        return this.appendArgs('auto-orient', 1);
    }

    /**
     * 镜像翻转：flip 值为 vertical 表示垂直翻转，horizontal 表示水平翻转
     * @see https://cloud.tencent.com/document/product/436/44885#.E5.A4.84.E7.90.86.E5.8F.82.E6.95.B0.E8.AF.B4.E6.98.8E
     */
    flip = (value: 'vertical' | 'horizontal') => {
        return this.appendArgs('flip', value);
    }

    /**
     * 高斯模糊
     * @see https://cloud.tencent.com/document/product/436/44885#.E5.A4.84.E7.90.86.E5.8F.82.E6.95.B0.E8.AF.B4.E6.98.8E
     * @param radius 模糊半径，取值范围为1 - 50
     * @param sigma 正态分布的标准差，必须大于0
     */
    blur = (radius: number, sigma: number) => {
        return this.appendArgs('blur', `${radius}x${sigma}`);
    }

    /**
     * 图片亮度调节功能，value 为亮度参数值，取值范围为[-100, 100]的整数。
     * @see https://cloud.tencent.com/document/product/436/58206#.E5.A4.84.E7.90.86.E5.8F.82.E6.95.B0.E8.AF.B4.E6.98.8E
     */
    bright = (value: number) => {
        return this.appendArgs('bright', value);
    }

    /**
     * 图片对比度调节功能，value 为对比度参数值，取值范围为[-100, 100]的整数。
     * @see https://cloud.tencent.com/document/product/436/58207#.E5.A4.84.E7.90.86.E5.8F.82.E6.95.B0.E8.AF.B4.E6.98.8E
     */
    contrast = (value: number) => {
        return this.appendArgs('contrast', value);
    }

    /**
     * 图片锐化功能，value 为锐化参数值，取值范围为10 - 300间的整数（推荐使用70）。参数值越大，锐化效果越明显。
     * @see https://cloud.tencent.com/document/product/436/44886#.E5.A4.84.E7.90.86.E5.8F.82.E6.95.B0.E8.AF.B4.E6.98.8E
     */
    sharpen = (value: number) => {
        return this.appendArgs('sharpen', value);
    }

    /**
     * 将图片设置为灰度图。
     * @see https://cloud.tencent.com/document/product/436/66518#.E5.A4.84.E7.90.86.E5.8F.82.E6.95.B0.E8.AF.B4.E6.98.8E
     */
    grayscale = () => {
        return this.appendArgs('grayscale', 1);
    }

    /**
     * 当处理参数中携带此参数时，针对文件过大导致处理失败的场景，会直接返回原图而不报错
     */
    ignoreError = () => {
        return this.appendArgs('ignore-error', 1);
    }

    /**
     * 携带此参数时，如果处理后图片体积大于原图，会返回原图不处理。
     */
    minisize = () => {
        return this.appendArgs('minisize', 1);
    }

    /**
     * 限制图片转换后的大小，支持以兆字节（m）和千字节（k）为单位
     * 
     * 仅支持 JPG 格式的图片，可以用于限制处理后图片的大小
     * 
     * 注意：大小限制并非绝对的，图片本身质量不同会造成一些误差，建议搭配 strip 参数使用，去除图片的一些冗余信息，会有更好的效果。
     * 
     * @see https://cloud.tencent.com/document/product/436/56734#.E5.A4.84.E7.90.86.E5.8F.82.E6.95.B0.E8.AF.B4.E6.98.8E
     * 
     * @param force 表示用处理后的图片大小与原图大小做比较，如果处理后的图片比原图小，则返回处理后的图片，否则返回原图。
     */
    sizeLimit = (value: string, force?: boolean) => {
        return this.appendArgs('size-limit', value + (force ? '!' : ''));
    }

    /**
     * 去除元信息
     * @see https://cloud.tencent.com/document/product/436/44892
     */
    strip = () => {
        return this.appendArgs('strip');
    }
}