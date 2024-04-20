import { ImageGravity } from "../interfaces";
import { BuilderBase } from "./BuilderBase";

export class TextWatermarkBuilder extends BuilderBase {
    constructor() {
        super('watermark/2');
    }

    /**
     * 水印内容
     */
    text = (value: string) => {
        return this.appendArgs('text').appendBase64Args(value);
    }

    /**
     * 水印字体，默认值 tahoma.ttf 。水印字体列表参考 支持字体列表
     */
    font = (value: string) => {
        return this.appendArgs('font').appendBase64Args(value);
    }

    /**
     * 水印文字字体大小，单位为磅，缺省值13。如需按照原图片的大小比例缩放文字水印，请将文字水印转换为 PNG 图片，并参考 图片水印 文档进行配置
     */
    fontsize = (value: number) => {
        return this.appendArgs('fontsize', value);
    }

    /**
     * 字体颜色，缺省为灰色，需设置为十六进制 RGB 格式（例如 #FF0000），详情可参考 RGB 编码表，默认值为 #3D3D3D
     */
    fill = (value: string) => {
        return this.appendArgs('fill').appendBase64Args(value);
    }

    /**
     * 文字透明度，取值1 - 100，默认90（90%不透明度）
     */
    dissolve = (value: number) => {
        return this.appendArgs('dissolve', value);
    }

    /**
     * 文字水印位置，九宫格位置（参见九宫格方位图），默认值 SouthEast
     * 
     * 当 gravity 参数设置为 center 时，dx、dy 参数无效
     * 
     * 当 gravity 参数设置为 center 时，dx、dy 参数无效
     * 
     * 当 gravity 参数设置为 west 或 east 时，dy 参数无效（水印会垂直居中）。
     */
    gravity = (value: ImageGravity) => {
        return this.appendArgs('gravity', value);
    }

    /**
     * 水平（横轴）边距，单位为像素，缺省值为0
     */
    dx = (value: number) => {
        return this.appendArgs('dx', value);
    }

    /**
     * 垂直（纵轴）边距，单位为像素，缺省值为0
     */
    dy = (value: number) => {
        return this.appendArgs('dy', value);
    }

    /**
     * 文字水印的旋转角度设置，取值范围为0 - 360，默认0
     */
    degree = (value: number) => {
        return this.appendArgs('degree', value);
    }

    /**
     * 平铺水印功能，可将文字水印平铺至整张图片。
     */
    batch = () => {
        return this.appendArgs('batch', 1);
    }

    /**
     * 平铺模式下的水平、垂直间距相对文字水印贴图的宽高百分比，范围为[0,100]，默认10
     */
    spacing = (value: number) => {
        return this.appendArgs('spacing', value);
    }

    /**
     * 文字阴影效果，有效值为[0,100]，默认为0，表示无阴影
     */
    shadow = (value: number) => {
        return this.appendArgs('shadow', value);
    }

    /**
     * 根据原图的大小，缩放调整文字水印的大小，需要与 spcent 搭配使用：
     * 
     * 当 scatype 设置为1时，按原图的宽缩放
     * 
     * 当 scatype 设置为2时，按原图的高缩放
     * 
     * 当 scatype 设置为3时，按原图的整体面积缩放
     */
    scatype = (value: number) => {
        return this.appendArgs('scatype', value);
    }

    /**
     * 与 scatype 搭配使用：
     * 
     * 当 scatype 设置为1时，该有效值为[1, 1000]，单位为千分比
     * 
     * 当 scatype 设置为2时，该有效值为[1, 1000]，单位为千分比
     * 
     * 当 scatype 设置为3时，该有效值为[1, 250]，单位为千分比
     */
    spcent = (value: number) => {
        return this.appendArgs('spcent', value);
    }
}