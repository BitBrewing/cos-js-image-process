import { CosImageBuilder } from '../src';

describe('index', () => {
  it('imageMogr2', () => {
    var args = new CosImageBuilder()
      .imageMogr2(x => x
        .thumbnail('400x')
        .format('jpg')
        .bright(-50)
        .rotate(180)
        .strip()
      )
      .build();

    expect(args).toEqual('imageMogr2/thumbnail/400x/format/jpg/bright/-50/rotate/180/strip');
  });

  it('imageView2', () => {
    var args = new CosImageBuilder()
      .imageView2(x => x
        .thumbnai1(400, 300)
        .format('jpg')
        .build()
      )
      .build();
    
      expect(args).toEqual('imageView2/1/w/400/h/300/format/jpg');
  })
});
