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
});
