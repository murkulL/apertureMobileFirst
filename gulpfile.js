const {src, dest, watch, parallel, series} = require('gulp')//Функция src используется для выбора исходных файлов для обработки, а dest - для указания места назначения, куда следует записывать результат обработки.

const scss          = require('gulp-sass')(require('sass'))//Данный плагин позволяет компилировать Sass-файлы в CSS-файлы. 
const concat        = require('gulp-concat')//обьединение файлв (конкеатенация) и переиминовывание 
const uglify        = require('gulp-uglify-es').default;//gulp-uglify-es - это плагин для сжатия и минификации JavaScript-кода
const browsersync   = require('browser-sync').create()//Этот код используется для создания экземпляра BrowserSync - инструмента для автоматической перезагрузки веб-страницы в браузере при изменении файлов проекта.
const autoprefixer  = require('gulp-autoprefixer')//автоматически добавляет префиксы к CSS свойствам в соответствии с правилами браузеров. Это позволяет избежать проблем с несовместимостью между браузерами и убедиться, что ваши стили будут выглядеть одинаково на всех устройствах.
const clean         = require ('gulp-clean')//перезатирает папку dist
const avif          = require ('gulp-avif')//конвертирует картинку в формат avif
const webp          = require ('gulp-webp')//конвертирует картинку в формат webp
const imagemin      = require ('gulp-imagemin')//минифицирует картинки 
// const cached     = require ('gulp-cached')//анализирует файлы, которые нужно обработать, и сохраняет информацию о них в кэше. В следующий раз, когда задача сборки запускается снова, gulp-cached сравнивает текущие файлы с теми, которые были сохранены в кэше, и только те файлы, которые изменились, будут обработаны. 
const fonter        = require('gulp-fonter');
const ttf2woff2     = require('gulp-ttf2woff2');
const newer         = require('gulp-newer')// схожий с gulp-cached
const svgSprite     = require('gulp-svg-sprite')
const include       = require('gulp-include')//это возможность использовать шаблоны и многократно использовать код в проекте. Например, вы можете создать отдельный файл с заголовком и подвалом вашего сайта, а затем включать его в каждую страницу вашего проекта. Это позволит вам сократить количество дублирующегося кода и облегчить процесс обновления дизайна.


function pages(){
     return src('app/pages/*.html')
     .pipe(include({
        includePaths: 'app/components'
     }))
     .pipe(dest('app'))
}

function fonts(){
    return src('app/fonts/src/*.*')
    .pipe(fonter({
        formats: ['woff', 'ttf', 'otf']
    }))
    .pipe(src('app/fonts/*.ttf'))
    .pipe(ttf2woff2())
    .pipe(dest('app/fonts'))
}

function images(){//конвертирует и уменьшает 
    return src('app/images/src/*.*' , '!app/images/src/*.svg')
    
    .pipe(newer('app/images'))//каждый раз нужно проверять состояние паки 
    .pipe(avif({quality: 50}))

    .pipe(src('app/images/src/*.*'))//каждый раз нужно проверять состояние паки 
    .pipe(newer('app/images'))
    .pipe(webp())

    .pipe(src('app/images/src/*.*'))//каждый раз нужно проверять состояние паки 
    .pipe(newer('app/images'))
    .pipe(imagemin())

    .pipe(dest('app/images'))
}

function sprite(){
    return src('app/images/*.svg')
    .pipe(svgSprite({
        mode: {
            stack: {
                sprite: '../sprite.svg',
                example: true
            }
        }
    }))
    .pipe(dest('app/images'))
    .pipe(browsersync.stream())
}

function scripts(){
    return src([

        'app/js/main.js'

        // 'app/js/**/*.js',
        // '!app/js/main.min.js'

    ])//находим в app/js/main.js или все файлы кроме app/js/main.min.js
    .pipe(concat('main.min.js'))//переименовываем 
    .pipe(uglify())//минифицируем 
    .pipe(dest('app/js'))//выбрасываем в app/js
    .pipe(browsersync.stream())
}

function styles() {
    return src('app/scss/style.scss')
        .pipe(scss({outputStyle: 'compressed'}))
        .pipe(concat('style.min.css'))
        .pipe(autoprefixer({
          overrideBrowserslist: ['last 10 version'],
          grid: true
        }))
        .pipe(dest('app/css'))
        .pipe(browsersync.stream())
    }

function watching(){//отслеживает изминение в файлах (если да), выпонить все что идет после запятой styles и т.д
    browsersync.init({
        server: {
            baseDir: 'app/'
        }
    });
    watch(['app/scss/style.scss'], styles)
    watch(['app/images/src'], images)
    watch(['app/js/main.js'], scripts)
    watch(['app/components/*', 'app/pages/*'], pages)
    watch(['app/*.html']).on('change', browsersync.reload);
}



function cleanDist(){
    return src('dist')
    .pipe(clean())
}

function building(){//перенести все готовые файлы в dist
    return src([
        'app/css/style.min.css',
        'app/images/*.*',
        'app/js/main.min.js',
        '!app/images/*.svg',
        'app/images/sprite.svg',
        'app/fonts/*.*',
        'app/**/*.html',
    ],{base: 'app'})//сохранить всю файловую структуру 
    .pipe(dest('dist'))

}



exports.styles = styles;
exports.images = images;
exports.fonts = fonts;
exports.pages = pages;
exports.sprite = sprite;
exports.scripts = scripts;
exports.watching = watching;

 // команда gulp build 

exports.building = series(cleanDist, building )//series отвечает за последовательное выполнение функций
exports.default = parallel(styles, images, scripts ,pages, watching);