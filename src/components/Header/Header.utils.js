import { kebabCaseToPascalCase } from "../../utils";

export const generateBreadcrumb = (routesRecord, path) => {
  const paths = path.slice(1).split("/");
  let i = 1;
  let currentPath = routesRecord[`/${paths[0]}`];
  let breadcrumb = [
    {
      title: currentPath?.breadcrumb,
      href: paths[0],
    },
  ];

  while (currentPath && currentPath.children) {
    const href = paths.slice(0, i + 1).join("/");
    currentPath = currentPath.children[href];
    breadcrumb.push({
      title:
        currentPath?.breadcrumb ||
        (paths[i] && kebabCaseToPascalCase(paths[i])),
      href,
    });
    i++;
  }

  while (i < paths.length) {
    breadcrumb.push({
      title: paths[i] && kebabCaseToPascalCase(paths[i]),
      href: paths.slice(0, i + 1).join("/"),
    });
    i++;
  }

  return breadcrumb;
};
