module.exports = function (grunt) {
    var target = grunt.option("target");

    grunt.initConfig({
        svgmin: {
            options: {
                plugins: [
                    {
                        removeViewBox: false,
                    },
                    {
                        removeDimensions: true,
                    },
                    {
                        removeAttrs: {
                            attrs: ["(fill|stroke)"],
                        },
                    },
                ],
            },
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: target,
                        src: ["*.svg"],
                        dest: "dist/svg/",
                    },
                ],
            },
        },
        svgstore: {
            options: {
                prefix: "",
                includedemo: `<!doctype html>
                <html>
                  <head>
                    <style>
                      svg{
                        width: 32px;
                        height: 32px;
                        fill: black;
                      }
                    </style>
                  <head>
                  <body>
                    <!--{{{svg}}}-->
              
                    <div style="display: grid; grid-template-columns: repeat(5, 1fr); gap: 15px;">
                        {{#each icons}}
                        <div style="display: flex; align-items: center; gap: 15px;">
                            <svg>
                                <use xlink:href="./symbol-defs.svg#{{name}}" />
                            </svg>
                            <span>{{name}}</span>
                        </div>
                        {{/each}}
                    </div>
              
                  </body>
                </html>`,
                svg: {
                    viewBox: "0 0 100 100",
                    xmlns: "http://www.w3.org/2000/svg",
                },
                symbol: {
                    viewBox: "0 0 24 24",
                },
                cleanup: true,
            },
            default: {
                files: {
                    "dist/symbol-defs.svg": ["./dist/svg/*.svg"],
                },
            },
        },
    });

    grunt.loadNpmTasks("grunt-svgstore");
    grunt.loadNpmTasks("grunt-svgmin");

    grunt.registerTask("default", ["svgmin", "svgstore"]);
    // grunt.registerTask('default', ['svgmin']);
};
