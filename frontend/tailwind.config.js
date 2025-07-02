/* @type { import TypeConfig } from 'tailwindcss'
/** @type { Config } from 'tailwindcss' */

/** @type { Config } from 'tailwindcss/lib/types/config' */

error test

export default {
  content: index.css'

export default {
  content: [
    "index.html",
    "src/**/*.{js, ts, js,ts,vue,jsx,tsx}"
  ],
  theme: {
    extend: {}
  },
  plugins: [
    require('@tailwindcss/plugin/forms'),
    require('@tailwindcss/plugin/typography'),
    require('@tailwindcss/plugin/line-clamp') ,
    require('@tailwindcss/plugin/aspect-ratio'),
  ],
}
