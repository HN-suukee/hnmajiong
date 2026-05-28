#!/bin/bash

# 万子牌面生成
wget "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=$(python3 -c 'import urllib.parse; print(urllib.parse.quote("Realistic Chinese mahjong tile with red Chinese character 二 (two) and 万 (wan/ten-thousand) on ivory white background, beautiful 3D render, photorealistic, high quality, studio lighting, white background"))'&image_size=square" -O /workspace/public/images/mahjong/wan-2.png

wget "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=$(python3 -c 'import urllib.parse; print(urllib.parse.quote("Realistic Chinese mahjong tile with red Chinese character 三 (three) and 万 (wan/ten-thousand) on ivory white background, beautiful 3D render, photorealistic, high quality, studio lighting, white background"))'&image_size=square" -O /workspace/public/images/mahjong/wan-3.png

wget "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=$(python3 -c 'import urllib.parse; print(urllib.parse.quote("Realistic Chinese mahjong tile with red Chinese character 四 (four) and 万 (wan/ten-thousand) on ivory white background, beautiful 3D render, photorealistic, high quality, studio lighting, white background"))'&image_size=square" -O /workspace/public/images/mahjong/wan-4.png

wget "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=$(python3 -c 'import urllib.parse; print(urllib.parse.quote("Realistic Chinese mahjong tile with red Chinese character 五 (five) and 万 (wan/ten-thousand) on ivory white background, beautiful 3D render, photorealistic, high quality, studio lighting, white background"))'&image_size=square" -O /workspace/public/images/mahjong/wan-5.png

wget "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=$(python3 -c 'import urllib.parse; print(urllib.parse.quote("Realistic Chinese mahjong tile with red Chinese character 六 (six) and 万 (wan/ten-thousand) on ivory white background, beautiful 3D render, photorealistic, high quality, studio lighting, white background"))'&image_size=square" -O /workspace/public/images/mahjong/wan-6.png

wget "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=$(python3 -c 'import urllib.parse; print(urllib.parse.quote("Realistic Chinese mahjong tile with red Chinese character 七 (seven) and 万 (wan/ten-thousand) on ivory white background, beautiful 3D render, photorealistic, high quality, studio lighting, white background"))'&image_size=square" -O /workspace/public/images/mahjong/wan-7.png

wget "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=$(python3 -c 'import urllib.parse; print(urllib.parse.quote("Realistic Chinese mahjong tile with red Chinese character 八 (eight) and 万 (wan/ten-thousand) on ivory white background, beautiful 3D render, photorealistic, high quality, studio lighting, white background"))'&image_size=square" -O /workspace/public/images/mahjong/wan-8.png

wget "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=$(python3 -c 'import urllib.parse; print(urllib.parse.quote("Realistic Chinese mahjong tile with red Chinese character 九 (nine) and 万 (wan/ten-thousand) on ivory white background, beautiful 3D render, photorealistic, high quality, studio lighting, white background"))'&image_size=square" -O /workspace/public/images/mahjong/wan-9.png

echo "万子牌面生成完成！"
