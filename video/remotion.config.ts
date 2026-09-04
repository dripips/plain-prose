import {Config} from '@remotion/cli/config';

// png, а не jpeg: кадры без потерь, мелкий текст не мылится,
// и на выходе получается yuv420p, который играют все плееры.
Config.setVideoImageFormat('png');
Config.setOverwriteOutput(true);
// Чёткость важнее веса: текст должен читаться на паузе.
Config.setCrf(17);
// yuv420p, а не yuvj420p: полный диапазон часть плееров и Safari показывают
// со сдвинутыми уровнями, и ролик выглядит блёклым не по своей вине.
Config.setPixelFormat('yuv420p');
