const path = require('path');

module.exports = (plop) => {
  plop.setGenerator('page', {
    description: 'Create a new page with route',
    prompts: [
      // yarn plop
      {
        type: 'input',
        name: 'name',
        message: '请输入页面的名字',
      },
    ],
    actions: [
      // {
      //   type: 'add',
      //   path: path.join(
      //     __dirname,
      //     'src/pages/{{kebabCase name}}/{{kebabCase name}}.tsx',
      //   ),
      //   templateFile: path.join(
      //     __dirname,
      //     'plopTemplates/page/page.hbs',
      //   ),
      // },
      // {
      //   type: 'add',
      //   path: path.join(
      //     __dirname,
      //     'src/pages/{{kebabCase name}}/{{kebabCase name}}.module.less',
      //   ),
      //   templateFile: path.join(
      //     __dirname,
      //     'plopTemplates/page/page.module.hbs',
      //   ),
      // },
      // {
      //   type: 'modify',
      //   path: './src/routes/menu.tsx',
      //   pattern: /export const ROUTE_KEYS = ([^}]*)/g,
      //   template:
      //     "export const ROUTE_KEYS = $1  {{constantCase name}}: '{{camelCase name}}',\n",
      // },
      {
        type: 'modify',
        path: './src/routes/menu.tsx',
        pattern: /export const ROUTE_CONFIG: ([^*]*)\[ROUTE_KEYS\.NOT_FOUND\]/g,
        template:
          "export const ROUTE_CONFIG: $1[ROUTE_KEYS.{{constantCase name}}]: {\n    path: '{{camelCase name}}',\n    name: '{{pascalCase name}}',\n  },\n  [ROUTE_KEYS.NOT_FOUND]",
      },
      // {
      //   type: 'modify',
      //   path: './src/routes/index.tsx',
      //   pattern: /export const ROUTE_COMPONENTS = {([^}]*)/g,
      //   template:
      //     "export const ROUTE_COMPONENTS = {$1  [ROUTE_KEYS.{{constantCase name}}]: {{pascalCase name}},\n",
      // },
      // {
      //   type: 'modify',
      //   path: './src/routes/index.tsx',
      //   pattern: /import { ROUTE_KEYS } from \'\.\/menu\'/g,
      //   template:
      //     "import { {{pascalCase name}} } from '@/pages/{{kebabCase name}}/{{kebabCase name}}';\nimport { ROUTE_KEYS } from './menu'",
      // },
    ],
  });
};
