

export default function (template) {
    let title = template.htmlWebpackPlugin.options.title;
    let scripts = '';
    const common = template.htmlWebpackPlugin.options.common;
    try {
        for( let cdn in common ) {
            scripts += `<script type="text/javascript" src="${common[cdn]}"></script>`
        }
    } catch(err) {}

    return (
        `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${title}</title>
            ${scripts}
        </head>
            <body>
                <div id="${ template.htmlWebpackPlugin.options.root }">music</div>
            </body>
        </html>
        `
    )
}