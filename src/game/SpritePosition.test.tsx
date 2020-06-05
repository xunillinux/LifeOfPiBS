import SpritePosition from './SpritePosition';
 
test('getXPosForSpriteWidth test', () => {

    let spritePosition = new SpritePosition(2,2);
    expect(spritePosition.getXPosForSpriteWidth(10)).toBe(20);

});

test('getYPosForSpriteHeight test', () => {

    let spritePosition = new SpritePosition(2,2);
    expect(spritePosition.getYPosForSpriteHeight(10)).toBe(20);

});
