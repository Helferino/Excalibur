import path from 'path';
import pug from 'pug';

type Template = 'email';

type RenderTemplateOptions = {
  template: Template;
  email: { receiver: string; subject: string; body: string };
}

export const renderTemplate = (options: RenderTemplateOptions): string => {
  const { template, email } = options;

  const templatePath = path.resolve(__dirname, `./templates/${template}.pug`);
  const compiledFunction = pug.compileFile(templatePath);
  const html = compiledFunction({ email });

  return html;
}