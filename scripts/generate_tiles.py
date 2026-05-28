import urllib.parse
import urllib.request
import os

# 创建图片目录
os.makedirs('/workspace/public/images/mahjong', exist_ok=True)

# 万子牌面
wan_tiles = [
    ("wan-1.png", "一", "wan"),
    ("wan-2.png", "二", "wan"),
    ("wan-3.png", "三", "wan"),
    ("wan-4.png", "四", "wan"),
    ("wan-5.png", "五", "wan"),
    ("wan-6.png", "六", "wan"),
    ("wan-7.png", "七", "wan"),
    ("wan-8.png", "八", "wan"),
    ("wan-9.png", "九", "wan"),
]

# 筒子牌面
tong_tiles = [
    ("tong-1.png", "一筒"),
    ("tong-2.png", "二筒"),
    ("tong-3.png", "三筒"),
    ("tong-4.png", "四筒"),
    ("tong-5.png", "五筒"),
    ("tong-6.png", "六筒"),
    ("tong-7.png", "七筒"),
    ("tong-8.png", "八筒"),
    ("tong-9.png", "九筒"),
]

# 条子牌面
tiao_tiles = [
    ("tiao-1.png", "一条"),
    ("tiao-2.png", "二条"),
    ("tiao-3.png", "三条"),
    ("tiao-4.png", "四条"),
    ("tiao-5.png", "五条"),
    ("tiao-6.png", "六条"),
    ("tiao-7.png", "七条"),
    ("tiao-8.png", "八条"),
    ("tiao-9.png", "九条"),
]

def generate_mahjong_image(filename, description):
    prompt = f"Realistic Chinese mahjong tile with {description}, ivory white background with red and blue decorations, beautiful 3D render, photorealistic, high quality, studio lighting, white background"
    encoded_prompt = urllib.parse.quote(prompt)
    url = f"https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt={encoded_prompt}&image_size=square"
    
    filepath = f"/workspace/public/images/mahjong/{filename}"
    
    try:
        urllib.request.urlretrieve(url, filepath)
        print(f"✓ Generated {filename}")
    except Exception as e:
        print(f"✗ Failed to generate {filename}: {e}")

# 生成万子牌面
print("Generating 万子 (Wan) tiles...")
for filename, char, suit in wan_tiles:
    generate_mahjong_image(filename, f"red Chinese character {char} and 万 on ivory white background")

print("\nGenerating 筒子 (Tong) tiles...")
for filename, description in tong_tiles:
    generate_mahjong_image(filename, description)

print("\nGenerating 条子 (Tiao) tiles...")
for filename, description in tiao_tiles:
    generate_mahjong_image(filename, description)

print("\n✓ All mahjong tile images generated successfully!")
