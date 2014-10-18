/*
 * grunt-contrib-sass
 * http://gruntjs.com/
 *
 * Copyright (c) 2012 Sindre Sorhus, contributors
 * Licensed under the MIT license.
 */
'use strict';

module.exports = function (grunt) {

    
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ]
    },
    clean: {
      test: [
        'test/tmp',
        '.sass-cache'
      ]
    },
    nodeunit: {
      tests: ['test/*_test.js']
    },
    
    
    // Metadata.测试用
        meta: {
            basePath: './',
            srcPath: './_test/',
            deployPath: './_test/css/'
        },
        
    sass: {//测试用
      options: {
       // sourcemap: 'none'
      },
      compile: {
        files: {
          '_test/tmp/scss.css': ['_test/123.scss'],
          '_test/tmp/sass.css': ['_test/123.sass'],
          '_test/tmp/css.css': ['_test/123.css']
        }
      },
      compileBanner: {
        options: {
          banner: '/* <%= pkg.name %> banner */'
        },
        files: {
          'test/tmp/scss-banner.css': ['test/fixtures/banner.scss'],
          'test/tmp/sass-banner.css': ['test/fixtures/banner.sass'],
          'test/tmp/css-banner.css': ['test/fixtures/banner.css']
        }
      },
      ignorePartials: {
        cwd: 'test/fixtures/partials',
        src: '*.scss',
        dest: 'test/tmp',
        expand: true,
        ext: '.css'
      },
      updateTrue: {
        options: {
          update: true
        },
        files: [{
          expand: true,
          cwd: 'test/fixtures',
          src: ['updatetrue.scss', 'updatetrue.sass', 'updatetrue.css'],
          dest: 'test/tmp',
          ext: '.css'
        }]
      }
    },//sass转换任务，任务名字唯一
    
    
    less: {
      compileCore: {
        options: {
          strictMath: true,
          sourceMap: true,
          outputSourceFiles: true,
          sourceMapURL: '<%= pkg.name %>.css.map',
          sourceMapFilename: 'dist/css/<%= pkg.name %>.css.map'
        },
        files: {
          'dist/css/<%= pkg.name %>.css': '_less/bootstrap.less'
        }
      },
      compileTheme: {
        options: {
          strictMath: true,
          sourceMap: true,
          outputSourceFiles: true,
          sourceMapURL: '<%= pkg.name %>-theme.css.map',
          sourceMapFilename: 'dist/css/<%= pkg.name %>-theme.css.map'
        },
        files: {
          'dist/css/<%= pkg.name %>-theme.css': '_less/theme.less'
        }
      }
    },//less转换任务，任务名字唯一,jekyll默认不支持less的编译和监控
    
  
    
     //命令行支持 
     shell : {
            jekyllBuild : {
                command : 'jekyll build'
            },
            jekyllServe : {
                command : 'jekyll serve'
            },
            jekyllWatch : {
                command : 'jekyll serve --watch'
            }
        },
    
    
    
    
    watch: {
            sass: {
                files: [
                    '<%= meta.srcPath %>/*.scss',
                    '<%= meta.srcPath %>/*.sass'
                ],
                tasks: ['sass'],
                options: {
                  //livereload: true,jekyll已经有jekyll serve --watch，代替文件改变后自动刷新
                  reload: true//自动刷新Gruntfile.js
                }

            },
            
            less: {
                files: '_less/*.less',
                tasks: 'less'
              },
                options: {
                  //livereload: 9002,jekyll已经有jekyll serve --watch，代替文件改变后自动刷新
                  reload: true//自动刷新Gruntfile.js
                }

        }
    
  });
  // These plugins provide necessary tasks.加载需要用到的插件
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.loadNpmTasks('grunt-contrib-internal');


 //添加shell命令支持,用之前要先安装
  grunt.loadNpmTasks('grunt-shell');

 //转换sass,less以及文件监控插件
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');





 // grunt.registerTask('mkdir', grunt.file.mkdir);//去掉也可以创建文件夹
  grunt.registerTask('test', [
    'clean',
   // 'mkdir:tmp',//去掉也可以创建文件夹
    'sass',//test系列任务下的其中一员
    'nodeunit',
    'clean'
  ]);//命令行输入 grunt test
  grunt.registerTask('default', ['jshint', 'test', 'build-contrib']);////命令行输入 grunt
  grunt.registerTask( 'srcw', [ 'watch'] );//less/scss文件，js文件改动，然后编译,
  grunt.registerTask( 'jw', [ 'shell:jekyllWatch' ] );//开启jekyll监控，不包括资样式脚本等源文件的编译和监控
};
