# 腾讯云对象存储图片处理

快速构建 cos 地址在线图片处理的参数

## 安装
```
npm i cos-js-image-process
```

## 使用
```js
import { CosImageBuilder } from 'cos-js-image-process';

var args = new CosImageBuilder()
    .imageMogr2(x => x
        .thumbnail('400x')
        .format('jpg')
        .bright(-50)
        .rotate(180)
        .strip()
    )
    .textWatermark(x => x
        .text('hello world')
        .fill('#ffff00')
        .gravity('center')
        .degree(45)
        .batch()
        .dissolve(50)
        .dx(10)
        .dy(10)
    )
    .build();
```
输出
```
imageMogr2/thumbnail/400x/format/jpg/bright/-50/rotate/180/strip|watermark/2/text/aGVsbG8gd29ybGQ=/fill/I2ZmZmYwMA==/gravity/center/degree/45/batch/1/dissolve/50/dx/10/dy/10
```
