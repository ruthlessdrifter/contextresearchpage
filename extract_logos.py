"""生成两张卡片用到的 logo (透明背景 PNG).

用途:
    - logo_life.png: 来源为用户提供的独立大图 (LOGO_LIFE_SRC), 背景去除后保存
    - logo_clb.png : 来源为 12 宫格 logo 板 (BOARD_SRC) 的 (row2,col2)
    两张图都会被裁边、正方形补白、缩放到 <=512px.

用法:
    python3 extract_logos.py
"""
from PIL import Image
import os

Image.MAX_IMAGE_PIXELS = None

BOARD_SRC = "context_logo_board_12_alt (1).png"
LOGO_LIFE_SRC = (
    "/Users/shenyujiong/.cursor/projects/Users-shenyujiong-Desktop-"
    "ContextLearning-formal/assets/"
    "image-a97600d7-4524-4ab5-8beb-0e9deeefac18.png"
)
OUT_DIR = "logos"
os.makedirs(OUT_DIR, exist_ok=True)


def crop_cell(img, row, col, rows=4, cols=3, inset=0.08, expand=(0, 0, 0, 0)):
    """裁剪单元格.
    inset: 向内统一收缩比例, 避免相邻 cell 图案渗入.
    expand: (left, top, right, bottom) 比例, 正值向外扩展, 用于补救超出边界的装饰笔画.
    """
    w, h = img.size
    cw, ch = w / cols, h / rows
    el, et, er, eb = expand
    left = int(col * cw + cw * (inset - el))
    top = int(row * ch + ch * (inset - et))
    right = int((col + 1) * cw - cw * (inset - er))
    bottom = int((row + 1) * ch - ch * (inset - eb))
    left = max(0, left)
    top = max(0, top)
    right = min(w, right)
    bottom = min(h, bottom)
    return img.crop((left, top, right, bottom))


def make_transparent(img, threshold=240):
    """去掉纯白或接近白的背景."""
    img = img.convert("RGBA")
    data = img.getdata()
    new_data = []
    for r, g, b, a in data:
        if r >= threshold and g >= threshold and b >= threshold:
            new_data.append((r, g, b, 0))
        else:
            new_data.append((r, g, b, a))
    img.putdata(new_data)
    return img


def remove_cream_bg(img):
    """去掉米色/cream 背景, 保留深色线条与紫色色块."""
    img = img.convert("RGBA")
    data = img.getdata()
    new_data = []
    for r, g, b, a in data:
        is_bg = (
            r >= 235 and g >= 230 and b >= 225
            and abs(r - g) < 12 and abs(g - b) < 15
            and (r >= b or r - b <= 10)
        )
        new_data.append((r, g, b, 0) if is_bg else (r, g, b, a))
    img.putdata(new_data)
    return img


def trim(img):
    bbox = img.getbbox()
    return img.crop(bbox) if bbox else img


def pad_to_square(img, pad_ratio=0.08):
    w, h = img.size
    side = int(max(w, h) * (1 + pad_ratio * 2))
    canvas = Image.new("RGBA", (side, side), (0, 0, 0, 0))
    off = ((side - w) // 2, (side - h) // 2)
    canvas.paste(img, off, img)
    return canvas


def finalize(img, out_name, max_side=512):
    img = trim(img)
    img = pad_to_square(img)
    if max(img.size) > max_side:
        scale = max_side / max(img.size)
        img = img.resize(
            (int(img.size[0] * scale), int(img.size[1] * scale)), Image.LANCZOS
        )
    out_path = os.path.join(OUT_DIR, out_name)
    img.save(out_path, "PNG", optimize=True)
    print(f"saved {out_path} size={img.size}")


def process_board(row, col, out_name, inset=0.0, expand=(0, 0, 0, 0)):
    """从 12 宫格 board 里裁出某个 cell 当 logo."""
    img = Image.open(BOARD_SRC)
    cell = crop_cell(img, row, col, inset=inset, expand=expand)
    cell = make_transparent(cell, threshold=245)
    finalize(cell, out_name)


def process_standalone(src, out_name):
    """从独立的 cream 背景图里提取 logo."""
    img = Image.open(src).convert("RGBA")
    img = remove_cream_bg(img)
    finalize(img, out_name)


if __name__ == "__main__":
    process_standalone(LOGO_LIFE_SRC, "logo_life.png")
    process_board(1, 1, "logo_clb.png", inset=0.10)
