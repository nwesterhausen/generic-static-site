const { src, dest, series, task } = require('gulp');
const nunjucksRender = require('gulp-nunjucks-render');
const clean = require('gulp-clean');

const OUTPUT_DIRECTORY = 'dist';

/**
 * Task: nunjucks
 *
 * This task performs the nunjucks rendering which takes our template pages and turns
 * them into static html. This task incorporates the environment we established in njkenv.
 */
task('nunjucks', function () {
  return (
    // Start by specifying where our "pages" are located.
    src('src/pages/**/*.+(html|nunjucks|njk)')
      // This step performs the render, we tell it where to look for templates and provide
      // our environment modifications
      .pipe(
        nunjucksRender({
          path: ['src/templates'],
        })
      )
      // Put the rendered pages in the output folder.
      .pipe(dest(OUTPUT_DIRECTORY))
  );
});

/**
 * Task: clean
 *
 * Deletes the contents of the output directory
 */
task('clean', function () {
  return src(`${OUTPUT_DIRECTORY}/*`).pipe(clean());
});

/**
 * Task: default
 *
 * The default task (this gets run if you run Gulp without any arguments). This will
 * run clean first, then run nunjucks.
 */
task('default', series('clean', 'nunjucks'));
