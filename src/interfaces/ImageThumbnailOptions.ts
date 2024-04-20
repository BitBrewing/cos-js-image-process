export interface ImageThumbnailOptions {
    /**
     * 将原图缩放为指定 Width 和 Height 的矩形内的最大图片，之后使用 color 参数指定的颜色居中填充空白部分
     */
    pad?: boolean;
    /**
     * 填充颜色，缺省为白色，需设置为十六进制 RGB 格式（如 #FF0000），详情参考 RGB 编码表，默认值为 #FFFFFF
     */
    color?: string;
}