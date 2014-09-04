## Brackets Show Colors extension

Experimental extension to explore having color values be displayed in the code in some way for easy identification.

### Usage

If installed it is always active.

Entries that are hex, rgb, rgba colors should get a color indicator of some type. Currently it is a small block to the left of the entry.

Other possible indicators (with code change):

Color-matching block to the right of entry.
Color-matching underline.
Color-matching border.

### Known issues

The CodeMirror cursor behavior doesn't display correctly in and around the altered token. Typing and editing code still seems to work properly, it just doesn't display correctly. Obvious example is the cursor doesn't move left/right as it should with the arrow keys and typing.

It seems possibly having a 1px or 2px border-left might not cause the display issue but doesn't seem quite enough to fulfill the requirement for an easily visible representation of what the color is.

### Things to do

Make it work?