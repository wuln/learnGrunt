module.exports = function(grunt) {

    var sassStyle = 'expanded';
    // 任务配置
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        // scss编译
        sass: {
            output : {
                options: {
                    style: sassStyle
                },
                files: {
                    './style.css': './scss/style.scss'
                }
            }
        },
        // 合并文件
        concat: {            
            dist: {
                src: ['./src/hello.js', './src/world.js'],
                dest: './global.js',
            }
        },
        // 压缩文件
        uglify: {
            compressjs: {
                files: {
                    './global.min.js': ['./global.js']
                }
            }
        },
        // 语法检查
        jshint: {
            all: ['./global.js']
        },
        // 监听文件变动
        watch: {
            scripts: {
                files: ['./src/hello.js','./src/world.js'],
                tasks: ['concat','jshint','uglify']
            },
            sass: {
                files: ['./scss/style.scss'],
                tasks: ['sass']
            },
            // 自动刷新
            livereload: {
                options: {
                    livereload: '<%= connect.options.livereload %>'
                },
                files: [
                    'index.html',
                    'style.css',
                    'js/global.min.js'
                ]
            }
        },
        // 建立本地服务器
        connect: {
            options: {
                port: 9000,
                open: true,
                livereload: 35729,                
                hostname: 'localhost'
            },
            server: {
                options: {
                    port: 9001,
                    base: './'
                }
            }
        }
    });

    // 插件加载
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-jshint'); 
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');

    // 任务注册
    // grunt.registerTask('outputcss',['sass']);
    grunt.registerTask('concatjs',['concat']);
    grunt.registerTask('compressjs',['concat','jshint','uglify']);
    grunt.registerTask('watchit',['concat','jshint','uglify','connect','watch']);
    grunt.registerTask('default');

};