#!/usr/bin/env python3
"""Validate delivered PNGs and sprite metadata using only the Python standard library."""
from pathlib import Path
import hashlib
import json
import struct
import zlib

root = Path(__file__).resolve().parents[1]
manifest = json.loads((root / 'manifest.json').read_text())

def check(condition, message):
    if not condition:
        raise SystemExit('FAIL: ' + message)

for key, texture in manifest['textures'].items():
    path = root / texture['file']
    data = path.read_bytes()
    check(data[:8] == b'\x89PNG\r\n\x1a\n', f'{key}: invalid PNG signature')
    check(hashlib.sha256(data).hexdigest() == texture['sha256'], f'{key}: checksum differs')
    pos, saw_end, compressed = 8, False, []
    while pos < len(data):
        check(pos + 12 <= len(data), f'{key}: truncated chunk')
        length = struct.unpack('>I', data[pos:pos+4])[0]
        kind = data[pos+4:pos+8]
        payload = data[pos+8:pos+8+length]
        check(pos+12+length <= len(data), f'{key}: truncated payload')
        crc = struct.unpack('>I', data[pos+8+length:pos+12+length])[0]
        check(zlib.crc32(kind + payload) & 0xffffffff == crc, f'{key}: corrupt PNG chunk')
        if kind == b'IHDR':
            width, height, depth, color, _, _, interlace = struct.unpack('>IIBBBBB', payload)
            check([width, height] == [texture['width'], texture['height']], f'{key}: wrong dimensions')
            check(depth == 8 and color == 6 and interlace == 0, f'{key}: expected 8-bit non-interlaced RGBA')
        if kind == b'IDAT': compressed.append(payload)
        if kind == b'IEND': saw_end = True
        pos += length + 12
    check(saw_end, f'{key}: missing IEND')
    decoded = zlib.decompress(b''.join(compressed))
    check(len(decoded) == height * (width * 4 + 1), f'{key}: invalid decompressed image size')
    print(f'PASS {key}: {width} × {height}, RGBA, PNG integrity and SHA-256')

for name, sprite in manifest['sprites'].items():
    texture = manifest['textures'][sprite['texture']]
    x, y, width, height = sprite['rect']
    check(all(isinstance(v, int) for v in sprite['rect']), f'{name}: noninteger crop')
    check(min(x, y) >= 0 and min(width, height) > 0, f'{name}: invalid crop')
    check(x+width <= texture['width'] and y+height <= texture['height'], f'{name}: crop outside image')
    if sprite['scaleType'] == 'Slice':
        left, top, right, bottom = sprite['sliceCenter']
        check(0 < left < right < width and 0 < top < bottom < height, f'{name}: invalid slice center')
check(len(manifest['sprites']) == 41, 'expected 41 named elements')
js = (root / 'manifest.js').read_text()
embedded = json.loads(js.split('window.STORM_GUI_MANIFEST = ', 1)[1].removesuffix(';\n'))
check(embedded == manifest, 'offline preview manifest differs from manifest.json')
luau = (root / 'roblox/StormGuiAssets.luau').read_text()
for name, sprite in manifest['sprites'].items():
    x, y, w, h = sprite['rect']
    check(f'["{name}"]' in luau and f'offset = Vector2.new({x}, {y}), size = Vector2.new({w}, {h})' in luau, f'{name}: Luau mapping differs')
print('PASS offline preview data and Luau sprite mappings')
for name in ['README.md','CLAUDE_CODE_HANDOFF.md','preview.html','preview.js','roblox/StormGuiAssets.luau','roblox/ScreenRecipes.md','roblox/UPLOAD_CHECKLIST.md']:
    check((root/name).is_file(), f'missing {name}')
print(f"PASS {len(manifest['sprites'])} sprite rectangles and all handoff files")
