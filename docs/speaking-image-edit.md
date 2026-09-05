# Speaking photograph: localized logo and microphone removal

Final user instruction: keep the original face unchanged; remove only the ASHP logos and the random microphone at the left.

The delivered image uses only pixels from the original photograph. Nearby plain podium, blue slide and wall texture were cloned over the two logos and the left microphone, with lightly feathered edges. No generated face, person or scene is used in the final image. Earlier generated examples were discarded.

Edited regions in the existing 1050 × 435 crop (coordinates are left/top/width/height):

- Podium logo: 768 / 309 / 108 / 57.
- Slide logo: 486 / 271 / 39 / 22.
- Left microphone: 135 / 367 / 38 / 68.

A raw pixel comparison verifies zero changed pixels outside those three regions in the master. This includes the speaker's entire face and body. The 1050px WebP is lossless, preserving that result; the 640px version is a conventional downsample saved losslessly. Originals remain untouched.

Final assets:

- `site/images/team/gina-facilitation-unbranded.png`
- `site/images/team/gina-facilitation-unbranded-1050.webp`
- `site/images/team/gina-facilitation-unbranded-640.webp`
