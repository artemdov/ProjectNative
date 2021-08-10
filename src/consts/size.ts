import {Dimensions} from 'react-native';

export const {height, width} = Dimensions.get('window');
// Size const
const MOCK_WIDTH = 375; // iPhone 11 width
export const entireScreenWidth = Dimensions.get('window').width;
export const rem = (remValue = 1) => remValue * (entireScreenWidth / MOCK_WIDTH);
// 1 hwValue is 1% of screen width
export const hw = (hwValue = 1) => hwValue * (entireScreenWidth / 100);

const MOCK_HEIGHT = 812;
export const entireScreenHeight = Dimensions.get('window').height;
export const vrem = (remValue = 1) => remValue * (entireScreenHeight / MOCK_HEIGHT);
// 1 vhValue is 1% of screen height
export const vh = (vhValue = 1) => vhValue * (entireScreenHeight / 100);
