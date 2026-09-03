import {Config} from '@remotion/cli/config';

Config.setVideoImageFormat('jpeg');
Config.setOverwriteOutput(true);
// Чёткость важнее веса: текст должен читаться на паузе.
Config.setCrf(17);
