import Sound from './Sound';
import Config from '../Config';
 
test('toggleSound test', () => {

    let soundEnabled = Config.soundsEnabled;
    Sound.toggleSound();
    expect(Config.soundsEnabled).toBe(!soundEnabled);

});