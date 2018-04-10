shell_dir = join_paths(starter_dir, 'gnome-shell')

# generated .css files from .scss
theme_files = [
    'gnome-shell',
]
# theme sources .scss files
theme_sources = [
  'gnome-shell-sass/_variables.scss',
  'gnome-shell-sass/_color-palette.scss',
  'gnome-shell-sass/_colors.scss',
  'gnome-shell-sass/_common.scss',
  'gnome-shell-sass/_extensions.scss',
  'gnome-shell-sass/_drawing.scss',
]

# static files to copy
data_sources = [
  'calendar-arrow-left.svg',
  'calendar-arrow-right.svg',
  'calendar-today.svg',
  'checkbox-focused.svg',
  'checkbox-off-focused.svg',
  'checkbox-off.svg',
  'checkbox.svg',
  'close.svg',
  'close-window-active.svg',
  'close-window-hover.svg',
  'close-window.svg',
  'corner-ripple-ltr.svg',
  'corner-ripple-rtl.svg',
  'dash-placeholder.svg',
  'filter-selected-ltr.svg',
  'filter-selected-rtl.svg',
  'logged-in-indicator.svg',
  'message-indicator-symbolic.svg',
  'no-events.svg',
  'noise-texture.png',
  'no-notifications.svg',
  'pad-osd.css',
  'page-indicator-active.svg',
  'page-indicator-checked.svg',
  'page-indicator-hover.svg',
  'page-indicator-inactive.svg',
  'process-working.svg',
  'running-indicator.svg',
  'source-button-border.svg',
  'summary-counter.svg',
  'toggle-off-hc.svg',
  'toggle-off-intl.svg',
  'toggle-off-us.svg',
  'toggle-on-hc.svg',
  'toggle-on-intl.svg',
  'toggle-on-us.svg',
  'ws-switch-arrow-down.png',
  'ws-switch-arrow-up.png',
]

# destination directory
install_dir = shell_dir

# generate .css files
foreach f : theme_files
    theme_sources += [f + '.scss']
endforeach
theme_sources = files(theme_sources)
foreach f : theme_files
    custom_target('generate_' + f,
        input: f + '.scss',
        output: f + '.css',
        depend_files: theme_sources,
        command: [sassc, '-a', '@INPUT@', '@OUTPUT@'],
        build_by_default: true,
        install: true,
        install_dir: install_dir,
    )
endforeach

# install static data files
install_data(data_sources, install_dir: install_dir)
